import { useState } from "react";
import { MiniCarrito } from "../features/cart";
import { ProductCard } from "../features/products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { obtenerProductos } from "../features/products/services/productService";
import { useCarritoQuery } from "../features/cart/hooks/useCarritoQuery";
import { useAgregarItem } from "../features/cart/hooks/useAgregarItem";
import { useActualizarItem } from "../features/cart/hooks/useActualizarItem";
import { useEliminarItem } from "../features/cart/hooks/useEliminarItem";
import { type CarritoConProducto } from "../types/carritoConProducto";
import { calcularPrecioFinal } from "../features/products/utils/pricing";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/authcontext";
import { Paginacion } from "../features/products/components/Paginacion";
import { useCategorias } from "../features/categoria/hooks/useCategorias";
import { useDebounce } from "../hooks/useDebounce";

export function ProductosRouter() {
  
  const [pagina, setPagina] =useState(1);
  
  

    //categorias  
  const {data:categoriaData=[]} = useCategorias();
  const categorias =["Todo",...categoriaData.map((c)=>c.nombre)];
  const [estadoCategoria, setCategoria] = useState("Todo");

  //Filtro
  const [busqueda, setBusqueda] = useState("");
  const busquedaDebounced= useDebounce(busqueda,300);
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  //obtener datos de PRODUCTOS
  const {
    data: data,
    isPending: cargando,
    isError,
    error,
  } = useQuery({
    queryKey: ["productos", pagina, estadoCategoria, busquedaDebounced, soloDisponibles],
    queryFn: ()=>obtenerProductos(
      pagina, 
      estadoCategoria==="Todo"?undefined:estadoCategoria,
      busquedaDebounced|| undefined,
      soloDisponibles,
    ),
    placeholderData: keepPreviousData,
  });

  // El backend devuelve { Productos, total, page, totalPaginas }
  // si el dato existe trae el dato si no dejalo en []
  const productos = data?.productos ?? [];
  const totalPaginas = data?.totalPaginas?? 1;
  console.log(productos);
  // console.log(data?.page);
   console.log(data?.totalPaginas);
  //carrito
  const { data: carrito = [] } = useCarritoQuery();
  //console.log("Carrito del servidor:", carrito);

  // Agregar  al Carrito
  const agregar = useAgregarItem();

  //Actualizar en el carrito
  const actualizar = useActualizarItem();

  // Eliminar del carrito
  const eliminar = useEliminarItem();

  const navigate = useNavigate();
  const { token } = useAuth();

  //Encontrar datos productos en carrito
  const carritoConProductos = carrito
    .map((item) => {
      const producto = productos.find((p) => p.id === item.productoId);
      return { ...item, producto };
    })
    .filter((item): item is CarritoConProducto => item.producto !== undefined);

  const totalSeleccionado = carritoConProductos
    .filter((item) => item.seleccionado)
    .reduce(
      (sum, item) => sum + calcularPrecioFinal(item.producto) * item.cantidad,
      0,
    );

  //sidebar
  const [sideBarAbierto, setSidebarAbierto] = useState(false);
  const cambioSidebar = () => setSidebarAbierto((prev) => !prev);



  const elegirCategoria = (nombre:string)=>{
    setCategoria(nombre);
    setPagina(1);
  };


  // busqueda
  


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
                onClick={() => elegirCategoria(categoria)}
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
              onChange={(e) => {setBusqueda(e.target.value);
                                setPagina(1);
              }}
              className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
            />
            <input
              type="checkbox"
              id="disponibles"
              checked={soloDisponibles}
              onChange={(e) => {setSoloDisponibles(e.target.checked);
                                setPagina(1);}}
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
              ) : productos.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-lg font-medium">
                    {" "}
                    No se encontraron productos{" "}
                  </p>
                  <p className="text-sm">
                    {" "}
                    Intenta con otra búsqueda o categoría{" "}
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {productos.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      inStock={product.stock > 0}
                      onAddCart={(product) => {
                        if (!token) {
                          navigate("/");
                          return;
                        }
                        const itemExistente = carrito.find(
                          (item) => item.productoId === product.id,
                        );

                        if (itemExistente) {
                          actualizar.mutate({
                            id: itemExistente.id,
                            cambios: { cantidad: itemExistente.cantidad + 1 },
                          });
                        } else {
                          agregar.mutate({
                            productoId: product.id,
                            cantidad: 1,
                            seleccionado: true,
                          });
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

    


            <div className="w-full lg:w-1/4 lg:sticky lg:top-4">
              <MiniCarrito
                carrito={carritoConProductos}
                quitItem={(item) => {
                  if (item.cantidad === 1) {
                    eliminar.mutate(item.id);
                  } else {
                    actualizar.mutate({
                      id: item.id,
                      cambios: { cantidad: item.cantidad - 1 },
                    });
                  }
                }}
                clearCart={() => {
                  carrito.forEach((item) => eliminar.mutate(item.id));
                }}
                addItem={(item) =>
                  actualizar.mutate({
                    id: item.id,
                    cambios: { cantidad: item.cantidad + 1 },
                  })
                }
                toggleSeleccion={(item) =>
                  actualizar.mutate({
                    id: item.id,
                    cambios: { seleccionado: !item.seleccionado },
                  })
                }
                totalSeleccionado={totalSeleccionado}
              />
            </div>
          </div>
            <Paginacion
            pagina={pagina}
            totalPaginas={totalPaginas}
            onCambiar={setPagina}
          />
        </main>
      </div>
    </>
  );
}
