"use client";

import React, { useEffect, useState } from "react";
import { Product, ProductContextType } from "@/types/product";
import { createContext } from "react";
import { useGetProducts } from "@/hooks";

/*
 * Created a context to store the products and the search query
 * The search query is used to filter the products
 * The products array is used to update and delete the products
 * The filtered products array is used to display the products
 * The search query is debounced to avoid unnecessary re-renders
 * The products are filtered based on the debounced search query
 * The loading state is used to show a loader while fetching the data
 */

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  isLoading: false,
});

function ProductProvider({ children }: React.PropsWithChildren<{}>) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { data, isSuccess, isLoading } = useGetProducts();

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    if (products.length > 0) {
      setProducts(products);
      return;
    }

    if (products.length === 0 && data) {
      setProducts(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  /*
   * Update the product in the products array
   */
  const updateProduct = (product: Product) => {
    const findProductIndex = products.findIndex(
      (p: Product) => p.id === product.id
    );
    if (findProductIndex !== -1) {
      const newProducts: Product[] = [...products];
      newProducts[findProductIndex] = product;
      setProducts(newProducts);
    }
  };

  /*
   * Delete the product from the products array
   */
  const deleteProduct = (productId: number) => {
    const newProducts = products.filter((p: Product) => p.id !== productId);
    setProducts(newProducts);
  };

  /*
   * Debounce the search query to avoid unnecessary re-renders
   */
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchQuery]);

  /*
   * Filter the products based on the search query
   */
  useEffect(() => {
    if (debouncedSearchQuery === "") {
      setFilteredProducts(products);
    } else {
      const filteredProducts = products.filter((product: Product) =>
        product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
      setFilteredProducts(filteredProducts);
    }
  }, [products, debouncedSearchQuery]);

  const contextProps = {
    products: filteredProducts,
    setProducts,
    updateProduct,
    deleteProduct,
    searchQuery,
    setSearchQuery,
    isLoading,
  };

  return (
    <ProductContext.Provider value={contextProps}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
