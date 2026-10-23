import {useState} from "react";
import {useMutation } from "@tanstack/react-query"
import {useNavigate, Link } from "react-router-dom";
import {registrar} from "../services/authService";

export const RegisterForm = ()=>{
    const [nombre, setNombre] =useState("");
    const [email, setEmail] =useState("");
    const [password,setPassword]=useState("");
    const [passwordConfirmar,setpasswordConfirmar]=useState("");
    const [errorPass, setErrorPass]= useState("");
    const navigate=useNavigate();

    const registroMutation = useMutation({
        mutationFn:()=> registrar(email, password, nombre),
        onSuccess: ()=>{
            navigate("/");
        },
    });

    const handledSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        if(password!==passwordConfirmar){
            setErrorPass("Las contraseñas no coinciden");
            return;
        }
        setErrorPass("");
        registroMutation.mutate();
    };

    return (
        <div className="flex justify-center mt-20 items-center min-h-[60vh] ">
            <form onSubmit={handledSubmit} className="flex flex-col gap-4 bg-fondo p-8 ">
            <h1 className="text-2xl font-bold text-oscuro">Crear cuenta</h1>

            <input type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
                className="border rounded px-3 py-2"
            />
            <input type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="border rounded px-3 py-2"
            />
            <input type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="border rounded px-3 py-2"
            />
              <input type="password"
                placeholder="Confirmar contraseña"
                value={passwordConfirmar}
                onChange={(e)=>setpasswordConfirmar(e.target.value)}
                className="border rounded px-3 py-2"
            />

            {registroMutation.isError &&(
                <p className="text-red-600 text-sm">{registroMutation.error.message}</p>
            )}
                        <Link to="/login" className="text-sm text-center text-marca hover:underline">
                ¿Ya tienes cuenta? Inicia sesión
            </Link>

            <button type="submit"
             disabled={registroMutation.isPending}
             className="bg-marca text-white rounded py-2 font-semibold disabled:opacity-50 cursor-pointer"
            >
                {registroMutation.isPending? "Creadno":"Registrar"}
            </button>

            {errorPass &&<p className="text-red-600 text-sm">{errorPass}</p>}
            </form>

        </div>
    );

};