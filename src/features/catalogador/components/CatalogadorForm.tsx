import {useState} from "react";
import { useExtraerProducto } from "../hooks/useExtraerProducto";
import { useRegistrarProducto } from "../hooks/useRegistrarProducto";

export const CatalogadorForm = ()=>{

    const [textCrudo,setTextoCrudo]= useState("");

    const [titulo, setTitulo]= useState("");
    const [precioMercado, setPrecioMercado] = useState<number|null>(null); 
    const [precioVenta, setPrecioVenta]=useState("");
    const [categoria,setCategoria]= useState ("");
    const [descripcion, setDescripcion]= useState ("");
    const [errorDatos, setErrorDatos]= useState<string|null>(null);

    const [hayBorrador, setHayBorrador]=useState(false);
    const extraer= useExtraerProducto();
    const registrarProducto=useRegistrarProducto();

    const onExtraer = ()=>{

        if(!textCrudo.trim()){
            return;
        };
       // console.log(textCrudo);
        extraer.mutate(textCrudo,{
            onSuccess:(data)=>{
                setTitulo(data.titulo);
                setPrecioMercado(data.precio_mercado);
                setCategoria(data.categoria);
                setDescripcion(data.descripcion);
                setPrecioVenta("");
                setHayBorrador(true);
            },
        });

    };
   /// PENDIENTE PARA BASE DE DATOS
    const onRegistrar = ()=>{
     
      setErrorDatos(null);

       const precioNum = Number(precioVenta);  
       if (!precioVenta || precioNum <= 0) {
       setErrorDatos("El número esta vacio o es negativo");
     
       return;
    }
      registrarProducto.mutate({
        titulo:titulo, 
        precio: precioNum, 
        categoria:categoria, 
        descripcion:descripcion},{
        onSuccess:()=>{
          //limpiar campos
          setTextoCrudo("");
          setTitulo("");
          setPrecioMercado(null);
          setPrecioVenta("");
          setCategoria("");
          setDescripcion("");
          setHayBorrador(false);
        },
      },
    );
  };


    return( 
    
    <div className="w-full max-w-5xl mx-auto p-6 flex flex-col gap-4">
        <h1 className=" max-w-2xl text-2xl font-bold text-oscuro">Catalogador de productos</h1>

      
      <label className="text-lg font-medium texto-oscuro">
        Pega el Texto crudo del producto
      </label>
      <textarea
        value={textCrudo}
        onChange={(e)=>setTextoCrudo(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full"

      />

      <button 
        onClick={onExtraer}
        disabled={extraer.isPending || !textCrudo.trim()}
        className="bg-marca text-white px-4 py-2 rounded hover:bg-marca-claro  cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-start"
      
      >
       {extraer.isPending ?"Extrayendo":"Extraer Información a Campos"}
      </button>

      {extraer.isError &&(
        <p>Error al extraer. Revisa el texto o el servidor.</p>
      )
      }  

     
      {hayBorrador &&(
        
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 mt-2">
            <label className="text-sm font-medium text-oscuro">
             Titulo          
            </label>
            <input 
             type="text"
             value={titulo}
             onChange={(e)=>setTitulo(e.target.value)}
             className="border border-gray-300 rounded px-3 py-2 w-full"
            />

         <p className="text-sm text-orange-800 font-medium">
            Precio Referencia en Mercado : {" "}
            {precioMercado?.toLocaleString("es-MX",{
                style: "currency",
                currency:"MXN"
            })}
            </p>   

            <label className="text-sm font-medium text-oscuro">
                Tu precio de Venta
            </label>
            <input
              type="number"
              value={precioVenta}
              onChange={(e)=> setPrecioVenta(e.target.value)}
              placeholder="Escribe el precio"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <label className="text-sm font-medium text-oscuro">
                Categoría
            </label>
            <input
              type="text"
              value={categoria}
              onChange={(e)=> setCategoria(e.target.value)}
              placeholder="Escribe el precio"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
             <label className="text-sm font-medium text-oscuro">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />

          <button 
          onClick={onRegistrar}
          disabled={registrarProducto.isPending}
          className="bg-oscuro text-white px-4 py-2 rounded hover:bg-marca cursor-pointer transition-colors self-start disabled:opacity-50 disabled:cursor-not-allowed">
            { registrarProducto.isPending?"Registrando": "Registrar producto"}
          </button>
            {errorDatos && <p className="text-sm text-orange-800 font-medium">{errorDatos}</p>}


        </div>
    )}

    </div>
        
    );
       

    
};