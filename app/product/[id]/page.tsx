import Image from "next/image";

import { getProductsByName } from "@/lib/actions";
import { Attributes } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/options";
import { Sessions } from "@/common.types";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const session = (await getServerSession(authOptions)) as Sessions;

  const sessionData = await JSON.parse(JSON.stringify(session));

  const response = await getProductsByName(id.replace(/-/g, " "));

  const data = await JSON.parse(JSON.stringify(response));

  return (
    <div className="flex flex-col flex-grow w-full max-w-[980px] my-8">
      <div className="flex flex-row">
        <div className="flex flex-wrap flex-1">
          <div className="block sticky top-0 h-fit">
            <Image
              src={data[0].image}
              alt="product"
              width={410}
              height={410}
              className="bg-gree-600"
            />
          </div>
        </div>
        <Attributes products={data} session={sessionData} />
      </div>
    </div>
  );
}
