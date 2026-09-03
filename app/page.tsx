export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <main className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                TiendaApp AI Agent API
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Producción Lista
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Microservicio de analítica de ventas y asistencia comercial impulsado por{" "}
              <span className="font-semibold text-sky-400">Gemini</span>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Modelo Configurado
            </h2>
            <p className="text-lg font-mono font-medium text-sky-300">
              *****************
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Máxima velocidad, bajo costo y control estricto anti-alucinaciones.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Plataforma
            </h2>
            <p className="text-lg font-mono font-medium text-purple-300">
              Vercel Serverless Edge
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Node.js Runtime con CORS habilitado para apps móviles y web.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Endpoints Disponibles
          </h2>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400">
                  GET
                </span>
                <span className="text-slate-200">********</span>
              </div>
              <a
                href="*********"
                className="text-xs text-sky-400 hover:text-sky-300 underline font-medium"
                target="_blank"
              >
                Probar en navegador &rarr;
              </a>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-400">
                  POST
                </span>
                <span className="text-slate-200">*****************</span>
              </div>
              <p className="text-xs text-slate-400">
                Recibe la consulta del comerciante, historial de conversación y contexto de ventas precalculado.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-4 text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">Integración con TiendaApp Móvil:</p>
          <p>

             Asistente IA en la aplicación móvil.
          </p>
        </div>
      </main>

      <footer className="mt-8 text-xs text-slate-500 text-center">
        Pescadería App &copy; {new Date().getFullYear()} &bull; Todos los derechos reservados.
      </footer>
    </div>
  );
}
