import { type RespuestaLogin, type Usuario } from "../../../types/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

//REGISTRO

export const registrar = async(
    email:string,
    password:string,
    nombre:string
): Promise<Usuario> =>{
    const respuesta= await fetch(`${API_URL}/auth/register`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email, password, nombre})
    });

    if(!respuesta.ok){
        const error = await respuesta.json();
        throw new Error(error.error || "no se pudo registrar");
    }

    return respuesta.json();
};

// Inicio de sesión

export const iniciarSesion = async (
    email:string,
    password:string
):Promise<RespuestaLogin>=>{
    const respuesta = await fetch(`${API_URL}/auth/login`,{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({email,password}),
    });
    if(!respuesta.ok){
        const error= await respuesta.json();
        throw new Error (error.error||"No se pudo iniciar sesión");
    }
    return respuesta.json();
};


export const obtenerPerfil = async (token:string): Promise<Usuario>=>{
    const respuesta = await fetch(`${API_URL}/auth/me`,{
        headers:{
            Authorization:`Bearer ${token}`
        },
    });
    if (!respuesta.ok){
        throw new Error("No se pudo obtener el perfil");
    };
    return respuesta.json();
};

