import {calcularPrecioFinal} from '../utils/pricing';
import {type propsProduct } from '../../../types/product';




export const ProductCard = ({product,descuento,onAddCart,inStock}: propsProduct) =>{
     
     const precioFinal= calcularPrecioFinal(product,descuento);

    return (
      
            <div className="p-4 border rounded h-full flex flex-col shadow-md">
            <h3 className="text-lg font-semibold">{product.titulo}</h3> 
            <p>Precio:{precioFinal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
            <p className='text-xs'>Cantidad:{product.stock}</p>
            <p className='text-xs'>Categoria:{product.categoria}</p>
            {inStock?(
               <div className="">
               <button onClick={()=>onAddCart(product)} className="bg-marca text-white px-4 py-2 rounded hover:bg-marca-claro cursor-pointer transition-colors">Agregar</button>
               
               </div>
            ):(
               <p className="text-red-500 font-medium">Agotado</p>
            )}
           {descuento!==0 && (<p className="text font-medium"> con descuento del {descuento}%</p>)}
            
            </div>);
};




 