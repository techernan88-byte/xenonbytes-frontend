import { type Product } from "./product";
export interface CarritoServerItem {
    id: string;
    productoId: number;
    cantidad: number;
    seleccionado:boolean;
    producto: Product;
}

