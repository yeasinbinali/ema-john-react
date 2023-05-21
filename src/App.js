import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main/Main";
import Shop from "./component/Shop/Shop";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import SingleProductOverview from "./component/SingleProductOverview/SingleProductOverview";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: async () =>
            fetch("https://ema-john-server-eosin.vercel.app/products"),
          element: <Shop></Shop>,
        },
        {
          path: "/product/:id",
          element: <SingleProductOverview></SingleProductOverview>,
          loader: async ({ params }) => {
            return fetch(
              `https://ema-john-server-eosin.vercel.app/products/${params.id}`
            );
          },
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signup",
          element: <Signup></Signup>,
        },
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
