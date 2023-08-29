"use client";

import { useRouter } from "next/navigation";

import { removeItem } from "@/lib/actions";
import { ObjectId } from "mongodb";

export default function DeleteButton({
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
      onClick={handleDelete}
      className="mt-3 text-[17px] text-tertiary-blue"
    >
      Quitar
    </button>
  );
}
