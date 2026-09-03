import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "tienda-agent-api",
      timestamp: new Date().toISOString(),
      model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      environment: process.env.NODE_ENV || "production",
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
