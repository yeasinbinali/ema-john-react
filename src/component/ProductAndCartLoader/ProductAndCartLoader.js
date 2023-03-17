import { addCartFromLocalStorage } from "../Utilities/fakeDB";

export const ProductAndCartLoader = async () => {
  // get products
  const productsData = await fetch(
    "https://ema-john-server-eosin.vercel.app/products"
  );
  const { products } = await productsData.json();

  // getCart
  const savedCart = addCartFromLocalStorage();
  const orderedCart = [];
  for (const id in savedCart) {
    const addedProduct = products.find((product) => product._id === id);
    const quantity = savedCart[id];
    addedProduct.quantity = quantity;
    orderedCart.push(addedProduct);
    console.log(id, quantity);
  }

  return { products, orderedCart };
};
