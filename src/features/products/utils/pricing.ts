
import type { Product } from "../../../types/product";

export const calcularPrecioFinal  = (product: Product,descuento=0): number =>  {
      return   product.precio - (product.precio*descuento/100
    );
};

