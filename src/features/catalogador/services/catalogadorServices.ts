import { type ProductoExtraido, type ProductoARegistrar } from "../../../types/catalogador";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Manda el texto crudo al backend, que se lo pasa a Claude y devuelve el borrador.
export const extraerProducto = async (text:string): Promise<ProductoExtraido>=>{
  //  console.log(text);
    const respuesta = await fetch(`${API_URL}/catalogador/extraer`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({texto:text})
    });

    if(!respuesta.ok){
        throw new Error("No se pudo extraer el producto");
    }
    return respuesta.json();
};


//guarda el producto revisado en base de datos

export const registrarProducto = async(producto:ProductoARegistrar): Promise<void> =>{
    const respuesta = await fetch(`${API_URL}/catalogador/registrar`,{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(producto),
    });
    if(!respuesta.ok){
        throw new Error("No se pudo registrar el producto");
    }
};


