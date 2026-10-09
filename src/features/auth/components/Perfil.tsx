import {useQuery} from "@tanstack/react-query"
import { useAuth } from "../context/authcontext"
import { obtenerPerfil } from "../services/authService"

export function Perfil(){
    const {token} = useAuth();
    
    const {data: perfil, isLoading, isError}= useQuery({
        queryKey:["perfil"],
        queryFn:()=>obtenerPerfil(token!),
        enabled:!!token,
    });

if (isLoading) return <p className="pt-24 text-center">Cargando Perfil...</p>   

if (isError) return <p className="pf-24 text-center text-red-600">No se pudo cargar el perfil</p>   

return(
    <div className="pt-24 px-6">
        <h1 className="text-2xl font-bold text-oscuro">Mi Perfil</h1>
        <p>ID: {perfil?.id}</p>
        <p>Email: {perfil?.email}</p>
        <p>Nombre:{perfil?.nombre?? "-"}</p>
    </div>
);
}