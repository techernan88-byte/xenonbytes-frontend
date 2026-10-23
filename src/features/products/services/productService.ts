
import {type Product } from "../../../types/product";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface RespuestaProductos{
  productos:Product[],
  total: number,
  page: number,
  totalPaginas: number,
}


export const obtenerProductos = async (
  page:number=1,
  categoria?:string,
  busqueda?:string,
  disponibles?:boolean
): Promise<RespuestaProductos> => {
   
  let url = `${API_URL}/productos?page=${page}`;
  if (categoria){
    //* encodeURIComponent sanitiza los datos para los espacios con %
    url +=`&categoria=${encodeURIComponent(categoria)}`;
  };
  if (busqueda){url +=`&busqueda=${encodeURIComponent(busqueda)}`};
  if (disponibles){url += `&disponibles=true`};
  

  const respuesta = await fetch(url);
  //console.log(respuesta.json());
   if(!respuesta.ok){
    throw new Error("No se pudieron carga los productos");
   }
  
  
  return respuesta.json();
};


