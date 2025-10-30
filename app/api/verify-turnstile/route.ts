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

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      // Log server-side only, don't expose to client
      console.error("Turnstile secret key not configured");
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

    // Verify token with Cloudflare Turnstile
    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: clientIp,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      // Don't expose error codes to client - security risk
      return NextResponse.json(
        {
          success: false,
          error: "Turnstile verification failed",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      challenge_ts: data["challenge_ts"],
      hostname: data.hostname,
    });
  } catch (error) {
    // Log server-side only, don't expose error details to client
    console.error("Error verifying Turnstile:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

