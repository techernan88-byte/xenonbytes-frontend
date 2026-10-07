import {useMutation,useQueryClient} from '@tanstack/react-query';
import {agregarItem} from '../services/cartService';

export function useAgregarItem(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: agregarItem,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["carrito"]});
        },
    });
}