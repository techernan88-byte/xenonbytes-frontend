import {useMutation, useQueryClient} from "@tanstack/react-query";
import {eliminarCategoria} from "../services/categoriaServices";

interface EliminarInput {
    id:number,
    cascade?:boolean,
}

export function useEliminarCategoria(){
    const queryClient= useQueryClient();

    return useMutation(
     {
        mutationFn:({id, cascade=false}:EliminarInput)=>eliminarCategoria(id, cascade),
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ["categorias"] });
        },
     },   
    );
};