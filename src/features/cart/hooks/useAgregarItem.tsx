import {useMutation,useQueryClient} from '@tanstack/react-query';
import {agregarItem} from '../services/cartService';
import { useAuth } from '../../auth/context/authcontext';
import { type CarritoServerItem } from '../../../types/carritoServerItem';

export function useAgregarItem(){
    const queryClient = useQueryClient();
    const { token } = useAuth();

    return useMutation({
        mutationFn: (item: Omit<CarritoServerItem,"id">) => agregarItem(token!, item),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["carrito"]});
        },
    });
}
