import {useQuery} from '@tanstack/react-query';
import { obtenerCarrito } from '../services/cartService';

export function useCarritoQuery(){

       return useQuery({
            queryKey: ["carrito"],
            queryFn:obtenerCarrito,
        });

}