import { getServerSession } from "next-auth";
import Image from "next/image";

import { Item, Sessions } from "@/common.types";
import { authOptions } from "@/lib/options";
import { getItems } from "@/lib/actions";
import { CheckOut, DeleteButton, DetailsButton, Select } from "@/components";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Sessions;

  const sessionData = await JSON.parse(JSON.stringify(session));

  const response = await getItems(session.user?.id as string);

  const data = await JSON.parse(JSON.stringify(response));

  return (
    <div className="flex justify-center w-full grow">
      <div className="flex flex-col flex-grow w-full max-w-[980px] pt-12 mb-8">
        <h1 className="text-[40px] font-semibold">Revisá tu carrito.</h1>
        <span className="pt-3 text-[17px]">Envío gratuito a todo el país.</span>

        <div className="flex justify-center items-center p-5 mt-14 rounded-lg text-sm bg-primary-gray">
          <div className="flex px-24">
            <i className="fi fi-rr-messages text-xl"></i>
            <div className="ml-2">
              Ante cuanquier inquietud, comuníquese con nosotros por WhatsApp al
              número 000 0000-0000. Estaremos encantados en poder ayudarlo.
            </div>
          </div>
        </div>

        <ol className="mt-16">
          {data.bag.map((item: Item) => (
            <li className="flex pb-16 mb-16 border-b border-secondary-gray">
              <div className="flex h-full justify-center flex-1 max-w-[25%]">
                <Link
                  href={`/product/${item.product.name.replace(/\s+/g, "-")}`}
                >
                  <Image
                    src={item.product?.thumbnail}
                    alt={item.product?.name}
                    width={128}
                    height={128}
                  />
                </Link>
              </div>
              <div className="flex flex-1 max-w-[75%]">
                <div className="w-full max-w-[50%]">
                  <h2 className="text-2xl font-semibold pr-5 hover:text-primary-blue">
                    <Link
                      href={`/product/${item.product.name.replace(
                        /\s+/g,
                        "-"
                      )}`}
                    >
                      {item.product?.name}
                    </Link>
                  </h2>
                  <DetailsButton features={item.product?.features} />
                </div>

                <Select
                  itemId={item._id as ObjectId}
                  quantity={item.quantity}
                />

                <div className="flex flex-col items-end pl-2 w-full">
                  <div className="text-2xl font-semibold">
                    {(item.product?.price * item.quantity).toLocaleString(
                      "es-AR",
                      {
                        style: "currency",
                        currency: "ARS",
                      }
                    )}
                  </div>
                  <DeleteButton
                    itemId={item._id as ObjectId}
                    userId={session.user?.id as string}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="max-w-[75%] ml-[25%]">
          <div className="flex justify-between mb-2">
            <div>Subtotal</div>
            <div>
              {data.bag
                ?.reduce(
                  (sum: number, item: Item) =>
                    sum + item.product?.price * item.quantity,
                  0
                )
                .toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div>Envío</div>
            <div>Gratis</div>
          </div>
          <div className="flex justify-between mt-4 pt-4 text-2xl font-semibold border-t border-secondary-gray">
            <div>Total</div>
            <div>
              {response.bag
                ?.reduce(
                  (sum: number, item: Item) =>
                    sum + item.product?.price * item.quantity,
                  0
                )
                .toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
            </div>
          </div>
        </div>
        <CheckOut bag={data.bag} session={sessionData} />
      </div>
    </div>
  );
}
