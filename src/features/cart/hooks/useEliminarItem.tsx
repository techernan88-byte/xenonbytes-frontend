import {useMutation, useQueryClient} from '@tanstack/react-query';
import { eliminarItem } from '../services/cartService';
import { useAuth } from '../../auth/context/authcontext';

export function useEliminarItem(){
    const queryClient = useQueryClient();
    const { token } = useAuth();

    return useMutation({
        mutationFn: (id:string)=>eliminarItem(token!, id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ["carrito"]});
        },
    });
}
