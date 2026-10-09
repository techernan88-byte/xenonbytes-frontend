import { Routes, Route } from "react-router-dom";
import { ProductosRouter } from "./routers/ProductosRouter";
import { CarritoRouter } from "./routers/CarritoRouter";
import { Layout } from "./routers/Layout";
import { LoginForm } from "./features/auth/components/LoginForm";
import { RutaProtegida } from "./features/auth/components/RutaProtegida";
import { Perfil } from "./features/auth/components/Perfil";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductosRouter />}></Route>
        <Route path="/carrito"
          element={
            <RutaProtegida>
              <CarritoRouter />
            </RutaProtegida>
          }
        ></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Route>
      <Route path="/perfil"
        element={
          <RutaProtegida>
            <Perfil />
          </RutaProtegida>
        }
      />
    </Routes>
  );
}

export default App;
