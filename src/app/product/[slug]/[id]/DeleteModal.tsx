"use client";

import React from "react";
import { Modal } from "@/app/(components)/Modal";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Product } from "@/types/product";

type DeleteModalProps = {
  openDeleteModal: boolean;
  setDeleteEditModal: (value: boolean) => void;
  productData: Product;
  deleteProductHandler: () => void;
};

/*
 * Delete modal component
 * This component is used to display the delete modal
 * @param {boolean} openDeleteModal - The state of the delete modal
 * @param {function} setDeleteEditModal - The function to set the state of the delete modal
 * @param {Product} productData - The product object
 * @param {function} deleteProductHandler - The function to delete the product
 * @returns {JSX.Element} - The delete modal component
 */

export default function DeleteModal({
  openDeleteModal,
  setDeleteEditModal,
  productData,
  deleteProductHandler,
}: DeleteModalProps) {
  return (
    <Modal isOpen={openDeleteModal} setOpenModal={setDeleteEditModal}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Product
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete {productData.title}?
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={deleteProductHandler}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setDeleteEditModal(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
