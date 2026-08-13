import { type carritoItem } from "./carritoItem";

export interface CarritoProps {
    carrito: carritoItem[];
    total: number
    quitCart: (number: number)=>void;
    clearCart: ()=>void;
}
