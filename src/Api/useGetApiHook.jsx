import { useEffect, useState } from "react";

const useGetApiHook = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const response = await url;
    try {
      setData(response.data);
    } catch (e) {
      console.log("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [url]);
  return { data, loading };
};

export default useGetApiHook;
