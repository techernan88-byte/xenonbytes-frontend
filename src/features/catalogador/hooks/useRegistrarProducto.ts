import {useMutation, useQueryClient  } from "@tanstack/react-query";
import { registrarProducto } from "../services/catalogadorServices";
import { type ProductoARegistrar } from "../../../types/catalogador";


export const useRegistrarProducto =()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn: (product:ProductoARegistrar)=>registrarProducto(product),
        onSuccess:()=>{queryClient.invalidateQueries({queryKey:["productos"]})} ,
    });
};

