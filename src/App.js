import "./App.css";
// commerce api link
import { commerce } from "./Lib/Commerce";
// component link
import { Products, Navbar, Carts } from "./Component";
import { useEffect, useState } from "react";
import useGetApiHook from "./Api/useGetApiHook";
import useCart from "./Api/useCart";
import { Route, Routes } from "react-router-dom";
import CheckOut from "./Component/CheckOut/CheckOut";
import Loading from "./Component/Loading";

const url = commerce.products.list();
function App() {
  const { data, loading } = useGetApiHook(url);
  // const { Cart } = useCart();
  const [cart, setCart] = useState("");
  const [order, setOrder] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(false);

  // add to card
  const AddToCardHandler = async (productId, quantity) => {
    setLoadingMessage(true);
    const item = await commerce.cart.add(productId, quantity);
    try {
      setCart(item.cart);
      setLoadingMessage(false);
    } catch (e) {
      setLoadingMessage(false);
    }
  };

  // update cart quantity
  const updateCartQuantity = async (productId, quantity) => {
    setLoadingMessage(true);
    const item = await commerce.cart.update(productId, { quantity });
    try {
      setCart(item.cart);
      setLoadingMessage(false);
    } catch (e) {
      setLoadingMessage(false);
    }
  };
  // handle remove from cart
  const RemoveitemFromCart = async productId => {
    setLoadingMessage(true);
    const item = await commerce.cart.remove(productId);
    try {
      setCart(item.cart);
      setLoadingMessage(false);
    } catch (e) {
      setLoadingMessage(false);
    }
  };
  //  empty  cart
  const EmptyCarthandler = async () => {
    setLoadingMessage(true);
    const item = await commerce.cart.empty();
    try {
      setCart(item.cart);
      setLoadingMessage(false);
    } catch (e) {
      setLoadingMessage(false);
    }
  };

  // capture checkout
  const handleCaptureCheckOut = async checkOutTokenId => {
    try {
      // const inComingorder = await commerce.checkout.capture(
      //   checkOutTokenId,
      //   newOrder
      // );
      // setOrder(inComingorder);
      refreshCart();
    } catch (error) {
      setErrorMsg(error.data.error.message);
    }
  };

  // refresh cart
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const Cart = async () => {
    const response = await commerce.cart.retrieve();
    try {
      setCart(response);
    } catch (e) {
      console.log("error");
    }
  };

  // effect
  useEffect(() => {
    Cart();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <Navbar />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar total_item={cart?.total_items} />
      <Routes>
        <Route
          path="/"
          exact
          element={<Products products={data} onAddToCart={AddToCardHandler} />}
        />
        <Route
          path="/cart"
          exact
          element={
            <Carts
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              RemoveitemFromCart={RemoveitemFromCart}
              EmptyCarthandler={EmptyCarthandler}
            />
          }
        />
        <Route
          path="/check-out"
          exact
          element={
            <CheckOut
              cart={cart}
              order={order}
              handleCaptureCheckOut={handleCaptureCheckOut}
              errorMsg={errorMsg}
            />
          }
        />
      </Routes>
      {loadingMessage && <Loading />}
    </div>
  );
}

export default App;
