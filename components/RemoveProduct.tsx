"use client";

import { useRouter } from "next/navigation";
import { Types } from "mongoose";

import { removeItem } from "@/lib/actions/bag.actions";

type Props = { itemId: Types.ObjectId };

export default function RemoveProduct({ itemId }: Props) {
  const router = useRouter();

  const handleDelete = () => {
    removeItem(itemId);

    router.refresh();
  };

  return (
    <button
      className="mt-3 text-[17px] text-tertiary-blue"
      onClick={handleDelete}
    >
      Quitar
    </button>
  );
}
