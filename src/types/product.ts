
export interface Product{
     id: number;
     titulo: string;
     precio: number;
}  

export interface propsProduct {
    product: Product
    descuento?: number;
    onAddCart: (producto:Product)=>void;
    inStock: boolean;
   
}

