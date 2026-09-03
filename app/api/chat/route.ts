import { NextRequest, NextResponse } from "next/server";
import { processAgentChat } from "@/lib/gemini";
import { ChatRequest } from "@/types/chat";

export const runtime = "nodejs";
export const maxDuration = 60;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatRequest;

    if (!body || !body.message || body.message.trim() === "") {
      return NextResponse.json(
        { error: "El mensaje no puede estar vacío." },
        { status: 400, headers: corsHeaders }
      );
    }

    const response = await processAgentChat(body);

    return NextResponse.json(response, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error en POST /api/chat:", err);
    return NextResponse.json(
      {
        error: err.message || "Error interno al procesar la solicitud con Gemini.",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
