import {createContext, useContext, type ReactNode} from "react";
import {useAuthState} from "../hooks/useAuth";

type AuthContextValue = ReturnType<typeof useAuthState>;

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider ({children}:{children:ReactNode}){
    const auth= useAuthState();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export function useAuth(){
    const contexto = useContext(AuthContext);
    if (contexto===null){
        throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    }
    return contexto;
};