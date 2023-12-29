import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

import { authOptions } from "@/lib/options";
import { getItems } from "@/lib/actions/bag.actions";
import {
  CheckOut,
  ProductDetails,
  RemoveProduct,
  SelectQuantity,
} from "@/components";
import { Item, Sessions } from "@/types";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Sessions;

  const sessionData = await JSON.parse(JSON.stringify(session));

  const response = await getItems(session.user?.id as string);

  const data = await JSON.parse(JSON.stringify(response));

  const { MERCADOPAGO_URL } = process.env;

  return (
    <div className="flex justify-center w-full grow">
      <div className="flex flex-col flex-grow w-full max-w-[980px] pt-12 px-4 md:px-0 mb-8">
        <h1 className="text-[40px] font-semibold">Revisá tu carrito.</h1>
        <span className="pt-3 text-[17px]">Envío gratuito a todo el país.</span>

        <div className="flex justify-center items-center p-4 md:p-5 mt-14 rounded-lg text-sm bg-primary-gray">
          <div className="flex md:px-24">
            <i className="fi fi-rr-messages text-xl"></i>
            <div className="ml-2">
              Ante cuanquier inquietud, comuníquese con nosotros por WhatsApp al
              número 000 0000-0000. Estaremos encantados en poder ayudarlo.
            </div>
          </div>
        </div>

        <ol className="mt-16">
          {data.bag.map((item: Item) => (
            <li
              key={item.product.sku}
              className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-0 pb-8 mb-8 md:pb-16 md:mb-16 border-b border-secondary-gray"
            >
              <div className="flex h-full justify-center flex-1 md:max-w-[25%]">
                <Link
                  href={`/product/${item.product.name.replace(/\s+/g, "-")}`}
                >
                  <Image
                    src={item.product?.image}
                    alt={item.product?.name}
                    width={128}
                    height={128}
                  />
                </Link>
              </div>

              <div className="flex flex-col items-center md:items-stretch flex-1 w-full md:max-w-[75%]">
                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-1 md:gap-0">
                  <h2 className="text-2xl font-semibold hover:text-primary-blue w-full text-center md:text-start">
                    <Link
                      href={`/product/${item.product.name.replace(
                        /\s+/g,
                        "-"
                      )}`}
                    >
                      {item.product?.name}
                    </Link>
                  </h2>
                  <div className="flex justify-between w-full">
                    <SelectQuantity
                      itemId={item._id as ObjectId}
                      quantity={item.quantity}
                      size={item.size as string}
                    />
                    <div className="text-2xl font-semibold">
                      {(item.product?.price * item.quantity).toLocaleString(
                        "es-AR",
                        {
                          style: "currency",
                          currency: "ARS",
                        }
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start w-full">
                  <ProductDetails
                    color={item.product?.color}
                    size={item.size as string}
                  />

                  <RemoveProduct
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
        <CheckOut bag={data.bag} session={sessionData} url={MERCADOPAGO_URL!} />
      </div>
    </div>
  );
}
