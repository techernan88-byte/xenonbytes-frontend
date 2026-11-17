import { useEffect, useRef } from "react";
import { type MensajeUI } from "../../../types/chat";
import { MessageBubble } from "./MessageBubble";

interface Props {
  mensajes: MensajeUI[];
  cargando: boolean;
}

export function MessageList({ mensajes, cargando }: Props) {
  // Auto-scroll al último mensaje cada vez que llega uno nuevo o inicia carga
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes.length, cargando]);

  // Estado vacío (primera visita)
  if (mensajes.length === 0 && !cargando) {
    return (
      <div className="flex-1 flex items-center justify-center text-center p-6">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-oscuro mb-2">
            Hola, soy tu asistente de Xenonbytes
          </h2>
          <p className="text-gray-600">
            Puedo ayudarte a elegir componentes, armar una PC completa o
            encontrar algo específico de nuestro catálogo. Pregúntame lo que
            necesites.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {mensajes.map((m) => (
        <MessageBubble key={m.id} mensaje={m} />
      ))}

      {cargando && (
        <div className="flex justify-start mb-3">
          <div className="bg-white text-gray-500 px-4 py-2 rounded-2xl rounded-bl-sm shadow">
            <span className="inline-flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              />
            </span>
          </div>
        </div>
      )}

      <div ref={finRef} />
    </div>
  );
}