"use client";

import { useRouter } from "next/navigation";

import { quantities } from "@/constants";
import { updateItem } from "@/lib/actions";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";

export default function Select({
  itemId,
  quantity,
}: {
  itemId: ObjectId;
  quantity: number;
}) {
  const router = useRouter();

  const [newQuantity, setNewQuantity] = useState<number>();

  useEffect(() => {
    setNewQuantity(quantity);
  }, []);

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewQuantity(Number(e.target.value));
    updateItem(itemId, Number(e.target.value));
    router.refresh();
  };

  return (
    <>
      {quantity < 10 ? (
        <div className="flex h-fit text-2xl font-semibold">
          <select
            className="appearance-none pl-4 z-10 bg-transparent"
            value={newQuantity}
            onChange={handleSelect}
          >
            {quantities.map((quantity) => (
              <option value={quantity}>
                {quantity < 10 ? quantity : `${quantity}+`}
              </option>
            ))}
          </select>
          <span>
            <i className="fi fi-rr-angle-small-down flex items-center relative top-1 right-6 text-primary-blue"></i>
          </span>
        </div>
      ) : (
        <div className="flex justify-center h-fit">
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
            onBlur={handleSelect}
            className="w-[88px] px-4 pt-5 pb-1 rounded-lg border border-tertiary-gray"
          />
          <span className="absolute mt-1.5 text-xs">Cantidad:</span>
        </div>
      )}
    </>
  );
}
