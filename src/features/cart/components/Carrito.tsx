import { type CarritoProps } from "../../../types/carrito";

export const Carrito = ({
  carrito,
  total,
  quitCart,
  clearCart,
}: CarritoProps) => {
  return (
    <div className="p-4 border rounded">
      <p className="text-lg font-bold text-oscuro mb-1">Carrito</p>
      <p className="text-sm text-gray-500 mb-4">Productos: {carrito.length}</p>
      <div className="flex flex-col gap-3">
        {carrito.map((item) => (
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div
              key={item.producto.id}
              className="flex items-center justify-between gap-2 pb-3 border-b border-gray-100 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-oscuro truncate">
                  {item.producto.titulo}
                </p>
                <p className="text-xs text-gray-500">
                  Cantidad: {item.cantidad}
                </p>
              </div>
          
              <button
                onClick={() => quitCart(item.producto.id)}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-marca text-white text-sm hover:bg-marca-claro cursor-pointer transition-colors"
              >
                {" "}
                {item.cantidad === 1 ? "🗑️" : "(-)"}
              </button>
            </div>
          </div>
        ))}
      </div>
       <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Total</span>
        <span className="text-lg font-bold text-black">
          {total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
        </span>
      </div>
      {/* <pre>{JSON.stringify(carrito, null, 2)}</pre> --> */}
      <button
        onClick={clearCart}
        className="bg-zinc-500 text-white px-4 py-2 rounded hover:bg-taupe-900 cursor-pointer transition-colors">
        Vaciar carrito
      </button>
    </div>
  );
};
