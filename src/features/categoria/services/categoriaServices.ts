import { type Categoria } from "../../../types/categoria";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const obtenerCategorias = async (): Promise<Categoria[]>=>{
    const respuesta= await fetch(`${API_URL}/categorias`);
    if (!respuesta.ok){
        throw new Error ("No se pudieron cargar las categorias");
    }
    return respuesta.json();
};