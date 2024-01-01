"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function Scroller({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [groupSize, setGroupSize] = useState(4);
  const [translateValue, setTranslateValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const numProductsToShow = containerWidth < 768 ? 1 : 4;

      setGroupSize(numProductsToShow);

      if (currentIndex > products.length - numProductsToShow) {
        setCurrentIndex(products.length - numProductsToShow);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex, products.length]);

  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const itemWidth = 230 + 16; // width of each item + margin
    const newTranslateValue =
      containerWidth < 768 ? containerWidth : itemWidth * groupSize;
    setTranslateValue(newTranslateValue);
  }, [groupSize]);

  const prevSlide = () => {
    const numProductsInPrevGroup = Math.min(groupSize, currentIndex);

    if (numProductsInPrevGroup >= groupSize) {
      setCurrentIndex((prevIndex) =>
        Math.max(prevIndex - (window.innerWidth < 768 ? groupSize : 1), 0)
      );
    } else {
      setCurrentIndex((prevIndex) =>
        Math.max(prevIndex - numProductsInPrevGroup, 0)
      );
    }
  };

  const nextSlide = () => {
    const remainingProducts = products.length - currentIndex;
    const numProductsInNextGroup = Math.min(groupSize, remainingProducts);

    if (numProductsInNextGroup >= groupSize) {
      setCurrentIndex(
        (prevIndex) => prevIndex + (window.innerWidth < 768 ? groupSize : 1)
      );
    } else {
      setCurrentIndex((prevIndex) => prevIndex + numProductsInNextGroup);
    }
  };

  const groupedProducts = [];

  for (let i = 0; i < products.length; i += groupSize) {
    groupedProducts.push(products.slice(i, i + groupSize));
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const touchMoveX = e.touches[0].clientX;
      const deltaX = touchStartX.current - touchMoveX;

      if (Math.abs(deltaX) > 30) {
        // Threshold for swipe action
        if (deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }

        touchStartX.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  return (
    <div
      className="max-w-[980px] w-full overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={containerRef} className="flex w-full">
        <div
          style={{
            transform: `translateX(-${currentIndex * translateValue}px)`,
            transition: "transform 400ms",
          }}
          className="flex w-full h-full rounded-2xl relative"
        >
          {groupedProducts.map((group, groupIndex) => (
            <div className="flex" key={groupIndex}>
              {group.map((product, index) => (
                <Link
                  href={`/product/${product.name.replace(/\s+/g, "-")}`}
                  className="group flex flex-col items-center md:items-start min-w-[230px] w-screen md:w-full md:rounded-2xl bg-primary-gray cursor-pointer md:mx-2"
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
                  <div className="flex flex-col items-center md:items-start p-4 gap-2 text-ellipsis overflow-hidden">
                    <div className="text-sm font-semibold line-clamp-2 group-hover:text-tertiary-blue">
                      {product.name}
                    </div>
                    <div>
                      {product.price.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </div>
                    <div className="text-sm text-tertiary-blue group-hover:text-secondary-blue transition-colors">
                      Ver producto
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {!containerRef.current ||
        (containerRef.current.offsetWidth >= 768 && (
          <div>
            {/* Left Arrow */}
            {currentIndex > 0 && (
              <div className="flex justify-center items-center absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-[rgba(210,210,215,.64)] text-[rgba(0,0,0,.56)] cursor-pointer">
                <button
                  aria-label="Productos anteriores"
                  className="w-8 h-8"
                  onClick={prevSlide}
                >
                  <i className="fi fi-rr-angle-left flex justify-center items-center mr-1"></i>
                </button>
              </div>
            )}
            {/* Right Arrow */}
            {(currentIndex + 1) * groupSize < products.length && (
              <div className="flex justify-center items-center absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-[rgba(210,210,215,.64)] text-[rgba(0,0,0,.56)] cursor-pointer">
                <button
                  aria-label="Productos siguientes"
                  className="w-8 h-8"
                  onClick={nextSlide}
                >
                  <i className="fi fi-rr-angle-right flex justify-center items-center ml-1"></i>
                </button>
              </div>
            )}
          </div>
        ))}

      <ul className="flex top-4 justify-center py-2">
        {Array.from({ length: Math.ceil(products.length / groupSize) }).map(
          (_, index) => (
            <li key={index}>
              <button
                aria-label={`Item ${index + 1}`}
                className={`cursor-pointer rounded-full w-2 h-2 mx-2 transition-colors duration-100 ease-linear ${
                  index === currentIndex
                    ? "bg-[rgba(0,0,0,.8)]"
                    : "bg-[rgba(0,0,0,.42)]"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
