
import type { Product } from "../../../types/product";

const descuentoDefecto =0;

const descuentoPorCategoria: Record <string, number> ={
  "Computacion": 50,
  "Audio": 10,
  "Gaming":10
};

export const obtenerDescuento = (product:Product) : number =>{
   return   descuentoPorCategoria[product.categoria] ?? descuentoDefecto;

};
 

export const calcularPrecioFinal  = (product: Product): number =>  {
      const descuento = obtenerDescuento(product);
      return   product.precio - (product.precio*descuento/100);
};

