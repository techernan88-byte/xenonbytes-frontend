import { type Product } from "../../../types/product";
import { type ProductAPI } from "../../../types/productAPI";

export function adaptadorProducto(productapi:ProductAPI):Product {
    return{
     id: productapi.id,
     titulo: productapi.title,
     precio: productapi.price,
     categoria: productapi.category,
     stock: productapi.rating?.count ?? 0,
    };
}