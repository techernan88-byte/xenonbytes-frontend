import {Outlet,Link} from "react-router-dom";
import { useAuth } from "../features/auth/context/authcontext";


export function Layout(){
    const {usuario,logout} = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-fondo">
        <header className="fixed top-0 left-0 right-0 bg-oscuro text-white px-6 py-4 flex items-center gap-6 shadow-md z-50">
        <h1 className="text-xl font-bold">🛒 Tienda Xenonbytes</h1>
        <nav className="flex gap-6 text-sm">
          
          <Link to="/productos" className="hover:text-marca-claro transition-colors">Productos</Link>
          <Link to="/carrito" className="hover:text-marca-claro transition-colors">Carrito</Link>
          {usuario && (
            <div className="flex gap-6 text-sm">
            <Link to="/catalogador" className="hover:text-marca-claro transition-colors">Catalogar</Link>
            <Link to="/perfil" className="hover:text-marca-claro transition-colors">Cuenta</Link>
            </div>
            )}
        </nav>
        {usuario ?(
          <div className="ml-auto flex items-center gap-4">
           
            <span className="text-sm">Cuenta: {usuario.nombre ||usuario.email}</span>
            <button onClick={logout} className="bg-marca text-white px-3 py-1 rounded hover:bg-marca-claro transition-colors cursor-pointer">
            Cerrar Sesión</button>
          </div>
        ) : (
        
          <Link to="/" className="ml-auto hover:text-marca-claro transition-colors">Iniciar Sesión</Link>
         
        )}
      </header>
      <Outlet/>

        </div>
    );
}
