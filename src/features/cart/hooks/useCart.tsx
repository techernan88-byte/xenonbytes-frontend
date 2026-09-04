
import { type Product } from "../../../types/product";
import { type carritoItem } from "../../../types/carritoItem";
import { useState } from 'react';
import { calcularPrecioFinal } from '../../products/utils/pricing';


export function useCartState() {

    const [cart, setCart] = useState<carritoItem[]>([]);


    const clearCart = () => { setCart([]) };

    const total = cart.reduce((sum, item) => sum + calcularPrecioFinal(item.producto) * item.cantidad, 0);

    const addToCart = (product: Product) => {
 

        setCart((prev) => {
            const existe = prev.find((item) => item.producto.id === product.id);

            if (existe) {
                return prev.map((item) =>
                    item.producto.id === product.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prev, { producto: product, cantidad: 1 ,seleccionado:true }];
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

    const addItem =(id:number)=>{
        setCart((prev)=> 
            prev.map((item)=>
            item.producto.id ===id
                ? {...item,cantidad: item.cantidad+1}  
                :item 
            )
        );
            
    }

    const toggleSeleccion = (id:number)=>{
        setCart((prev)=>
            prev.map((item)=>
            item.producto.id===id
            ? {...item,seleccionado:!item.seleccionado}
            : item
            )
        ); 
    }

    const totalSeleccionado = cart
            .filter((item)=>item.seleccionado)
            .reduce((sum,item)=>sum + calcularPrecioFinal(item.producto)*item.cantidad,0);

    return { cart, total, addToCart, clearCart, removeFromCart, addItem, toggleSeleccion, totalSeleccionado};
};

