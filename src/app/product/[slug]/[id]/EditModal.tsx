"use client";

import { Modal } from "@/app/(components)/Modal";
import { Product } from "@/types/product";
import React from "react";

type EditModalProps = {
  openEditModal: boolean;
  setOpenEditModal: (value: boolean) => void;
  setEditData: React.Dispatch<React.SetStateAction<Product>>;
  editData: Product;
  updateProductHandler: () => void;
};

/*
 * Edit modal component
 * This component is used to display the edit modal
 * @param {boolean} openEditModal - The state of the edit modal
 * @param {function} setOpenEditModal - The function to set the state of the edit modal
 * @param {Product} editData - The product object
 * @param {function} setEditData - The function to set the product object
 * @param {function} updateProductHandler - The function to update the product
 * @returns {JSX.Element} - The edit modal component
 */

export default function EditModal({
  openEditModal,
  setOpenEditModal,
  setEditData,
  editData,
  updateProductHandler,
}: EditModalProps) {
  return (
    <Modal isOpen={openEditModal} setOpenModal={setOpenEditModal}>
      <div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <input
              onChange={(event) => {
                setEditData((prev) => ({
                  ...prev,
                  title: event.target.value,
                }));
              }}
              type="title"
              value={editData?.title}
              name="title"
              id="title"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter title"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <input
              onChange={(event) => {
                setEditData((prev) => ({
                  ...prev,
                  description: event.target.value,
                }));
              }}
              value={editData?.description}
              type="description"
              name="description"
              id="description"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter description"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Price
          </label>
          <div className="mt-2">
            <input
              onChange={(event) => {
                setEditData((prev) => ({
                  ...prev,
                  price: Number(event.target.value),
                }));
              }}
              type="number"
              value={editData?.price}
              name="price"
              id="price"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Stock
          </label>
          <div className="mt-2">
            <input
              onChange={(event) => {
                setEditData((prev) => ({
                  ...prev,
                  stock: Number(event.target.value),
                }));
              }}
              type="number"
              value={editData?.stock}
              name="stock"
              id="stock"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={updateProductHandler}
        >
          Update
        </button>
      </div>
    </Modal>
  );
}
