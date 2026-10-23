import { Link } from "react-router-dom";
import { useCarritoQuery } from "../features/cart/hooks/useCarritoQuery";
import { calcularPrecioFinal } from "../features/products/utils/pricing";
import { useActualizarItem } from "../features/cart/hooks/useActualizarItem";
import { useEliminarItem } from "../features/cart/hooks/useEliminarItem";
import { type CarritoConProducto } from "../../src/types/carritoConProducto";

export function CarritoRouter() {
  const { data: carrito = [] } = useCarritoQuery();

  // Se filtra  por si algún item viniera sin producto.
  const carritoConProductos = carrito.filter(
    (item):item is CarritoConProducto =>item.producto !==undefined,
  );


  //Actualizar en el carrito
  const actualizar = useActualizarItem();
  // Eliminar del carrito
  const eliminar = useEliminarItem();


  const totalSeleccionado = carritoConProductos.
  filter(item=> item.seleccionado).
  reduce((sum, item)=> sum+calcularPrecioFinal(item.producto) ,0);

 

  // carrito vacio
  if (carrito.length === 0) {
    return (
      <div className="min-h-screen bg-fondo p-8 pt-24">
        <h1 className="text-2xl font-bold text-oscuro mb-4">Tu Carrito</h1>
        <p className="text-gray-500 mb-6">Tu carrito está vacío</p>
        <Link to="/" className="text-marca hover:underline">
          ← Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fondo p-8 pt-24 max-w-3xl mx-auto">
      <h1 className="text-2x1 font-bold text-oscuro mb-6">Tu carrito</h1>
      <div className="flex flex-col gap-3">
        {carritoConProductos.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
          >
            {/* Checkbox de selección */}

            <input
              type="checkbox"
              checked={item.seleccionado}
              onChange={() =>
                actualizar.mutate({
                  id: item.id,
                  cambios: { seleccionado: !item.seleccionado },
                })
              }
              className="w-5 h-5 cursor-pointer shrink-0"
            />
            {/* Info del producto */}
            <div className="min-w-0 flex-1">
              <p className="font-medium text-oscuro truncate">
                {item.producto.titulo}
              </p>
              <p className="text-sm text-gray-500">{item.producto.categoria}</p>
              <p className="text-sm text-gray-700">
                {calcularPrecioFinal(item.producto).toLocaleString("es-MX", {
                  style: "currency",
                  currency: "MXN",
                })}{" "}
                c/u
              </p>
            </div>
            {/* Controles de cantidad */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  if (item.cantidad === 1) {
                    eliminar.mutate(item.id);
                  } else {
                    actualizar.mutate({
                      id: item.id,
                      cambios: { cantidad: item.cantidad - 1 },
                    });
                  }
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-marca text-white hover:bg-marca-claro cursor-pointer transition-colors"
              >
                {item.cantidad === 1 ? "🗑️" : "−"}
              </button>
              <span className="w-6 text-center">{item.cantidad}</span>
              <button
                onClick={() =>
                  actualizar.mutate({
                    id: item.id,
                    cambios: { cantidad: item.cantidad + 1 },
                  })
                }
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-marca text-white hover:bg-marca-claro cursor-pointer transition-colors"
              >
                +
              </button>
            </div>
            <div className="w-24 text-right shrink-0 font-medium text-oscuro">
              {(
                calcularPrecioFinal(item.producto) * item.cantidad
              ).toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Resumen */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
        <Link to="/" className="text-marca hover:underline">
          ← Seguir comprando
        </Link>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total seleccionado</p>
            <p className="text-2xl font-bold text-oscuro">
              {totalSeleccionado.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </p>
          </div>
          <button
            disabled={totalSeleccionado === 0}
            className="bg-marca text-white px-6 py-3 rounded-lg font-medium hover:bg-marca-claro cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
