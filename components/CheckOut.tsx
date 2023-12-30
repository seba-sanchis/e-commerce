"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { initMercadoPago } from "@mercadopago/sdk-react";

import { Currency } from "mercadopago/shared/currency";
import { newCheckOut } from "@/lib/actions/checkout.actions";
import { Item, Sessions } from "@/types";
import { Items } from "mercadopago/dist/clients/commonTypes";

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
  const [order, setOrder] = useState<Items[]>([]);

  const { MERCADOPAGO_PUBLIC_KEY } = process.env;

  initMercadoPago(MERCADOPAGO_PUBLIC_KEY!);

  useEffect(() => {
    const items = bag.map((item) => ({
      id: item.product?.sku,
      title: item.product?.name,
      description: item.size,
      currency_id: "ARS" as Currency,
      picture_url: url + item.product?.image,
      category_id: item.product?.category,
      quantity: item.quantity,
      unit_price: item.product?.price,
    }));

    setOrder(items);
  }, [bag]);

  const handleCheckOut = async () => {
    if (
      session.user &&
      session.user.id &&
      session.user.account &&
      session.user.privacy
    ) {
      const response = await newCheckOut(
        order,
        session.user.id,
        session.user.account.email,
        session.user.privacy.dni,
        session.user.privacy.firstName,
        session.user.privacy.lastName
      );

      router.push(response);
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
