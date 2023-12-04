"use client";

import React from "react";
import { useGetProducts } from "@/hooks";
import { Loader, ProductCard } from "./(components)";
import { ProductContext } from "@/context/ProductProvider";
import { useContext, useEffect } from "react";

/*
 * Home page component
 * This component is used to display the home page
 * @returns {JSX.Element} - The home page component
 */

export default function Home() {
  const { data, isSuccess, isLoading } = useGetProducts();
  const { setProducts, products } = useContext(ProductContext);

  /*
   * Update the products array when the data is fetched
   * This is done to avoid unnecessary re-renders
   */
  useEffect(() => {
    if (products.length === 0 && data) {
      setProducts(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // Show a loader while fetching the data
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-7xl min-w-full overflow-hidden flex justify-center items-center sm:px-6 lg:px-8 bg-white rounded-xl my-8">
      <h2 className="sr-only">Products</h2>
      {!isLoading && (
        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {(products || []).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
