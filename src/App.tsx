import { type Product } from "./types/product";
import { type ProductAPI } from "./types/productAPI";
import { ProductCard, Carrito } from "./features/cart";
import { useCart } from "./features/cart/hooks/useCart";
import { useEffect, useState } from "react";
import { adaptadorProducto } from "./features/cart/utils/adaptarproductos";

const PRODUCTOS: Product[] = [
  { id: 1, titulo: "Teclado GameFactor v6", precio: 1000 },
  { id: 2, titulo: "Mouse Logitech G305", precio: 800 },
  { id: 3, titulo: 'Monitor LG 27"', precio: 4500 },
  { id: 4, titulo: 'Generic USB"', precio: 199.99 },
  { id: 5, titulo: 'Bocinas THX"', precio: 5599.99 },
  { id: 6, titulo: 'TV LG 55"', precio: 13000 },
  {
    id: 7,
    titulo: "DAC HJ45 Sound Gt Hyperx Thewron Broan Gate Hate 233",
    precio: 1399.99,
  },
];

function App() {
  // DATOS LOCALES
  const descuento = 10;
  const { cart, total, addToCart, clearCart, removeFromCart } =
    useCart(descuento);

  // API ONLINE

  const [productosApi, setProductosApi] = useState<Product[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const traerProductosAPI = async () => {
      try {
        const respuesta = await fetch("https://fakestoreapi.com/products");
        if (!respuesta.ok) {
          throw new Error("Error: no se pudieron cargar los productos");
        }
        const datos: ProductAPI[] = await respuesta.json();
        const adaptados = datos.map((p) => adaptadorProducto(p));

        setProductosApi(adaptados);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setCargando(false);
      }
    };
    traerProductosAPI();
  }, []);

  return (
    <div>
      <header className="bg-oscuro text-white px-6 py-4 flex items-center justify-between shadow-md">
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
      </header>

      {/* ===== CUERPO: sidebar + main ===== */}
      <div className="flex flex-1">
        {/* ===== SIDEBAR ===== */}
        <aside className="w-56 bg-white border-r border-gray-200 p-4 hidden lg:block">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Categorías
          </p>
          <ul className="flex flex-col gap-1 text-sm text-oscuro">
            <li className="px-3 py-2 rounded-lg hover:bg-fondo cursor-pointer transition-colors">
              Teclados
            </li>
            <li className="px-3 py-2 rounded-lg hover:bg-fondo cursor-pointer transition-colors">
              Monitores
            </li>
            <li className="px-3 py-2 rounded-lg hover:bg-fondo cursor-pointer transition-colors">
              Audio
            </li>
            <li className="px-3 py-2 rounded-lg bg-marca text-white cursor-pointer">
              Todo
            </li>
          </ul>
        </aside>

        {/* ===== MAIN: tu contenido actual ===== */}
        <main className="flex-1 p-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="p-8 ">
              <div className="flex flex-col lg:flex-row gap-6 items-start mb-8">
                <div className="w-full lg:w-3/4">
                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {PRODUCTOS.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        inStock={true}
                        descuento={descuento}
                        onAddCart={addToCart}
                      />
                    ))}
                  </div>
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

              {productosApi.map((product) => (
                <div key={product.id} className="border p-4 mb-2">
                  <h3>{product.titulo}</h3>
                </div>
              ))}

              {cargando && <p className="p-8">Cargando Productos ...</p>}
              {error && <p className="p-8">Error {error}</p>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
