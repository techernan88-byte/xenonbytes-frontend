// Genera la lista de páginas a mostrar: 1, "...", ventana alrededor de la act

function generarPaginas(actual: number, total: number): (number | "...")[] {
  const delta = 5; // cuántas páginas a cada lado de la actual
  const paginas: (number | "...")[] = [];

  const inicioVentana = Math.max(2, actual - delta);
  const finVentana = Math.min(total - 1, actual + delta);

  paginas.push(1); // siempre la primera

  if (inicioVentana > 2) paginas.push("..."); // hueco izquierdo

  for (let i = inicioVentana; i <= finVentana; i++) {
    paginas.push(i);
  }

  if (finVentana < total - 1) paginas.push("..."); // hueco derecho

  if (total > 1) paginas.push(total); // siempre la última
  console.log(paginas);
  return paginas;
}

interface PaginacionProps {
  pagina: number;
  totalPaginas: number;
  onCambiar: (nueva: number) => void;
}

export const Paginacion = ({ pagina, totalPaginas, onCambiar }: PaginacionProps) => {
  if (totalPaginas <= 1) return null; // una sola página: no mostramos nada

  const paginas = generarPaginas(pagina, totalPaginas);

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mt-8 mb-4">
      <button
        onClick={() => onCambiar(Math.max(1, pagina - 1))}
        disabled={pagina === 1}
        className="px-3 py-2 rounded bg-oscuro text-white hover:bg-marca cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      {paginas.map((p, i) =>
        p === "..." ? (
          <span key={`gap-${i}`} className="px-2 text-oscuro">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onCambiar(p)}
            className={`px-3 py-2 rounded cursor-pointer transition-colors ${
              p === pagina
                ? "bg-marca text-white"
                : "bg-white border border-gray-300 text-oscuro hover:bg-fondo"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onCambiar(Math.min(totalPaginas, pagina + 1))}
        disabled={pagina >= totalPaginas}
        className="px-3 py-2 rounded bg-oscuro text-white hover:bg-marca cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  );
};