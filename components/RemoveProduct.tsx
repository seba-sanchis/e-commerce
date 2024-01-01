"use client";

import { useRouter } from "next/navigation";
import { ObjectId } from "mongodb";

import { removeItem } from "@/lib/actions/bag.actions";

export default function RemoveProduct({
  itemId,
  userId,
}: {
  itemId: ObjectId;
  userId: string;
}) {
  const router = useRouter();

  const handleDelete = () => {
    removeItem(itemId, userId);

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
