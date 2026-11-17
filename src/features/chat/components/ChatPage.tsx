import { useChat } from "../hooks/useChat";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

export function ChatPage() {
  const { mensajes, cargando, error, enviar, nuevaConversacion } = useChat();

  return (
    // pt-20 para no quedar debajo del header fixed
    <div className="pt-20 flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <h1 className="text-lg font-bold text-oscuro">Asistente Xenonbytes</h1>
        <button
          onClick={nuevaConversacion}
          className="text-sm text-gray-600 hover:text-marca transition-colors cursor-pointer"
          disabled={cargando || mensajes.length === 0}
        >
          Nueva conversación
        </button>
      </div>

      <MessageList mensajes={mensajes} cargando={cargando} />

      {error && (
        <div className="bg-red-100 border-t border-red-300 text-red-800 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <MessageInput onEnviar={enviar} cargando={cargando} />
    </div>
  );
}