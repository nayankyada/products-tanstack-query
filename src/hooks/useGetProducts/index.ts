/* 
  This hook is used to fetch products from the API.
  It is used in the ProductProvider to fetch products on first load.
  It is also used in the ProductList component to fetch products when the user clicks on listing page.
*/

import { ProductContext } from "@/context/ProductProvider";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

const fetchProducts = async (): Promise<Product[]> => {
  return fetch(`${API_URL}/products`)
    .then((res) => res.json())
    .then((res) => res.products);
};

const useGetProducts = () => {
  const { products } = useContext(ProductContext);
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    enabled: products.length === 0,
  });
};

export { useGetProducts };