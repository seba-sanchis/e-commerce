"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ObjectId } from "mongodb";

import { quantities } from "@/constants";
import { updateItem } from "@/lib/actions/bag.actions";
import { FaAngleDown } from "react-icons/fa";

export default function SelectQuantity({
  itemId,
  quantity,
  size,
}: {
  itemId: ObjectId;
  quantity: number;
  size: string;
}) {
  const router = useRouter();

  const [newQuantity, setNewQuantity] = useState<number | string>();

  useEffect(() => {
    setNewQuantity(quantity);
  }, []);

  const handleSelect = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newValue = e.target.value === "" ? "1" : e.target.value;

    setNewQuantity(Number(newValue));

    try {
      await updateItem(itemId, Number(newValue), size);
      router.refresh();
    } catch (error) {
      // If there's not enough stock, update the state to show the previous quantity
      setNewQuantity(quantity);
    }
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
              <option key={quantity} value={quantity}>
                {quantity < 10 ? quantity : `${quantity}+`}
              </option>
            ))}
          </select>
          <span className="relative top-1.5 right-6 text-primary-blue">
            <FaAngleDown size={20} />
          </span>
        </div>
      ) : (
        <div className="flex justify-center h-fit">
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => {
              setNewQuantity(e.target.value); // Keep it as a string in onChange
            }}
            onBlur={handleSelect}
            onKeyDown={(e) => e.key === "Enter" && handleSelect(e as any)}
            className="w-[88px] px-4 pt-5 pb-1 rounded-lg border border-tertiary-gray"
          />
          <span className="absolute mt-1.5 text-xs">Cantidad:</span>
        </div>
      )}
    </>
  );
}
