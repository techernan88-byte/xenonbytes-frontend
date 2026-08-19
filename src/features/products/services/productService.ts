import { PRODUCTOS } from "../../../PRODUCTOSexample";
import {type Product } from "../../../types/product";

export const obtenerProductos = async (): Promise<Product[]> => {
  return PRODUCTOS;
};


