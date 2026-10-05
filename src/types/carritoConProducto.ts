import {type Product } from "./product";

export interface CarritoConProducto{
    id: string;
    productoId:number;
    cantidad:number;
    seleccionado: boolean;
    producto:Product;
}