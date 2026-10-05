import {useMutation, useQueryClient} from '@tanstack/react-query';
import { actualizarItem } from '../services/cartService';

export function useActualizarItem (){
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: ({id,cambios}:{id:string; cambios: {cantidad?:number; seleccionado?:boolean}})=>
                actualizarItem(id, cambios),
            onSuccess: ()=>{
                queryClient.invalidateQueries({queryKey:["carrito"]});
            },
        });
 
}