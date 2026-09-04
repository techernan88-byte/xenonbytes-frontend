import { type carritoItem } from "./carritoItem";
import { type Product } from "./product";

export interface CarritoProps {
    carrito: carritoItem[];
    total: number
    quitItem: (number: number)=>void;
    addItem: (number: number)=>void;
    addToCart: (product: Product) => void;
    clearCart: ()=>void;
    
}
