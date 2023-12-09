import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { authOptions } from "@/lib/options";
import { getFavorites } from "@/lib/actions/favorite.actions";
import { Product, Sessions } from "@/common.types";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Sessions;

  const response = await getFavorites(session.user?.id as string);

  return (
    <div className="w-full m-4">
      <ol className="flex flex-wrap">
        {response.map((favorite: Product, i: number) => (
          <li
            key={favorite.sku}
            className={`flex flex-col items-center w-1/3 p-4 border-b border-secondary-gray ${
              i % 3 > 0 && "border-l"
            }`}
          >
            <div className="text-center">
              <h2 className="hover:underline">
                <Link href={`/product/${favorite.name.replace(/\s+/g, "-")}`}>
                  <div>{favorite.name}</div>
                  <div>
                    {favorite.price.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </div>
                </Link>
              </h2>

              <Link
                href={`/product/${favorite.name.replace(/\s+/g, "-")}`}
                className="text-tertiary-blue hover:underline"
              >
                Ver más
              </Link>
            </div>
            <div>
              <Image
                src={favorite.image}
                alt="favorite image"
                width={128}
                height={128}
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
