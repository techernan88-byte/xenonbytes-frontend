import { Routes, Route } from "react-router-dom";
import { ProductosRouter } from "./routers/ProductosRouter";
import { CarritoRouter } from "./routers/CarritoRouter";
import { Layout } from "./routers/Layout";
import { LoginForm } from "./features/auth/components/LoginForm";
import { RutaProtegida } from "./features/auth/components/RutaProtegida";
import { Perfil } from "./features/auth/components/Perfil";
import { RegisterForm } from "./features/auth/components/RegisterForm";
import { CatalogadorForm } from "./features/catalogador/components/CatalogadorForm";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/productos"
          element={
            <RutaProtegida>
              <ProductosRouter />{" "}
            </RutaProtegida>
          }
        ></Route>
        <Route
          path="/carrito"
          element={
            <RutaProtegida>
              <CarritoRouter />
            </RutaProtegida>
          }
        ></Route>
        <Route path="/" element={<LoginForm />}></Route>
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        ></Route>
        <Route path="/registro" element={<RegisterForm />}></Route>
        <Route path="/catalogador" element={<CatalogadorForm />}></Route>
      </Route>

      
    </Routes>
  );
}

export default App;
