
import {type Product } from "../../../types/product";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const obtenerProductos = async (): Promise<Product[]> => {
   const respuesta = await fetch(`${API_URL}/productos`);

   if(!respuesta.ok){
    throw new Error("No se pudieron carga los productos");
   }
  
  
  return respuesta.json();
};


