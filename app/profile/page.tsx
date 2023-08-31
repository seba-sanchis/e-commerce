import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/options";
import { Sessions } from "@/common.types";
import { SignOutButton } from "@/components";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Sessions;

  if (!session?.user) redirect("/");

  return (
    <div>
      <SignOutButton />
    </div>
  );
}
