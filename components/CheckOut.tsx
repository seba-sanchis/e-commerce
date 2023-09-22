"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PreferenceItem } from "mercadopago/models/preferences/create-payload.model";
import { initMercadoPago } from "@mercadopago/sdk-react";

import { Currency } from "mercadopago/shared/currency";
import { newCheckOut } from "@/lib/actions/checkout.actions";
import { Item, Sessions } from "@/common.types";
import { env } from "@/constants";

export default function CheckOut({
  bag,
  session,
  url,
}: {
  bag: Item[];
  session: Sessions;
  url: string;
}) {
  const router = useRouter();
  const [order, setOrder] = useState<PreferenceItem[]>([]);

  const { MERCADOPAGO_PUBLIC_KEY } = env;
  initMercadoPago(MERCADOPAGO_PUBLIC_KEY);

  useEffect(() => {
    const items = bag.map((item) => ({
      id: item.product?.sku,
      title: item.product?.name,
      description: item.size,
      currency_id: "ARS" as Currency,
      picture_url: url + item.product?.thumbnail,
      category_id: item.product?.category,
      quantity: item.quantity,
      unit_price: item.product?.price,
    }));

    setOrder(items);
  }, [bag]);

  const handleCheckOut = async () => {
    if (session.user) {
      const response = await newCheckOut(
        order,
        session.user.id as string,
        session.user.email as string,
        session.user.dni as number
      );

      router.push(response.init_point);
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex justify-end py-8">
      <button
        onClick={handleCheckOut}
        className="w-72 min-w-[30px] my-2 px-8 py-4 rounded-xl border border-transparent text-white bg-primary-blue active:bg-[#006edb]"
      >
        Comprar
      </button>
    </div>
  );
}
