import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main/Main";
import Shop from "./component/Shop/Shop";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import Shipping from "./component/Shipping/Shipping";
import PrivateRoute from "./component/Routes/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: () =>
            fetch("https://ema-john-server-eosin.vercel.app/products"),
          element: <Shop></Shop>,
        },
        {
          path: "/shipping",
          element: (
            <PrivateRoute>
              <Shipping></Shipping>
            </PrivateRoute>
          ),
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signup",
          element: <Signup></Signup>,
        }
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
