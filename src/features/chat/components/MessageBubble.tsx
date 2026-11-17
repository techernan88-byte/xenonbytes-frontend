import { type MensajeUI } from "../../../types/chat";

interface Props {
    mensaje: MensajeUI;
}

export function MessageBubble({mensaje}:Props){
    const esUser =mensaje.rol==="user";

    return(
    <div
      className={`flex w-full ${esUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl whitespace-pre-wrap break-words ${
          esUser
            ? "bg-marca text-white rounded-br-sm"
            : "bg-white text-oscuro rounded-bl-sm shadow"
        }`}
      >
        {mensaje.texto}
      </div>
    </div>

    );
}