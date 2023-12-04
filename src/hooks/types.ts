import { Product } from "@/types/product";

export type RequestAPI = {
  productId: number;
  body?: Product;
};
