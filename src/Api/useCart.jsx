import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { commerce } from "../Lib/Commerce";

const useCart = () => {
  const [data, setData] = useState(null);

  const cart = async () => {
    const response = await commerce.cart.retrieve();
    try {
      setData(response);
    } catch (e) {
      console.log("error");
    }
  };

  useEffect(() => {
    cart();
  }, []);
  return { Cart: data };
};

export default useCart;
