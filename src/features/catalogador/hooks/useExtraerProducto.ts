import {useMutation} from "@tanstack/react-query";
import { extraerProducto } from "../services/catalogadorServices";


export const useExtraerProducto =()=>{
    return useMutation({
        mutationFn: (texto:string)=>extraerProducto(texto),
    });
};

