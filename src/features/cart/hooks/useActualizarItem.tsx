import {useMutation, useQueryClient} from '@tanstack/react-query';
import { actualizarItem } from '../services/cartService';
import { useAuth } from '../../auth/context/authcontext';

export function useActualizarItem (){
    const queryClient = useQueryClient();
    const { token } = useAuth();

    return useMutation(
        {
            mutationFn: ({id,cambios}:{id:string; cambios: {cantidad?:number; seleccionado?:boolean}})=>
                actualizarItem(token!, id, cambios),
            onSuccess: ()=>{
                queryClient.invalidateQueries({queryKey:["carrito"]});
            },
        });

}
