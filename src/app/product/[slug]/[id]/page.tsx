"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { calculateDiscountedPrice } from "@/utils";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { ProductContext } from "@/context/ProductProvider";
import { Product } from "@/types/product";
import { INITIAL_PRODUCT } from "@/utils/config";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { Loader } from "@/app/(components)";

/*
 * Product view page component
 * This component is used to display the product view page
 * @returns {JSX.Element} - The product view page component
 */
function ProductViewPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);
  const [productData, setProductData] = useState<Product>({} as Product);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setDeleteEditModal] = useState(false);
  const [editData, setEditData] = useState<Product>(INITIAL_PRODUCT);
  const { updateProduct, products, deleteProduct, isLoading } =
    useContext(ProductContext);

  /**
   * Update the product when the mutation is successful
   */
  const { mutate: updateProductMutation } = useUpdateProduct({
    onSuccess: (res: Product) => {
      updateProduct(res);
      setProductData(res);
      setOpenEditModal(false);
    },
  });

  /*
   * Delete the product when the mutation is successful
   */
  const { mutate: deleteProductMutation } = useDeleteProduct({
    onSuccess: () => {
      deleteProduct(productId);
      router.push("/");
      setDeleteEditModal(false);
    },
  });

  /*
   * Get the product data from the products array
   */
  const getProductData = useCallback(() => {
    let product = products.find((p: Product) => p.id === productId);
    if (product) {
      setProductData(product);
    }
  }, [productId, products]);

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  /*
   * Update the editData state when the productData changes
   */
  useEffect(() => {
    setEditData(productData);
  }, [productData]);

  /*
   * Update the product data handler
   */
  const updateProductHandler = () => {
    if(editData?.price === 0) {
      alert("Price can't be 0 because API is not allowing to update price to 0");
      return;
    }
    if(editData?.stock === 0) {
      alert("Stock can't be 0 because API is not allowing to update stock to 0");
      return;
    }

    updateProductMutation({
      productId: Number(productId),
      body: editData,
    });
  };

  /*
   * Delete the product handler
   */
  const deleteProductHandler = () => {
    deleteProductMutation({
      productId: Number(productId),
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-white mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 my-8 rounded-xl">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group
            as="div"
            className="flex flex-col-reverse items-center justify-center"
          >
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {(productData?.images || []).map((image, idx) => (
                  <Tab
                    key={idx}
                    className="relative flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <Image
                            priority
                            src={image}
                            alt="product-gallery-images"
                            width={100}
                            height={100}
                            className="h-[100px] w-[100px] object-cover object-center"
                          />
                        </span>
                        <span
                          className={clsx(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels className="w-full">
              {(productData?.images || []).map((image, idx) => (
                <Tab.Panel key={idx}>
                  <Image
                    priority
                    src={image}
                    alt="product-image"
                    width={500}
                    height={500}
                    className="h-[500px] w-[500px] object-cover object-center sm:rounded-lg mx-auto"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <nav aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-2">
                <li key={productData?.category}>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium text-gray-900 capitalize">
                      {productData?.category}
                    </span>
                    <span className="text-gray-300">/</span>
                  </div>
                </li>
                <li className="text-sm" key={productData?.brand}>
                  <span
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {productData?.brand}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="mt-4">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {productData?.title}
              </h1>
            </div>

            <div className="mt-3 flex items-center justify-start gap-1">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">
                $
                {calculateDiscountedPrice(
                  productData?.price || 100,
                  productData?.discountPercentage || 10
                )}
              </p>
              <p className="text-base text-gray-500 line-through ml-3">
                ${productData?.price?.toFixed(2) || 100}
              </p>
              <p className="text-xs text-white bg-indigo-600 rounded-lg px-1">
                Save {productData?.discountPercentage || 10}%{" "}
              </p>
            </div>

            {/* ratings */}
            <div className="mt-3">
              <h3 className="sr-only">Ratings</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <p className="mr-1 text-sm text-gray-500">
                    {productData?.rating || 3}
                  </p>
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={clsx(
                        productData?.rating || 3 > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">
                  {productData?.rating || 3} out of 5 stars
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="sr-only">Description</h3>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">
                  {productData?.description}
                </p>
              </div>

              {productData?.stock || 0 > 1 ? (
                <div className="mt-6 flex items-center">
                  <CheckIcon
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-2 text-sm text-gray-500">
                    <span className="font-bold">{productData?.stock}</span> in
                    stock and ready to ship
                  </p>
                </div>
              ) : (
                <div className="mt-6 flex items-center">
                  <XMarkIcon
                    className="h-5 w-5 flex-shrink-0 text-red-500"
                    aria-hidden="true"
                  />
                  <p className="ml-2 text-sm text-gray-500">Out of stocks!</p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="mt-10 flex">
                <button
                  onClick={() => setOpenEditModal(true)}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Edit Product
                </button>

                <button
                  type="button"
                  title={`Delete ${productData?.title}`}
                  onClick={() => setDeleteEditModal(true)}
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <TrashIcon
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Delete {productData?.title}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openEditModal && (
        <EditModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          editData={editData}
          setEditData={setEditData}
          updateProductHandler={updateProductHandler}
        />
      )}

      {openDeleteModal && (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setDeleteEditModal={setDeleteEditModal}
          productData={productData}
          deleteProductHandler={deleteProductHandler}
        />
      )}
    </>
  );
}

export default ProductViewPage;
