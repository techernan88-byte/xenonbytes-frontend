import { type CarritoServerItem } from "../../../types/carritoServerItem";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// LEER — trae todos los items del carrito

export const obtenerCarrito = async (token:string): Promise<CarritoServerItem[]>=>{
    const respuesta = await fetch(`${API_URL}/carrito`,{
      headers:{Authorization: `Bearer ${token}`}
    });
    if(!respuesta.ok){
        throw new Error("NO se pudo obtener los datos") 
    }
    return respuesta.json();

};

// AGREGAR — crea una fila nueva. Recibe el item SIN id (json-server asigna el id)
export const agregarItem = async (
  token:string,
  item: Omit<CarritoServerItem,"id">): Promise<CarritoServerItem>=>{

  const respuesta = await fetch(`${API_URL}/carrito`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
    body: JSON.stringify(item),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo agregar el item al carrito");
  }

  return respuesta.json();

};

// ACTUALIZAR — modifica cantidad o seleccionado de una fila existente
export const actualizarItem = async (
  token:string,
  id: string,
  cambios: Partial<Pick<CarritoServerItem, "cantidad" | "seleccionado">>
): Promise<CarritoServerItem> => {
  const respuesta = await fetch(`${API_URL}/carrito/${id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}` },
    body: JSON.stringify(cambios),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo actualizar el item del carrito");
  }

  return respuesta.json();
};

// ELIMINAR — borra una fila
export const eliminarItem = async (token: string, id: string): Promise<void> => {
  const respuesta = await fetch(`${API_URL}/carrito/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar el item del carrito");
  }
};

