import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/options";
import { Picked, Sessions } from "@/common.types";
import { getOrders } from "@/lib/actions";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Sessions;

  if (!session?.user) redirect("/");

  const response = await getOrders(session.user.id as string);

  // Function to format a date string to "dd de MMMM" format with or without the year
  function formatDate(orderDate: string) {
    const date = new Date(orderDate);
    const currentDate = new Date();

    const day = date.toLocaleDateString("es-ES", { day: "2-digit" });
    const month = date.toLocaleDateString("es-ES", { month: "long" });
    const year = date.getFullYear();

    if (year === currentDate.getFullYear()) {
      return `${day} de ${month}`;
    } else {
      return `${day} de ${month} de ${year}`;
    }
  }

  return (
    <div className="w-full">
      {response.map((order) => (
        <div className="flex m-4 p-4 rounded-2xl bg-[#f2f2f2]">
          <div className="flex flex-col gap-2">
            {order.picked.map((pick: Picked) => (
              <div className="flex">
                <div className="w-24 h-24 bg-gray-300"></div>
                <div className="flex flex-col p-2">
                  <div className="font-semibold">{pick.name}</div>
                  <div className="text-sm">
                    {pick.quantity === 1
                      ? `${pick.quantity} unidad`
                      : `${pick.quantity} unidades`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-end flex-1">
            <div className="font-semibold">
              {order.transaction.paid.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </div>
            <div className="text-sm">
              <span>{order.installments}</span>
              {" x "}
              <span>
                {order.transaction.installment.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </span>
            </div>
            <div className="text-sm">
              {order.payment.company.charAt(0).toUpperCase() +
                order.payment.company.slice(1)}{" "}
              {order.payment.type === "credit_card" ? "Crédito" : "Débito"}
            </div>
            <div className="text-sm">
              <span>{formatDate(order.date)}</span>
              {" | "}
              <span># {order.orderId}</span>
            </div>
            <div className="text-sm text-[#0c9d46]">
              {order.status === "approved" && "Pago aprobado"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
