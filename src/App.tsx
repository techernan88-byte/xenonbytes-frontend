import { useState, useEffect } from "react";
import { Carrito } from "./features/cart";
import { ProductCard} from "./features/products";
import { useCart } from "./features/cart/hooks/useCart";

import { obtenerProductos } from "./features/products/services/productService";
import { type Product } from "./types/product";

function App() {
  //obtener datos de servicio

  const [productos, setProductos] = useState<Product[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro Desconocido");
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  //carrito
  const descuento = 10;
  const { cart, total, addToCart, clearCart, removeFromCart } =
    useCart(descuento);

  //sidebar
  const [sideBarAbierto, setSidebarAbierto] = useState(false);
  const cambioSidebar = () => setSidebarAbierto((prev) => !prev);

  //categorias
  const categorias = ["Todo", ...new Set(productos.map((p) => p.categoria))];
  const [estadoCategoria, setCategoria] = useState("Todo");
  const productosFiltrados =
    estadoCategoria === "Todo"
      ? productos
      : productos.filter((p) => p.categoria === estadoCategoria);

  // filtros
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const productosVisibles = soloDisponibles
    ? productosFiltrados.filter((p) => p.stock > 0)
    : productosFiltrados;

  // busqueda
  const [busqueda, setBusqueda] = useState("");
  const productosBuscados =
    busqueda === ""
      ? productosVisibles
      : productosVisibles.filter((p) =>
          p.titulo.toLowerCase().includes(busqueda.toLowerCase()),
        );

  return (
    <div className="min-h-screen flex flex-col bg-fondo">
      <header className="fixed top-0 left-0 right-0 bg-oscuro text-white px-6 py-4 flex items-center gap-6 shadow-md z-50">
        <button onClick={cambioSidebar} className="text-white text-2xl">
          ☰
        </button>
        <h1 className="text-xl font-bold">🛒 Tienda Xenonbytes</h1>
        <nav className="flex gap-6 text-sm">
          <a href="#" className="hover:text-marca-claro transition-colors">
            Inicio
          </a>
          <a href="#" className="hover:text-marca-claro transition-colors">
            Productos
          </a>
          <a href="#" className="hover:text-marca-claro transition-colors">
            Ofertas
          </a>
        </nav>
        <a
          href="#"
          className="ml-auto hover:text-marca-claro transition-colors"
        >
          Iniciar Sesión
        </a>
      </header>

      {/* ===== CUERPO: sidebar + main ===== */}
      <div className="flex flex-1 pt-16 mt-3">
        {/* ===== SIDEBAR ===== */}

        <aside
          className={`fixed top-16 left-0 h-[calc(100%-4rem)]
             w-64 z-40 overflow-y-auto bg-white border-r border-gray-200 p-4 
             transition-transform duration-200 
             ${sideBarAbierto ? "translate-x-0" : "-translate-x-full"}`}
        >
          <ul className="flex flex-col gap-1 text-sm text-oscuro">
            {categorias.map((categoria) => (
              <li
                key={categoria}
                onClick={() => setCategoria(categoria)}
                className={`px-3 py-2 rounded-lg cursor-pointer transition-colors 
                  ${
                    estadoCategoria === categoria
                      ? "bg-marca text-white"
                      : "hover:bg-fondo"
                  }`}
              >
                {categoria}
              </li>
            ))}
          </ul>
        </aside>

        {/* ===== MAIN: tu contenido actual ===== */}
        <main
          className={`transition-all duration-300 px-5 ${sideBarAbierto ? "ml-64" : "ml-0"}`}
        >
          {/* FILTROS MAIN */}
          <div className="mb-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
            />
            <input
              type="checkbox"
              id="disponibles"
              checked={soloDisponibles}
              onChange={(e) => setSoloDisponibles(e.target.checked)}
              className="w-4 h-4"
            />
            <label
              htmlFor="Disponibles"
              className="text-sm text-oscuro cursor-pointer"
            >
              Solo disponibles
            </label>
          </div>

          {/* fila: CARRITO Y PRODUCTOS, directo dentro del main */}
          <div className="flex flex-col lg:flex-row gap-3 items-start mb-8">
            <div className="w-full lg:w-3/4">
              {cargando ? (
                <p className="p-8">Cargando productos...</p>
              ) : error ? (
                <p className="p-8 text-red-500">Error: {error}</p>
              ) : productosBuscados.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-lg font-medium"> No se encontraron productos</p>
                  <p className="text-sm"> Intenta con otra búsqueda o categoría </p>
                </div>
              ) : (
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {productosBuscados.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      inStock={product.stock > 0}
                      descuento={descuento}
                      onAddCart={addToCart}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/4 lg:sticky lg:top-4">
              <Carrito
                carrito={cart}
                total={total}
                quitCart={removeFromCart}
                clearCart={clearCart}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
