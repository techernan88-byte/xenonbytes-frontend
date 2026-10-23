import {useState, useEffect} from "react";


export function useDebounce <T>(valor: T, delay: number=300): T{

    const [valorDebounced, setValorDebounced]=useState(valor);

    useEffect(()=>{
        //  actualiza el valor dentro de `delay` ms.
        const temporizador = setTimeout(()=>{
         setValorDebounced(valor);   
        },delay);

        // Esto es lo que hace el debounce: cada tecla reinicia la cuenta.
        return ()=>clearTimeout(temporizador);

    },[valor, delay]);
  
    return valorDebounced;
};