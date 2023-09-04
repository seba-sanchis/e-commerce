"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ObjectId } from "mongodb";

import { addToBag, addToFavorite } from "@/lib/actions";
import { Product, Sessions } from "@/common.types";

const firstAttribute = [
  "Potencia: 0.33 HP",
  "Potencia: 0.50 HP",
  "Potencia: 0.75 HP",
  "Potencia: 1.00 HP",
  "Potencia: 1.25 HP",
];

const secondAttribute = [
  "Tensión: 220 V ~ 50hz monofásica",
  "Tensión: 220 / 380 V ~ 50hz trifásica",
];

export default function Attributes({
  products,
  session,
}: {
  products: Product[];
  session: Sessions;
}) {
  const router = useRouter();

  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState({
    product: Object(),
    quantity: 0,
  });

  const [selector, setSelector] = useState({
    one: firstAttribute[0], // Default-check the first attribute
    two: secondAttribute[0], // Default-check the second attribute
  });

  useEffect(() => {
    const found = products.find(
      (product) =>
        product.features.includes(selector.one) &&
        product.features.includes(selector.two)
    );

    setProduct(found);
    setItem({ product: found?._id, quantity: quantity });
  }, [selector]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session) {
      addToBag(item);

      router.refresh();
    } else {
      router.push("/sign-in");
    }
  };

  const handleFavorite = () => {
    if (session) {
      addToFavorite(session.user?.id as string, product?._id as ObjectId);

      router.refresh();
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex flex-col flex-wrap flex-1">
      <h1 className="text-4xl font-semibold">{products[0].name}</h1>
      <div className="pt-3 mb-8">
        <ul className="gap-3">
          {product &&
            product.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="border-t border-[#d2d2d7]">
        <h3 className="mt-4">Potencia</h3>
        <div className="flex flex-col flex-wrap gap-3.5 mt-3.5">
          {firstAttribute.map((attribute, i) => (
            <div key={attribute} className="h-[56px]">
              <input
                value={attribute}
                checked={product?.features.includes(attribute) ? true : false}
                disabled={
                  products.find(
                    (product) =>
                      product.features.includes(attribute) &&
                      product.features.includes(selector.two)
                  )
                    ? false
                    : true
                }
                onChange={(e) =>
                  setSelector({ ...selector, one: e.target.value })
                }
                type="checkbox"
                className="absolute appearance-none peer w-full max-w-[490px] h-[56px] p-3.5 rounded-xl cursor-pointer"
              />
              <label className="flex flex-wrap p-3.5 cursor-pointer rounded-xl border border-tertiary-gray peer-checked:border-2 peer-checked:border-primary-blue peer-disabled:opacity-40">
                <span>{attribute}</span>
              </label>
            </div>
          ))}
        </div>
        <h3 className="mt-4">Tensión</h3>
        <div className="flex flex-col flex-wrap gap-3.5 mt-3.5">
          {secondAttribute.map((attribute, i) => (
            <div key={attribute} className="h-[56px]">
              <input
                value={attribute}
                checked={product?.features.includes(attribute) ? true : false}
                disabled={
                  products.find(
                    (product) =>
                      product.features.includes(attribute) &&
                      product.features.includes(selector.one)
                  )
                    ? false
                    : true
                }
                onChange={(e) =>
                  setSelector({ ...selector, two: e.target.value })
                }
                type="checkbox"
                className="absolute appearance-none peer w-full max-w-[490px] h-[56px] p-3.5 rounded-xl cursor-pointer"
              />
              <label className="flex flex-wrap p-3.5 cursor-pointer rounded-xl border border-tertiary-gray peer-checked:border-2 peer-checked:border-primary-blue peer-disabled:opacity-40">
                <span>{attribute}</span>
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

            <div className="flex gap-2">
              <i className="fi fi-rr-truck-side text-xl flex justify-center items-center"></i>
              <span>Envío gratis</span>
            </div>
          </div>

          <button className="button">Agregar al carrito</button>

          <button
            type="button"
            onClick={handleFavorite}
            className="text-tertiary-blue"
          >
            {session?.user?.favorite?.some(
              (favoriteProduct) =>
                favoriteProduct.toString() === product?._id?.toString()
            ) ? (
              <i className="fi fi-sr-heart icon"></i>
            ) : (
              <i className="fi fi-rr-heart icon"></i>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
