import { NextRequest, NextResponse } from "next/server";

interface GitHubWeekStats {
  w: number;
  a: number;
  d: number;
  c: number;
}

interface GitHubAuthor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface GitHubContributor {
  author: GitHubAuthor | null;
  total: number;
  weeks: GitHubWeekStats[];
}

export interface ContributorStats {
  login: string;
  id: number;
  avatarUrl: string;
  profileUrl: string;
  totalCommits: number;
  additions: number;
  deletions: number;
  percentageOfTop: number;
}

export interface GitHubStatsResponse {
  success: boolean;
  contributors?: ContributorStats[];
  error?: string;
}

const FETCH_TIMEOUT_MS = 15000;
const VALID_SEGMENT_REGEX = /^[A-Za-z0-9_.-]{1,100}$/;

function parseGitHubUrl(input: string): { owner: string; repo: string } | null {
  // Reject overly long inputs
  if (!input || input.length > 2048) return null;

  let url: URL;
  try {
    // Support both full URLs and shorthand (owner/repo)
    if (input.includes("github.com")) {
      url = input.startsWith("http://") || input.startsWith("https://")
        ? new URL(input)
        : new URL(`https://${input}`);
    } else if (input.includes("/") && !input.includes(" ")) {
      // Handle owner/repo format
      const parts = input.split("/").filter(Boolean);
      if (parts.length === 2) {
        const [owner, repo] = parts;
        if (VALID_SEGMENT_REGEX.test(owner) && VALID_SEGMENT_REGEX.test(repo)) {
          return { owner, repo };
        }
      }
      return null;
    } else {
      return null;
    }
  } catch {
    return null;
  }

  // Strict hostname validation
  if (!["github.com", "www.github.com"].includes(url.hostname)) {
    return null;
  }

  // Parse path segments
  const pathParts = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const owner = pathParts[0];
  const repo = pathParts[1]?.replace(/\.git$/, ""); // Remove .git suffix if present

  if (!owner || !repo) return null;

  // Validate segment characters and length
  if (!VALID_SEGMENT_REGEX.test(owner) || !VALID_SEGMENT_REGEX.test(repo)) {
    return null;
  }

  return { owner, repo };
}

async function fetchWithRetry(
  url: string,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<Response> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-contributor-stats",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  let lastError: Error | null = null;
  let delay = initialDelay;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const response = await fetch(url, {
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle rate limiting with Retry-After header
      if (response.status === 429 || response.status === 403) {
        const retryAfter = response.headers.get("retry-after");
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : delay;
        
        if (attempt < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, Math.min(waitTime, 10000)));
          delay *= 2; // Exponential backoff
          continue;
        }
      }

      // 202 means GitHub is computing stats
      if (response.status === 202 && attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 1.5;
        continue;
      }

      // Retry on server errors
      if (response.status >= 500 && attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on abort (timeout)
      if (lastError.name === "AbortError") {
        throw new Error("Request timeout");
      }

      // Retry on network errors
      if (attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}

function isValidContributor(contributor: GitHubContributor): contributor is GitHubContributor & { author: GitHubAuthor } {
  return (
    contributor.author !== null &&
    typeof contributor.author.login === "string" &&
    typeof contributor.author.id === "number"
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const repoUrl = searchParams.get("repo");

  if (!repoUrl) {
    return NextResponse.json(
      { success: false, error: "Missing repo parameter" } as GitHubStatsResponse,
      { status: 400 }
    );
  }

  const parsed = parseGitHubUrl(repoUrl);
  if (!parsed) {
    return NextResponse.json(
      { success: false, error: "Invalid GitHub URL" } as GitHubStatsResponse,
      { status: 400 }
    );
  }

  const { owner, repo } = parsed;
  const apiUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/stats/contributors`;

  try {
    const response = await fetchWithRetry(apiUrl);

    if (response.status === 202) {
      return NextResponse.json(
        {
          success: false,
          error: "Stats are being computed. Please try again in a few seconds.",
        } as GitHubStatsResponse,
        { status: 202 }
      );
    }

    if (response.status === 403) {
      const remaining = response.headers.get("x-ratelimit-remaining");
      if (remaining === "0") {
        return NextResponse.json(
          { success: false, error: "GitHub API rate limit exceeded. Please try again later." } as GitHubStatsResponse,
          { status: 429 }
        );
      }
      return NextResponse.json(
        { success: false, error: "Access denied to repository" } as GitHubStatsResponse,
        { status: 403 }
      );
    }

    if (response.status === 404) {
      return NextResponse.json(
        { success: false, error: "Repository not found" } as GitHubStatsResponse,
        { status: 404 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch repository stats" } as GitHubStatsResponse,
        { status: response.status }
      );
    }

    const data: GitHubContributor[] = await response.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { success: true, contributors: [] } as GitHubStatsResponse,
        { status: 200 }
      );
    }

    // Filter out contributors with null author and map to our format
    const validContributors = data.filter(isValidContributor);

    if (validContributors.length === 0) {
      return NextResponse.json(
        { success: true, contributors: [] } as GitHubStatsResponse,
        { status: 200 }
      );
    }

    // Calculate totals - optimize by computing in single pass
    const contributors: ContributorStats[] = validContributors.map((contributor) => {
      let additions = 0;
      let deletions = 0;
      
      for (const week of contributor.weeks) {
        additions += week.a;
        deletions += week.d;
      }

      return {
        login: contributor.author.login,
        id: contributor.author.id,
        avatarUrl: contributor.author.avatar_url,
        profileUrl: contributor.author.html_url,
        totalCommits: contributor.total,
        additions,
        deletions,
        percentageOfTop: 0,
      };
    });

    // Sort by total commits (descending)
    contributors.sort((a, b) => b.totalCommits - a.totalCommits);

    // Calculate percentage relative to top contributor
    const topContributions = contributors[0]?.totalCommits || 1;
    for (const contributor of contributors) {
      contributor.percentageOfTop = Math.round(
        (contributor.totalCommits / topContributions) * 100
      );
    }

    return NextResponse.json(
      { success: true, contributors } as GitHubStatsResponse,
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`GitHub API error for ${owner}/${repo}:`, message);
    
    return NextResponse.json(
      { success: false, error: "Failed to fetch GitHub stats" } as GitHubStatsResponse,
      { status: 500 }
    );
  }
}
