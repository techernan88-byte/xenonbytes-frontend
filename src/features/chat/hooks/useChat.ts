import { useState, useEffect, useCallback } from "react";
import { enviarMensaje } from "../services/chatService";
import { type MensajeUI } from "../../../types/chat";

const STORAGE_KEY = "xenonbytes-conversacion-id";

export function useChat() {
  const [mensajes, setMensajes] = useState<MensajeUI[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // El conversacionId vive en localStorage para sobrevivir refresh.
  // Lo leemos UNA vez al montar; de ahí en adelante lo manejamos en memoria.
  const [conversacionId, setConversacionId] = useState<number | null>(() => {
    const guardado = localStorage.getItem(STORAGE_KEY);
    return guardado ? Number(guardado) : null;
  });

  // Cada vez que cambia conversacionId, lo persistimos.
  useEffect(() => {
    if (conversacionId !== null) {
      localStorage.setItem(STORAGE_KEY, String(conversacionId));
    }
  }, [conversacionId]);

  // Enviar un mensaje: agrega el user al toque (optimista),
  // luego espera la respuesta del back y agrega el assistant.
  const enviar = useCallback(
    async (texto: string) => {
      const textoLimpio = texto.trim();
      if (!textoLimpio || cargando) return;

      setError(null);

      // 1. Agregar mensaje del user al UI inmediatamente
      const mensajeUser: MensajeUI = {
        id: crypto.randomUUID(),
        rol: "user",
        texto: textoLimpio,
        timestamp: Date.now(),
      };
      setMensajes((prev) => [...prev, mensajeUser]);

      setCargando(true);
      try {
        const respuesta = await enviarMensaje(conversacionId, textoLimpio);

        // 2. Guardar el id si era nuevo
        if (conversacionId === null) {
          setConversacionId(respuesta.conversacionId);
        }

        // 3. Agregar la respuesta del assistant al UI
        const mensajeAssistant: MensajeUI = {
          id: crypto.randomUUID(),
          rol: "assistant",
          texto: respuesta.respuesta,
          timestamp: Date.now(),
        };
        setMensajes((prev) => [...prev, mensajeAssistant]);
      } catch (err) {
        const mensaje =
          err instanceof Error ? err.message : "Error desconocido";
        setError(mensaje);
      } finally {
        setCargando(false);
      }
    },
    [conversacionId, cargando]
  );

  // Botón de "nueva conversación": limpia TODO
  const nuevaConversacion = useCallback(() => {
    setMensajes([]);
    setConversacionId(null);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    mensajes,
    cargando,
    error,
    conversacionId,
    enviar,
    nuevaConversacion,
  };
}