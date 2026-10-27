export interface ProductoExtraido {
  titulo: string,
  precio_mercado: number,
  categoria: string,
  esNueva:boolean,
  descripcion: string,
}
 
export interface ProductoARegistrar {
  titulo: string,
  precio: number,
  categoria: string,
  esNueva:boolean,
  descripcion: string,
}