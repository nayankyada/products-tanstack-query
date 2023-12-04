/* 
  This hook is used to update a product
  It uses react-query mutation to handle the request
  It returns the mutation function and the state of the request
*/

import { useMutation } from "@tanstack/react-query";
import { RequestAPI } from "../types";
import { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

const updateProduct = async (data: RequestAPI) => {
  const derividedBody = { ...data.body } || {};
  delete derividedBody.id;
  return fetch(`${API_URL}/products/${data.productId}`, {
    method: "PUT",
    body: JSON.stringify(derividedBody),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

const useUpdateProduct = ({
  onSuccess,
}: {
  onSuccess: (res: Product) => Promise<unknown> | unknown;
}) => {
  return useMutation({
    mutationFn: updateProduct,
    onSuccess,
  });
};

export { useUpdateProduct };
