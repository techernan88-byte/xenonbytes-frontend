import { Routes,Route } from "react-router-dom";
import {ProductosRouter} from "./routers/ProductosRouter";
import {CarritoRouter} from "./routers/CarritoRouter";
import { Layout } from "./routers/Layout";

function App(){
    return (
        <Routes>
           <Route element={<Layout/>}>
           <Route path="/" element={<ProductosRouter/>}></Route>
           <Route path="/carrito" element={<CarritoRouter/>}></Route>
           </Route>
        </Routes>
    );
}

export default App;