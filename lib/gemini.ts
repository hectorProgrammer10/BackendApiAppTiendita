import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatRequest, ChatResponse } from "@/types/chat";

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

function getGenAIClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "La variable de entorno GEMINI_API_KEY no está configurada. Por favor configúrala en las variables de entorno de tu proyecto en Vercel."
    );
  }
  return new GoogleGenerativeAI(apiKey);
}

const SYSTEM_INSTRUCTION = `
Eres el Asistente Inteligente de Negocio y Ventas de "TiendaApp" (Pescadería y Punto de Venta).
Tu objetivo es responder consultas del comerciante sobre su historial de ventas, productos más vendidos, dinero recaudado, cuentas pendientes por cobrar (créditos/fiado) y métricas de desempeño comercial.

REGLAS CRÍTICAS DE PRECISIÓN Y CONTROL ANTI-ALUCINACIONES:
1. VERACIDAD ABSOLUTA: Tienes estrictamente PROHIBIDO inventar productos, clientes, fechas o montos de venta. Toda cifra cuantitativa que menciones debe basarse de manera verificable en el contexto de métricas ("salesContext") proporcionado.
2. DATOS FALTANTES: Si el usuario pregunta por un producto, fecha o dato que no se encuentra en el contexto provisto (o si el historial está vacío), debes indicarlo con total transparencia:
   - Indica qué producto o dato no se encontró.
   - Explica con claridad qué información te hace falta para responder.
   - NO intentes adivinar ni inventar datos hipotéticos como si fueran reales.
3. PRECISIÓN ARITMÉTICA: Las métricas en "salesContext" (totales, cantidades, promedios de ticket, ingresos por producto) han sido calculadas con exactitud mediante el motor de base de datos de la tienda. Utiliza siempre esos números exactos para responder.
4. ESTIMACIONES O PROYECCIONES: Si el comerciante solicita una recomendación o una proyección hipotética, debes advertir claramente que se trata de un valor "[Aproximado / Estimado]" y explicar tu razonamiento.
5. TONO: Sé directo, profesional, empático y orientado a la rentabilidad del negocio.

FORMATO DE SALIDA:
Debes responder SIEMPRE en formato JSON válido con la siguiente estructura:
{
  "reply": "Texto de tu respuesta al comerciante en markdown claro",
  "dataMissing": "Descripción breve si faltaron datos para contestar, o null si todo estuvo completo",
  "isApproximate": false (true sólo si tu respuesta incluye estimaciones o suposiciones),
  "suggestedActions": ["Pregunta sugerida 1", "Pregunta sugerida 2"],
  "newInsight": {
    "title": "Título corto de la recomendación o alerta (máx 5 palabras)",
    "content": "Descripción breve y accionable para el negocio",
    "type": "alert" | "opportunity" | "summary"
  } // Incluye newInsight sólo cuando detectes algo relevante digno de guardar en la base de datos (ej. alta deuda pendiente, producto estrella, etc.), o null en caso contrario.
}
`;

export async function processAgentChat(request: ChatRequest): Promise<ChatResponse> {
  const genAI = getGenAIClient();
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
      temperature: 0.2, // Baja temperatura para máxima precisión y mínima alucinación
      responseMimeType: "application/json",
    },
  });

  const promptPayload = {
    userMessage: request.message,
    salesContext: request.salesContext || null,
    note: "El salesContext contiene las métricas exactas calculadas directamente desde el historial de ventas del negocio.",
  };

  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  // Agregar historial previo
  if (request.history && request.history.length > 0) {
    for (const turn of request.history) {
      contents.push({
        role: turn.role === "user" ? "user" : "model",
        parts: [{ text: turn.text }],
      });
    }
  }

  // Turno actual del usuario
  contents.push({
    role: "user",
    parts: [{ text: JSON.stringify(promptPayload) }],
  });

  const result = await model.generateContent({ contents });
  const textOutput = result.response.text().trim();

  try {
    const parsed = JSON.parse(textOutput) as ChatResponse;
    return parsed;
  } catch (error) {
    console.error("Error parsing Gemini JSON output:", textOutput, error);
    return {
      reply: textOutput,
      dataMissing: null,
      isApproximate: false,
      suggestedActions: ["¿Cuál es el producto más vendido?", "Resumen de ventas"],
      newInsight: null,
    };
  }
}
