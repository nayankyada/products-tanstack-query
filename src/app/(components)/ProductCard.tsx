"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { kebabCase } from "lodash";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { calculateDiscountedPrice } from "@/utils";
import { StarIcon } from "@heroicons/react/20/solid";

type ProductCardProps = {
  product: Product;
};

/*
 * Product card component
 * This component is used to display the product card
 * on the home page
 * @param {Product} product - The product object
 * @returns {JSX.Element} - The product card component
 */
export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  /*
   * Handle hover event to change the image
   */
  const handleHover = (images: Product["images"]) => {
    if (!intervalId) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex: number) => (prevIndex + 1) % images?.length ?? 1
        );
      }, 1000);
      setIntervalId(interval);
    }
  };

  /*
   * Handle mouse leave event to reset the image
   */
  const handleLeaveHover = () => {
    clearInterval(intervalId);
    setIntervalId(undefined);
    setCurrentImageIndex(0);
  };

  return (
    <div className="group relative border-b border-r border-gray-200 p-4 sm:p-6 min-h-[430px] h-[430px]">
      <div className="overflow-hidden rounded-lg group-hover:opacity-75">
        <Link
          href={`/product/${kebabCase(product.title)}/${product.id}`}
          passHref
          legacyBehavior
          lang="en"
        >
          <Image
            src={product?.images[currentImageIndex] ?? ""}
            alt={product.title}
            title={product.title}
            className="mx-auto cursor-pointer object-cover object-center h-[250px] w-[250px]"
            width={200}
            height={350}
            priority
            onMouseEnter={() => handleHover(product?.images)}
            onMouseLeave={handleLeaveHover}
          />
        </Link>
      </div>
      <div className="py-4 text-center">
        <h3 className="text-sm font-medium text-gray-900 cursor-pointer">
          <Link
            href={`/product/${kebabCase(product.title)}/${product.id}`}
            passHref
            legacyBehavior
            lang="en"
          >
            {product.title}
          </Link>
        </h3>
        <div className="mt-3 flex flex-col items-center">
          <p className="sr-only">{product.rating} out of 5 stars</p>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={clsx(
                  product.rating > rating ? "text-yellow-400" : "text-gray-200",
                  "h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">({product.rating})</p>
        </div>
        <div className="mt-4 flex flex-row items-center justify-center">
          <p className="text-base font-medium text-gray-900">
            $
            {calculateDiscountedPrice(
              product?.price || 100,
              product?.discountPercentage || 10
            )}
          </p>
          <p className="text-sm text-gray-500 line-through ml-2">
            ${product?.price.toFixed(2) || 100}
          </p>
        </div>
      </div>
    </div>
  );
}
