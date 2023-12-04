/* 
  This hook is used to fetch a single product from the API
  It uses react-query to cache the data and avoid unnecessary calls
  It is used in the ProductPage component
*/

import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

const fetchProduct = async (productId: number): Promise<Product> => {
  return fetch(`${API_URL}/products/${productId}`).then((res) => res.json());
};

const useGetProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });
};

export { useGetProduct };
