import { type CarritoConProducto } from "./carritoConProducto";

export interface CarritoProps {
    carrito: CarritoConProducto[];
    quitItem: (item: CarritoConProducto)=>void;
    addItem: (item: CarritoConProducto)=>void;
    clearCart: ()=>void;
    toggleSeleccion: (item: CarritoConProducto)=>void;
    totalSeleccionado: number;    
}
