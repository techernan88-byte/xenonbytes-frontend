import {useState} from "react";
import {type Usuario} from "../../../types/auth";
import { useNavigate } from "react-router-dom";

type Sesion = {
    token:string, 
    usuario:Usuario
};



// Verifica si el token esta vigente
function tokenVigente (token:string): boolean{
    try{
// 1. toma la parte del medio del JWT osea payload (header.payload.firma)
// 2. pasa de Base64URL a Base64 normal (- → +, _ → /)
// 3. decodifica con atob y convierte el JSON en objeto
    const payloadBase64Url = token.split(".")[1];          // header.payload.firma → payload
    const payloadBase64 = payloadBase64Url
    .replace(/-/g, "+")                                 // Base64URL → Base64
    .replace(/_/g, "/");
    const payload = JSON.parse(atob(payloadBase64));       // decodifica y convierte a objeto
        const tieneExp = typeof payload.exp === "number";   // el token trae fecha de expiración
        const expiraEnMs = payload.exp * 1000;              // segundos → milisegundos
        return tieneExp && expiraEnMs > Date.now();         // regresa true o false depediendo si expira
    }catch{
        return false;
    }
};

// lee la informacion guardada, si el token vencio, borrar el localStorage
function leerSesion(): Sesion | null {
    try{
        const token =localStorage.getItem("token");
        const guardado = localStorage.getItem("usuario")
        if(!token|| !guardado || !tokenVigente(token)){
            localStorage.removeItem("token");
            localStorage.removeItem("usuario")
            return null;
        }
        return {token, usuario:JSON.parse(guardado)}
    }catch{
        return null;
    }
};


export function useAuthState(){
   
    const navigate=useNavigate();
    const [sesion, setSesion]= useState<Sesion| null>(leerSesion);
    

    const login = (nuevoToken:string, nuevoUsuario:Usuario)=>{
       
        setSesion({token: nuevoToken, usuario:nuevoUsuario});
        localStorage.setItem("token",nuevoToken);
        localStorage.setItem("usuario",JSON.stringify(nuevoUsuario))
        navigate("/productos");


    }

    const logout = ()=>{
        setSesion(null);    
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");        
    }
    return {
        // si no hay sesión (null/undefined) o no trae usuario, devuelve null; si sí, devuelve sesion.usuario
        usuario:sesion?.usuario ?? null,
        token: sesion?.token ?? null,
        login,
        logout
    };

};