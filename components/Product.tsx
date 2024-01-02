"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { addToFavorite } from "@/lib/actions/favorite.actions";
import { addToBag } from "@/lib/actions/bag.actions";
import { Product, Sessions } from "@/types";
import { FaHeart, FaRegHeart, FaTruck } from "react-icons/fa";

export default function Product({
  products,
  session,
}: {
  products: Product[];
  session: Sessions;
}) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState({
    product: Object(),
    quantity: 0,
    size: "",
  });

  const [selected, setSelected] = useState({
    color: products[0].color, // Default-check the first attribute
    size: products[0].sizes[0], // Default-check the first attribute
  });

  useEffect(() => {
    const found = products.find(
      (product) =>
        product.color.includes(selected.color) &&
        product.sizes.includes(selected.size)
    );

    setProduct(found);
    setItem({ product: found?._id, quantity: quantity, size: selected.size });
  }, [selected]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session) {
      await addToBag(item);

      router.push("/bag");
    } else {
      router.push("/sign-in");
    }
  };

  const handleFavorite = () => {
    if (session) {
      addToFavorite(session.user?.id!, product?._id!);

      router.refresh();
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex flex-row p-4 md:p-0">
      <div className="hidden md:flex flex-wrap flex-1">
        <div className="block sticky top-0 h-fit">
          {product && (
            <Image
              src={product.image}
              alt="product"
              width={410}
              height={410}
              className="bg-gree-600"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col flex-wrap flex-1">
        <h1 className="text-2xl md:text-4xl font-semibold">
          {products[0].name}
        </h1>
        <div className="flex justify-center md:hidden md:justify-start flex-wrap flex-1">
          <div className="block w-[75%]">
            {product && (
              <Image
                src={product.image}
                alt="product"
                width={410}
                height={410}
                className="bg-gree-600"
              />
            )}
          </div>
        </div>
        <div className="pt-3 mb-4 md:mb-8 text-sm md:text-base">
          <ul className="h-44 md:h-48 gap-3">
            {product &&
              product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            <li key={product?.color}>Mostrado en: {product?.color}</li>
            <li key={product?.sku}>Estilo: {product?.sku}</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-[#d2d2d7]">
          <h3 className="mt-4">Color</h3>
          <div className="flex flex-col flex-wrap gap-2 md:gap-3 mt-3.5">
            {products.map((product) => (
              <div key={product.color} className="flex items-center h-14">
                <input
                  id={product.color}
                  value={product.color}
                  checked={selected.color === product.color} // Check if this color is selected
                  onChange={(e) =>
                    setSelected({ ...selected, color: e.target.value })
                  }
                  type="checkbox"
                  className="absolute appearance-none peer"
                />
                <label
                  htmlFor={product.color}
                  className="flex flex-wrap p-3.5 w-full cursor-pointer rounded-xl border border-tertiary-gray peer-checked:border-2 peer-checked:border-primary-blue peer-checked:p-[13px] peer-disabled:opacity-40"
                >
                  <span className="text-sm md:text-base">{product.color}</span>
                </label>
              </div>
            ))}
          </div>
          <h3 className="mt-4">Talle (US)</h3>
          <div className="grid grid-cols-5 gap-3.5 mt-3.5">
            {product?.sizes.map((size, i) => (
              <div key={size} className="w-full md:w-[86px] h-14">
                <input
                  id={size}
                  value={size}
                  checked={selected.size === size} // Check if this size is selected
                  onChange={(e) =>
                    setSelected({ ...selected, size: e.target.value })
                  }
                  type="checkbox"
                  className="absolute appearance-none peer"
                  disabled={product.stock[i] <= 0}
                />
                <label
                  htmlFor={size}
                  className="flex justify-center flex-wrap p-3.5 cursor-pointer rounded-xl border border-tertiary-gray peer-checked:border-2 peer-checked:border-primary-blue peer-checked:p-[13px] peer-disabled:opacity-40"
                >
                  <span className="text-sm md:text-base">{size}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center pt-8 gap-4">
            <div className="flex flex-col items-end">
              <span className="text-2xl font-semibold">
                {product &&
                  product.price.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
              </span>

              <div className="flex items-center gap-2">
                <FaTruck size={24} />
                <span>Envío gratis</span>
              </div>
            </div>

            <button className="button">Agregar al carrito</button>

            {session?.user?.favorite?.some(
              (favoriteProduct) =>
                favoriteProduct.toString() === product?._id?.toString()
            ) ? (
              <button
                aria-label="Quitar de favoritos"
                className="text-tertiary-blue"
                onClick={handleFavorite}
                type="button"
              >
                <FaHeart />
              </button>
            ) : (
              <button
                aria-label="Agregar a favoritos"
                className="text-tertiary-blue"
                onClick={handleFavorite}
                type="button"
              >
                <FaRegHeart size={24} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
