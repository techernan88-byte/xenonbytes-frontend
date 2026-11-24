import {useMutation, useQueryClient} from "@tanstack/react-query";
import { escribirCategoria } from "../services/categoriaServices"; 

export function useEscribirCategoria(){

    const queryClient =useQueryClient();

    return useMutation({
        mutationFn:(nombre:string)=>escribirCategoria(nombre) ,
        onSuccess:()=>{queryClient.invalidateQueries({queryKey:["categorias"]})},
    });

};