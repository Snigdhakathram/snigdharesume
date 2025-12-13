import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sanitizedMessage = message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");

    // Send both emails in parallel
    const [notificationResult, confirmationResult] = await Promise.all([
      // Email to you with the user's message
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.CONTACT_EMAIL!,
        replyTo: email,
        subject: `Portfolio Contact: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background-color: #18181b; padding: 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">New Contact Form Message</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">From</p>
                    <p style="margin: 0; font-size: 16px; color: #18181b; font-weight: 500;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                    <a href="mailto:${email}" style="font-size: 16px; color: #2563eb; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                    <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px; border-left: 3px solid #18181b;">
                      <p style="margin: 0; font-size: 14px; color: #3f3f46; line-height: 1.6;">${sanitizedMessage}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 24px; background-color: #f4f4f5; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #18181b; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">Reply to ${name}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      }),
      // Confirmation email to user
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        replyTo: process.env.CONTACT_EMAIL!,
        subject: `Thanks for reaching out, ${name}!`,
        text: `Hi ${name},\n\nThank you for getting in touch! I've received your message and will get back to you as soon as possible.\n\nBest regards,\nVranda Garg\nhttps://vrandagarg.in`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 40px 24px; text-align: center;">
              <img src="https://res.cloudinary.com/dyetf2h9n/image/upload/v1765651418/dp_drn0rj.jpg" alt="Vranda Garg" width="80" height="80" style="border-radius: 50%; margin-bottom: 20px; border: 3px solid #e4e4e7;">
              <h1 style="margin: 0 0 8px 0; color: #18181b; font-size: 24px; font-weight: 600;">Thank You!</h1>
              <p style="margin: 0; color: #71717a; font-size: 14px;">Your message has been received</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 24px 32px 24px;">
              <div style="background-color: #f4f4f5; border-radius: 8px; padding: 24px; text-align: center;">
                <p style="margin: 0; color: #3f3f46; font-size: 15px; line-height: 1.6;">
                  Hi <strong>${name}</strong>,<br><br>
                  Thank you for getting in touch! I've received your message and will get back to you as soon as possible.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px; background-color: #18181b; text-align: center;">
              <p style="margin: 0 0 4px 0; color: #ffffff; font-size: 14px; font-weight: 500;">Vranda Garg</p>
              <p style="margin: 0 0 16px 0; color: #a1a1aa; font-size: 12px;">Full Stack Developer</p>
              <a href="https://vrandagarg.in" style="display: inline-block; background-color: #ffffff; color: #18181b; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 500;">Visit Portfolio</a>
            </td>
          </tr>
        </table>
        <p style="margin: 24px 0 0 0; font-size: 12px; color: #a1a1aa; text-align: center;">
          This email was sent from <a href="https://vrandagarg.in" style="color: #71717a;">vrandagarg.in</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      }),
    ]);

    if (notificationResult.error || confirmationResult.error) {
      console.error("Resend error:", notificationResult.error || confirmationResult.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
