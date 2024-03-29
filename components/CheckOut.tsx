"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { initMercadoPago } from "@mercadopago/sdk-react";

import { Currency } from "mercadopago/shared/currency";
import { newCheckOut } from "@/lib/actions/checkout.actions";
import { Item, Sessions } from "@/types";
import { Items } from "mercadopago/dist/clients/commonTypes";

export default function CheckOut({ bag }: { bag: Item[] }) {
  const router = useRouter();
  const [order, setOrder] = useState<Items[]>([]);

  const { MERCADOPAGO_PUBLIC_KEY } = process.env;

  initMercadoPago(MERCADOPAGO_PUBLIC_KEY!);

  useEffect(() => {
    const items = bag.map((item) => ({
      id: item.product.sku,
      title: item.product.name,
      description: item.size,
      currency_id: "ARS" as Currency,
      picture_url: item.product.image,
      category_id: item.product.category,
      quantity: item.quantity,
      unit_price: item.product.price,
    }));

    setOrder(items);
  }, [bag]);

  const handleCheckOut = async () => {
    const response = await newCheckOut(order);

    if (!response) throw new Error("Failed to checkout");

    router.push(response);
  };

  return (
    <div className="flex justify-end py-8">
      <button
        className="w-72 min-w-[30px] my-2 px-8 py-4 rounded-xl border border-transparent text-white bg-primary-blue active:bg-quaternary-blue"
        onClick={handleCheckOut}
      >
        Comprar
      </button>
    </div>
  );
}
