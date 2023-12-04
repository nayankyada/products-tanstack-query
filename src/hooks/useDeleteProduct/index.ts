/* 
  This hook is used to delete a product
  It uses react-query mutation to handle the request
  It returns the mutation function and the state of the request
*/

import { useMutation } from "@tanstack/react-query";
import { RequestAPI } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

const deleteProduct = async (data: RequestAPI) => {
  return fetch(`${API_URL}/products/${data.productId}`, {
    method: "DELETE",
  });
};

const useDeleteProduct = ({
  onSuccess,
}: {
  onSuccess: (res: Response) => Promise<unknown> | unknown;
}) => {
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess,
  });
};

export { useDeleteProduct };
