import { useQuery } from "@tanstack/react-query";
import { obtenerCategorias } from "../services/categoriaServices";


export const useCategorias = ()=>{

    return useQuery({
        queryKey:["categorias"],
        queryFn: obtenerCategorias,
        staleTime:1000*60*60, // 1 hora
    });

};