import { type CarritoConProducto } from "./carritoConProducto";
import { type Product } from "./product";

export interface CarritoProps {
    carrito: CarritoConProducto[];
    quitItem: (item: CarritoConProducto)=>void;
    addItem: (item: CarritoConProducto)=>void;
    addToCart: (product: Product) => void;
    clearCart: ()=>void;
    toggleSeleccion: (item: CarritoConProducto)=>void;
    totalSeleccionado: number;    
}
