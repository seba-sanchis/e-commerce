import { getServerSession } from "next-auth";

import { Attributes } from "@/components";
import { authOptions } from "@/lib/options";
import { getProductsByName } from "@/lib/actions/product.actions";
import { Sessions } from "@/common.types";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const session = (await getServerSession(authOptions)) as Sessions;

  const sessionData = await JSON.parse(JSON.stringify(session));

  const response = await getProductsByName(id.replace(/-/g, " "));

  const data = await JSON.parse(JSON.stringify(response));

  return (
    <div className="flex flex-col flex-grow w-full max-w-[980px] my-8">
      <Attributes products={data} session={sessionData} />
    </div>
  );
}
