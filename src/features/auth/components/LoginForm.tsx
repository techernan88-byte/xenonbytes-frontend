import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { iniciarSesion } from "../services/authService";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: () => iniciarSesion(email, password),
    onSuccess: (data) => {
      login(data.token, data.usuario);
      console.log("Login ok", data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-fondo p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-oscuro">Iniciar sesión</h1>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
          autoComplete="password"
        />
        {loginMutation.isError && (
          <p className="text-red-600 text-sm">{loginMutation.error.message}</p>
        )}
         <Link
        to="/registro"
        className="text-sm text-center text-marca hover:underline"
      >
        ¿No tienes cuenta? Regístrate
      </Link>
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-marca text-white rounded py-2 font-semibold disabled:opacity-50"
        >
          {loginMutation.isPending ? "Entrando" : "Entrar"}
        </button>
      </form>
     
    </div>
  );
};
