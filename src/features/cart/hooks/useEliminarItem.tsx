import {useMutation, useQueryClient} from '@tanstack/react-query';
import { eliminarItem } from '../services/cartService';

export function useEliminarItem(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id:string)=>eliminarItem(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ["carrito"]});
        },
    });
}