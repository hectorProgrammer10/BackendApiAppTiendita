# 🚀 Backend API - Asistente IA de Ventas (TiendaApp)

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Model-Gemini%203.5%20Flash%20Lite-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

Microservicio backend serverless de alto rendimiento para el **Asistente Inteligente de Negocio y Ventas** de **TiendaApp**. Utiliza el modelo de última generación **Gemini 3.5 Flash Lite** (`gemini-3.5-flash-lite`) mediante el SDK oficial de Google GenAI, optimizado para ejecutarse en [Vercel](https://vercel.com).

Repositorio oficial: [hectorProgrammer10/BackendApiAppTiendita](https://github.com/hectorProgrammer10/BackendApiAppTiendita.git)

---

## 🎯 Características Principales

* ⚡ **Modelo Gemini 3.5 Flash Lite:** Respuestas ultra-rápidas, bajo costo computacional y alta capacidad de razonamiento comercial.
* 🛡️ **Motor Estricto Anti-Alucinaciones:** 
  * Instrucciones del sistema que prohíben al modelo inventar ventas, productos o montos.
  * Utiliza métricas deterministas calculadas previamente en la base de datos del dispositivo (`salesContext`).
  * Si un producto o periodo no tiene registros, el modelo declara explícitamente qué datos faltan y por qué no puede responder.
  * Marca automáticamente cualquier proyección o suposición como `[Aproximado / Estimado]`.
* 💡 **Generación Automática de Insights Comerciales:** Detecta patrones clave (productos estrella, anomalías en demanda, deudas de fiado elevadas) y genera un payload estructurado para que el teléfono lo guarde localmente.
* 🌐 **CORS Global Habilitado:** Configurado a nivel de edge router en `next.config.ts` y en las rutas API para admitir solicitudes desde la aplicación Android nativa sin bloqueos.
* ⏱️ **Protección contra Timeouts:** Configuración `maxDuration = 60` para serverless functions en Vercel, garantizando que ninguna respuesta extensa sea interrumpida.
* 🩺 **Diagnóstico de Salud:** Endpoint `/api/health` para comprobar conectividad, estado de variables de entorno y modelo activo.

---

## 📁 Estructura del Proyecto

```text
backend/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts        # Endpoint principal POST /api/chat (Node.js runtime, maxDuration: 60)
│   │   └── health/
│   │       └── route.ts        # Endpoint de diagnóstico GET /api/health
│   ├── favicon.ico
│   ├── globals.css             # Estilos globales Tailwind CSS
│   ├── layout.tsx              # Layout raíz de la aplicación
│   └── page.tsx                # Dashboard y panel de estado en producción
├── lib/
│   └── gemini.ts               # Cliente GenAI, validación de API Key y System Prompt
├── types/
│   └── chat.ts                 # Definición de tipos e interfaces TypeScript
├── public/                     # Recursos estáticos
├── .env.example                # Plantilla de variables de entorno
├── .env.local                  # Variables locales (ignorado en git)
├── .gitignore
├── next.config.ts              # Configuración de Next.js y cabeceras CORS globales
├── package.json
├── tsconfig.json
├── vercel.json                 # Configuración para despliegue en Vercel
└── README.md
```

---

## ⚙️ Variables de Entorno

Configura estas variables en tu archivo `.env.local` (local) o en el panel de **Vercel Project Settings > Environment Variables** (producción):

| Variable | Requerida | Valor por Defecto / Ejemplo | Descripción |
| :--- | :---: | :--- | :--- |
| `GEMINI_API_KEY` | **Sí** | `AIzaSyDfSu5...` | Clave de API de Google Gemini (Google AI Studio). |
| `GEMINI_MODEL` | No | `gemini-3.5-flash-lite` | Identificador del modelo Gemini a utilizar. |
| `PORT` | No | `3000` | Puerto para el servidor local. |

---

## 📡 Referencia de la API

### 1. `GET /api/health`
Comprueba el estado del servicio y si las credenciales de Gemini están configuradas.

**Respuesta Exitosa (`200 OK`):**
```json
{
  "status": "ok",
  "service": "tienda-agent-api",
  "timestamp": "2026-09-02T20:00:00.000Z",
  "model": "gemini-3.5-flash-lite",
  "geminiConfigured": true,
  "environment": "production"
}
```

---

### 2. `POST /api/chat`
Procesa la consulta del usuario sobre ventas e inventario, evalúa el contexto analítico y devuelve una respuesta estructurada.

**Headers:**
```http
Content-Type: application/json
```

**Cuerpo de la Petición (Request Body):**
```json
{
  "message": "¿Cuánto se vendió de Camarón Grande?",
  "workspaceId": "ws_tienda_principal",
  "history": [
    { "role": "user", "text": "Hola, quiero revisar mis ventas" },
    { "role": "model", "text": "¡Hola! Estoy listo para analizar tus ventas. ¿Qué deseas consultar?" }
  ],
  "salesContext": {
    "totalRevenue": 5000.0,
    "totalSalesCount": 10,
    "totalContado": 4500.0,
    "totalPendiente": 500.0,
    "averageTicket": 500.0,
    "topProducts": [
      {
        "name": "Camarón Grande",
        "quantitySold": 15.5,
        "unit": "kg",
        "totalAmount": 3875.0,
        "transactionCount": 6
      }
    ],
    "targetProductMetrics": {
      "name": "Camarón Grande",
      "totalUnits": 15.5,
      "unit": "kg",
      "totalMoney": 3875.0,
      "avgPrice": 250.0,
      "transactionCount": 6
    }
  }
}
```

**Respuesta Exitosa (`200 OK`):**
```json
{
  "reply": "Se han vendido **15.5 kg** de **Camarón Grande**, generando un ingreso total de **$3,875.00** en 6 transacciones.",
  "dataMissing": null,
  "isApproximate": false,
  "suggestedActions": [
    "¿Cuál es el margen de ganancia del Camarón Grande?",
    "¿Cuánto dinero hay pendiente por cobrar?"
  ],
  "newInsight": {
    "title": "Camarón Grande es el líder",
    "content": "Representa el 77.5% de los ingresos totales de la tienda en este periodo.",
    "type": "opportunity"
  }
}
```

**Respuesta cuando faltan datos (Anti-Alucinación):**
```json
{
  "reply": "No se encontraron registros de venta para **Salmón Noruego** en el periodo consultado. Para responderte necesitaría que se registren ventas de dicho producto en este espacio de trabajo.",
  "dataMissing": "No se encontraron datos de ventas para el producto Salmón Noruego en el contexto actual.",
  "isApproximate": false,
  "suggestedActions": [
    "¿Cuáles son los productos más vendidos?",
    "Resumen de ventas de hoy"
  ],
  "newInsight": null
}
```

---

## 💻 Desarrollo Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Copia el archivo de ejemplo y coloca tu API Key:
   ```bash
   cp .env.example .env.local
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La API estará disponible en `http://localhost:3000`.

4. **Validación de código:**
   ```bash
   npm run lint   # Verifica que no haya errores de linter
   npm run build  # Verifica la compilación de producción con TypeScript
   ```

---

## ☁️ Despliegue en Vercel (Producción)

Dado que este repositorio ya está vinculado a GitHub en [BackendApiAppTiendita](https://github.com/hectorProgrammer10/BackendApiAppTiendita.git):

1. Ve a tu panel en [Vercel Dashboard](https://vercel.com/dashboard).
2. Haz clic en **"Add New..." > "Project"**.
3. Selecciona el repositorio **`hectorProgrammer10/BackendApiAppTiendita`**.
4. Deja la configuración de framework en **Next.js** y Root Directory en `./`.
5. En la sección **Environment Variables**, añade:
   * `GEMINI_API_KEY`: Tu clave de API de Gemini (`AIzaSyDfSu5...`).
   * `GEMINI_MODEL`: `gemini-3.5-flash-lite`.
6. Haz clic en **Deploy**.

Vercel compilará el proyecto y te asignará una URL de producción (por ejemplo: `https://backend-api-app-tiendita.vercel.app`).

---

## 📱 Vinculación con la Aplicación Móvil Android

Una vez que tengas tu URL de Vercel:

1. Abre **TiendaApp** en tu teléfono Android o emulador.
2. Toca la tarjeta **"Asistente IA de Ventas"** en la pantalla principal.
3. Toca el ícono de **Engrane (Ajustes)** en la esquina superior derecha.
4. Escribe tu URL de producción:
   ```text
   https://backend-api-app-tiendita.vercel.app
   ```
5. Presiona **Guardar**.

A partir de ese momento, el asistente inteligente responderá utilizando la API alojada en la nube con acceso directo a tu modelo Gemini Flash Lite.
