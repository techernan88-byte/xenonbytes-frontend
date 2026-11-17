import { useState, type FormEvent, type KeyboardEvent } from "react";

interface Props {
  onEnviar: (texto: string) => void;
  cargando: boolean;
}

export function MessageInput({ onEnviar, cargando }: Props) {
  const [texto, setTexto] = useState("");

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault();
    if (!texto.trim() || cargando) return;
    onEnviar(texto);
    setTexto("");
  };

  // Enter envía, Shift+Enter hace salto de línea
  const manejarKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      manejarEnvio(e);
    }
  };

  return (
    <form
      onSubmit={manejarEnvio}
      className="border-t bg-white p-4 flex gap-2 items-end"
    >
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={manejarKeyDown}
        placeholder="Pregunta lo que necesites..."
        disabled={cargando}
        rows={1}
        className="flex-1 resize-none border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-marca disabled:bg-gray-100 max-h-32"
      />
      <button
        type="submit"
        disabled={cargando || !texto.trim()}
        className="bg-marca text-white px-5 py-2 rounded-xl hover:bg-marca-claro transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
      >
        Enviar
      </button>
    </form>
  );
}