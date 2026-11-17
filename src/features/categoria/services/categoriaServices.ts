import { type Categoria } from "../../../types/categoria";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const obtenerCategorias = async (): Promise<Categoria[]>=>{
    const respuesta= await fetch(`${API_URL}/categorias`);
    if (!respuesta.ok){
        const error = await respuesta.json();
        throw new Error (error.error || "No se pudieron cargar las categorias");
    }

    return respuesta.json();
};



export const escribirCategoria = async (nombre:string): Promise<Categoria>=>{
    
    const respuesta = await fetch(`${API_URL}/categorias`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({nombre}),
    });
        if(!respuesta.ok){
        const error = await respuesta.json();
        throw new Error(error.error); 
    };

    return respuesta.json();
};

export const actualizarCategoria = async (id:number, nombre:string): Promise<Categoria>=>{

    const respuesta = await fetch (`${API_URL}/categorias/${id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nombre}),
    });

        if(!respuesta.ok){
        const error = await respuesta.json();
        throw new Error(error.error); 
    };

    return respuesta.json();
};


interface RespuestaEliminar {
    mensaje?: string;
    error?: string;
    productosAsociados?: number;
}

export const  eliminarCategoria = async (id:number, cascade:boolean=false): Promise<RespuestaEliminar>=>{
    
    const URL:string =cascade ? `${API_URL}/categorias/${id}?cascade=true`: `${API_URL}/categorias/${id}`;
    
    const respuesta = await fetch(URL,{
        method:"DELETE",
    });

    if(!respuesta.ok){
        const error = await respuesta.json();
        throw new Error(error.error); 
    };


    return respuesta.json();
}


