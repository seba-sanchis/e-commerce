import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

import { authOptions } from "@/lib/options";
import { Picked, Sessions } from "@/common.types";
import { SignOutButton } from "@/components";
import { getOrders } from "@/lib/actions";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Sessions;

  if (!session?.user) redirect("/");

  const response = await getOrders(session.user.id as string);
// console.log(response)
  return (
    <div>
      {response.map((order) => (
        <div className="m-4 p-4 border border-red-600">
          <div>Date: {`${order.date}`}</div>
          <div>
            Products:
            {order.picked.map((pick: Picked) => (
              <div className="m-4 p-4 border border-blue-600">
                <div>Name: {pick.name}</div>
                <div>Quantity: {pick.quantity}</div>
                <div>Price: {pick.price}</div>
              </div>
            ))}
          </div>
          <div>Paid: {order.transaction.paid}</div>
        </div>
      ))}
      <SignOutButton />
    </div>
  );
}
