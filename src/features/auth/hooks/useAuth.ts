import {useState} from "react";
import {type Usuario} from "../../../types/auth";

export function useAuthState(){
   
    const [usuario, setUsuario] = useState<Usuario|null>(()=>{
        const guardado= localStorage.getItem("usuario");
        return guardado? JSON.parse(guardado) : null;
    });
    
    const [token,setToken] = useState<string|null>(()=>{
        return localStorage.getItem("token");
    });

    const login = (nuevoToken:string, nuevoUsuario:Usuario)=>{
        setToken(nuevoToken);
        setUsuario(nuevoUsuario);
        localStorage.setItem("token",nuevoToken);
        localStorage.setItem("usuario",JSON.stringify(nuevoUsuario))

    }

    const logout = ()=>{
        setToken(null);
        setUsuario(null);    
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");        
    }
    return {login,logout, usuario, token};

};