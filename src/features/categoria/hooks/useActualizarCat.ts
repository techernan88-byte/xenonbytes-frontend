import {useMutation, useQueryClient} from "@tanstack/react-query";
import {actualizarCategoria} from "../services/categoriaServices";

interface ActualizarInput{
    id: number,
    nombre:string,
};


export function useActualizarCategoria(){

    const queryClient = useQueryClient();

    return useMutation({
         mutationFn:({id,nombre}: ActualizarInput)=>actualizarCategoria(id,nombre),
         onSuccess:()=> {
            queryClient.invalidateQueries({queryKey:["categorias"]});
         },

    });

}