import { type ChatResponse } from "../../../types/chat";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


export const enviarMensaje = async(
    conversacionId:number | null,
    mensaje:string,
): Promise<ChatResponse>=>{

    const respuesta = await fetch(`${API_URL}/chat`,{
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify({conversacionId,mensaje}),
    });

    if(!respuesta.ok){
       const error= await respuesta.json().catch(()=>({})); 
       throw new Error(error.error || "No se pudo enviar el mensaje");
    }

    return respuesta.json();


};