"use client";

import { useState } from "react";
import { Product } from "@/common.types";
import Link from "next/link";
import Image from "next/image";

export default function Slider({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  const nextSlide = () => {
    const remainingProducts = products.length - currentIndex;
    const numProductsInNextGroup = Math.min(4, remainingProducts);

    setCurrentIndex((prevIndex) => prevIndex + numProductsInNextGroup);
  };

  const groupedProducts = [];

  for (let i = 0; i < products.length; i += 4) {
    groupedProducts.push(products.slice(i, i + 4));
  }

  return (
    <div className="max-w-[980px] w-full overflow-hidden relative">
      <div className="flex w-[calc(230px * 4)]">
        <div
          style={{
            transform: `translateX(-${currentIndex * (230 + 4 * 4)}px)`,
            transition: "transform 400ms",
          }}
          className="flex w-full h-full rounded-2xl relative"
        >
          {groupedProducts.map((group, groupIndex) => (
            <div className="flex" key={groupIndex}>
              {group.map((product, index) => (
                <Link
                  href={`/product/${product.name.replace(/\s+/g, "-")}`}
                  className="group flex flex-col min-w-[230px] w-full rounded-2xl bg-primary-gray cursor-pointer mx-2"
                  key={index}
                >
                  <div className="flex flex-contain rounded-2xl-t overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.sku}
                      width={230}
                      height={230}
                    />
                  </div>
                  <div className="flex flex-col p-4 gap-2 text-ellipsis overflow-hidden">
                    <div className="text-sm font-semibold line-clamp-2 group-hover:text-tertiary-blue">
                      {product.name}
                    </div>
                    <div>
                      {product.price.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </div>
                    <div className="text-sm text-primary-blue group-hover:text-secondary-blue transition-colors">
                      Ver producto
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Left Arrow */}
        {currentIndex > 0 && (
          <div className="flex justify-center items-center absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-[rgba(210,210,215,.64)] text-[rgba(0,0,0,.56)] cursor-pointer">
            <button onClick={prevSlide} className="w-8 h-8">
              <i className="fi fi-rr-angle-left flex justify-center items-center mr-1"></i>
            </button>
          </div>
        )}
        {/* Right Arrow */}
        {currentIndex + 4 < products.length && (
          <div className="flex justify-center items-center absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-[rgba(210,210,215,.64)] text-[rgba(0,0,0,.56)] cursor-pointer">
            <button onClick={nextSlide} className="w-8 h-8">
              <i className="fi fi-rr-angle-right flex justify-center items-center ml-1"></i>
            </button>
          </div>
        )}
      </div>

      <ul className="flex top-4 justify-center py-2">
        {groupedProducts.map((group, groupIndex) => (
          <li key={groupIndex}>
            <button
              onClick={() => setCurrentIndex(groupIndex * 4)}
              className={`cursor-pointer rounded-full w-2 h-2 mx-2 transition-colors duration-100 ease-linear ${
                groupIndex * 4 === currentIndex
                  ? "bg-[rgba(0,0,0,.8)]"
                  : "bg-[rgba(0,0,0,.42)]"
              }`}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
