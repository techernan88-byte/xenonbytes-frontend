import { createContext, useContext, type ReactNode } from "react";
import { useCartState } from "../hooks/useCart";

type CartContextValue = ReturnType<typeof useCartState>;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCartState();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart(){
    const contexto = useContext(CartContext);
    if(contexto=== null){
        throw new Error('useCart debe usarse dentro de <CartProvider>');
    }
    return contexto;
}
