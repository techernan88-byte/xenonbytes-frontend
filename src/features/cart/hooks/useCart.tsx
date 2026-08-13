
import { type Product } from "../../../types/product";
import { type carritoItem } from "../../../types/carritoItem";
import { useState } from 'react';
import { calcularPrecioFinal } from '../utils/pricing';


export function useCart(descuento: number) {

    const [cart, setCart] = useState<carritoItem[]>([]);


    const clearCart = () => { setCart([]) };

    const total = cart.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

    const addToCart = (product: Product) => {
        const precioDescuento = calcularPrecioFinal(product, descuento);
        const productoConPrecio = { ...product, precio: precioDescuento };

        setCart((prev) => {
            const existe = prev.find((item) => item.producto.id === product.id);

            if (existe) {
                return prev.map((item) =>
                    item.producto.id === product.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prev, { producto: productoConPrecio, cantidad: 1 }];
        }
        );


    };

    const removeFromCart = (id: number) => {
        // setCart((prev) => prev.filter((item) => item.producto.id !== id));  

        setCart((prev) => 
            prev.map((item) =>
                item.producto.id === id
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            ).filter((item) => item.cantidad > 0)
        
        );
    };

    return { cart, total, addToCart, clearCart, removeFromCart };
};

