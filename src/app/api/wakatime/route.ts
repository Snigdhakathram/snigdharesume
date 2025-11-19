import { NextResponse } from 'next/server';

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const WAKATIME_API_URL = 'https://wakatime.com/api/v1/users/current/stats/last_7_days';

export async function GET() {
  if (!WAKATIME_API_KEY) {
    return NextResponse.json(
      { error: 'WakaTime API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(WAKATIME_API_URL, {
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`WakaTime API error: ${response.status}`);
    }

    const data = await response.json();

    const stats = {
      totalSeconds: data.data.total_seconds,
      dailyAverage: data.data.daily_average,
      humanReadableTotal: data.data.human_readable_total,
      humanReadableDailyAverage: data.data.human_readable_daily_average,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching WakaTime stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch WakaTime stats' },
      { status: 500 }
    );
  }
}
