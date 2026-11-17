// src/types/carritoServerItem.ts
import { type Product } from "./product";

// Lo que viene del back al LEER carrito (GET /carrito)
// Incluye el objeto producto completo porque el back hace include.
export interface CarritoServerItem {
  id: string;
  productoId: number;
  cantidad: number;
  seleccionado: boolean;
  producto: Product;
}

// Lo que mandas al back al AGREGAR (POST /carrito)
// NO lleva producto: el back solo necesita el id para hacer la relación.
export interface NuevoItemCarrito {
  productoId: number;
  cantidad: number;
  seleccionado: boolean;
}