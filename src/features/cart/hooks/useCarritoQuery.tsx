import {useQuery} from '@tanstack/react-query';
import { obtenerCarrito } from '../services/cartService';
import { useAuth } from '../../auth/context/authcontext';

export function useCarritoQuery(){
    const { token } = useAuth();

    return useQuery({
        queryKey: ["carrito"],
        queryFn: () => obtenerCarrito(token!),
        enabled: !!token,
    });

} 
