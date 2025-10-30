import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error("reCAPTCHA secret key not configured");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Get client IP address
    const clientIp =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Verify token with Google
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: clientIp,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          error: "reCAPTCHA verification failed",
          "error-codes": data["error-codes"],
        },
        { status: 400 }
      );
    }

    // Check score (v3 returns a score from 0.0 to 1.0)
    // 1.0 = very likely a human, 0.0 = very likely a bot
    // Typically, scores above 0.5 are considered legitimate
    const score = data.score || 0;
    const threshold = 0.5;

    if (score < threshold) {
      return NextResponse.json(
        {
          success: false,
          error: "Low reCAPTCHA score",
          score: score,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      score: score,
      action: data.action,
    });
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

