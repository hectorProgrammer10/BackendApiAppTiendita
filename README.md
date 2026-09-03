# 🚀 TiendaApp AI Agent Backend (Next.js 16 + Gemini Flash Lite)

API backend en producción diseñada para ser alojada en [Vercel](https://vercel.com). Ofrece endpoints para el Agente Inteligente de Negocio de **TiendaApp** impulsado por el modelo **Gemini 3.5 Flash Lite** (`gemini-3.5-flash-lite`).

---

## 📋 Variables de Entorno Requeridas

En tu panel de proyecto en Vercel (**Project Settings > Environment Variables**), agrega las siguientes variables:

| Variable | Valor Recomendado / Descripción |
| :--- | :--- |
| `GEMINI_API_KEY` | Tu clave de API de Google Gemini (ej. `AIzaSyDfSu5...`) |
| `GEMINI_MODEL` | `gemini-3.5-flash-lite` |

> ⚠️ **Nota:** El archivo `.env.local` se utiliza únicamente para pruebas en tu entorno local y está excluido de Git por seguridad.

---

## 🚢 Pasos para Desplegar en Vercel

### Opción 1: Despliegue con Vercel CLI (Más rápido)
1. Abre tu terminal en la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Ejecuta el asistente de Vercel:
   ```bash
   npx vercel
   ```
   - Responde `Y` para configurar el proyecto.
   - Selecciona el scope/cuenta.
   - Deja las configuraciones por defecto (Next.js se detecta automáticamente).
3. Para publicar directamente a producción:
   ```bash
   npx vercel --prod
   ```
4. Agrega las variables de entorno en el panel web de Vercel o con el CLI:
   ```bash
   npx vercel env add GEMINI_API_KEY
   npx vercel env add GEMINI_MODEL
   ```

### Opción 2: Despliegue con GitHub
1. Si tienes tu proyecto subido a un repositorio en GitHub (o creas un subrepositorio para el backend):
2. Ve a [vercel.com/new](https://vercel.com/new) e importa tu repositorio.
3. En **Root Directory**, selecciona `backend`.
4. En **Environment Variables**, añade:
   - `GEMINI_API_KEY`: tu API Key de Gemini.
   - `GEMINI_MODEL`: `gemini-3.5-flash-lite`.
5. Haz clic en **Deploy**.

---

## 📡 Endpoints de la API

### 1. Health Check
* **Método:** `GET /api/health`
* **Descripción:** Comprueba el estado del microservicio y si Gemini está configurado.
* **Respuesta Exitosa (200 OK):**
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

### 2. Chat del Agente de Ventas
* **Método:** `POST /api/chat`
* **Headers:** `Content-Type: application/json`
* **Body:**
  ```json
  {
    "message": "¿Cuánto vendimos de Camarón?",
    "workspaceId": "ws_123",
    "history": [],
    "salesContext": {
      "totalRevenue": 4500.0,
      "totalSalesCount": 12,
      "totalContado": 4000.0,
      "totalPendiente": 500.0,
      "averageTicket": 375.0,
      "topProducts": [
        {
          "name": "Camarón",
          "quantitySold": 10.0,
          "unit": "kg",
          "totalAmount": 2500.0,
          "transactionCount": 5
        }
      ],
      "targetProductMetrics": {
        "name": "Camarón",
        "totalUnits": 10.0,
        "unit": "kg",
        "totalMoney": 2500.0,
        "avgPrice": 250.0,
        "transactionCount": 5
      }
    }
  }
  ```
* **Respuesta (200 OK):**
  ```json
  {
    "reply": "Se han vendido 10.0 kg de Camarón...",
    "dataMissing": null,
    "isApproximate": false,
    "suggestedActions": ["¿Cuál es el margen de ganancia?"],
    "newInsight": {
      "title": "Camarón es el producto estrella",
      "content": "Representa más del 50% de las ventas.",
      "type": "opportunity"
    }
  }
  ```

---

## 📱 Conexión con la Aplicación Móvil

Una vez desplegado en Vercel, obtendrás una URL como:
`https://tu-proyecto.vercel.app`

En la aplicación móvil Android:
1. Abre la pantalla del **Asistente IA**.
2. Toca el ícono de **Engrane / Configuración** en la esquina superior derecha.
3. Ingresa tu URL de Vercel:
   `https://tu-proyecto.vercel.app`
4. ¡Listo! La app se comunicará directamente con tu backend en la nube sin necesidad de tener tu computadora encendida.
# BackendApiAppTiendita
