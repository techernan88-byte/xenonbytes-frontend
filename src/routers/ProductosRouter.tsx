import { useState } from "react";
import { MiniCarrito } from "../features/cart";
import { ProductCard } from "../features/products";
import { useQuery } from "@tanstack/react-query";
import { obtenerProductos } from "../features/products/services/productService";
import { useCarritoQuery } from "../features/cart/hooks/useCarritoQuery";
import {useAgregarItem } from "../features/cart/hooks/useAgregarItem";
import {useActualizarItem} from "../features/cart/hooks/useActualizarItem";
import { useEliminarItem } from "../features/cart/hooks/useEliminarItem";
import {type CarritoConProducto} from "../types/carritoConProducto";
import { calcularPrecioFinal } from "../features/products/utils/pricing";

export function ProductosRouter() {
  //obtener datos de servicio
  const {
    data: productos = [],
    isPending: cargando,
    isError,
    error,
  } = useQuery({
    queryKey: ["productos"],
    queryFn: obtenerProductos,
  });

  //carrito
  const { data: carrito =[] } = useCarritoQuery();
  //console.log("Carrito del servidor:", carrito);

  // Agregar  al Carrito
  const agregar = useAgregarItem();

  //Actualizar en el carrito
  const actualizar = useActualizarItem();

  // Eliminar del carrito
  const eliminar= useEliminarItem();

  //Encontrar datos productos en carrito
  const carritoConProductos = carrito.map((item)=>{
    const producto = productos.find((p)=>p.id===item.productoId);
    return {...item, producto};
  })
  .filter((item): item is CarritoConProducto=> item.producto!==undefined);
  
  const totalSeleccionado = carritoConProductos.filter((item)=>item.seleccionado)
            .reduce((sum,item)=>sum + calcularPrecioFinal(item.producto)*item.cantidad,0);

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

     //   console.log(productosBuscados);

  return (
    <>
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

        {/* ===== MAIN ===== */}
        <main
          className={`transition-all duration-300 pl-16 px-5 ${sideBarAbierto ? "ml-64" : "ml-0"}`}
        >
          {/* FILTROS MAIN */}
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={cambioSidebar}
              className="px-3 py-2 flex items-center justify-center rounded bg-oscuro text-white hover:bg-marca cursor-pointer transition-colors"
              aria-label="Mostrar u ocultar categorías"
            >
              Categorias
            </button>

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
              className="w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor="disponibles"
              className="text-sm text-oscuro cursor-pointer"
            >
              Solo disponibles
            </label>
          </div>

          {/* fila: CARRITO Y PRODUCTOS */}
          <div className="flex flex-col lg:flex-row gap-3 items-start mb-8">
            <div className="w-full lg:w-3/4">
              {cargando ? (
                <p className="p-8">Cargando productos...</p>
              ) : isError ? (
                <p className="p-8 text-red-500">Error: {error.message}</p>
              ) : productosBuscados.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-lg font-medium">
                    {" "}
                    No se encontraron productos
                  </p>
                  <p className="text-sm">
                    {" "}
                    Intenta con otra búsqueda o categoría{" "}
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {productosBuscados.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      inStock={product.stock > 0}
                      onAddCart={(product) =>
                        agregar.mutate({
                          productoId: product.id,
                          cantidad: 1,
                          seleccionado: true,
                        })
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/4 lg:sticky lg:top-4">
              <MiniCarrito
                carrito={carritoConProductos}
                quitItem={(item)=>{
                  if (item.cantidad===1){
                    eliminar.mutate(item.id)
                  }else{
                    actualizar.mutate({
                      id:item.id,
                      cambios:{cantidad:item.cantidad-1},
                    })
                  }}
                }
                clearCart={()=>{
                  carrito.forEach((item)=>eliminar.mutate(item.id))
                }}
                addItem={(item)=>
                  actualizar.mutate({
                  id:item.id,
                  cambios :{cantidad: item.cantidad+1} 
                })}
                toggleSeleccion={(item)=>
                  actualizar.mutate({
                    id: item.id,
                    cambios:{seleccionado:!item.seleccionado},
                  })
                }
                totalSeleccionado={totalSeleccionado}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
