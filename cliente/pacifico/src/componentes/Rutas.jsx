import Estructura from "../paginas/Estructura";
import Inicio from "../paginas/inicio";
import Acerca from "../paginas/acerca";
import Registro from "../paginas/registro";
import Entrada from "../paginas/Entrada";
import Prueba from "../paginas/prueba";
import { createBrowserRouter } from "react-router-dom";
export const Rutas = createBrowserRouter([
  {
    path: "/",
    element: <Estructura />,
    children: [
      { path: "/inicio", element: <Inicio /> },
      { path: "/acerca", element: <Acerca /> },
      { path: "/entrada", element: <Entrada />},
      { path: "/registro", element: <Registro /> },
      { path: "/prueba", element: <Prueba /> },
    ],
  },
]);

