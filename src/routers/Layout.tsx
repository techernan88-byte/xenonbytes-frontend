import {Outlet,Link} from "react-router-dom";

export function Layout(){
    return (
        <div className="min-h-screen flex flex-col bg-fondo">
        <header className="fixed top-0 left-0 right-0 bg-oscuro text-white px-6 py-4 flex items-center gap-6 shadow-md z-50">
        <h1 className="text-xl font-bold">🛒 Tienda Xenonbytes</h1>
        <nav className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-marca-claro transition-colors">Inicio</Link>
          <Link to="/" className="hover:text-marca-claro transition-colors">Productos</Link>
          <Link to="/carrito" className="hover:text-marca-claro transition-colors">Carrito</Link>
        </nav>
        <a href="#" className="ml-auto hover:text-marca-claro transition-colors">
          Iniciar Sesión
        </a>
      </header>
      <Outlet/>

        </div>
    );
}