import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/options";
import { Sidebar } from "@/components";
import { Sessions } from "@/common.types";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = (await getServerSession(authOptions)) as Sessions;

  if (!session?.user) redirect("/");

  return (
    <section className="flex flex-grow w-full max-w-[980px] my-8">
      <Sidebar />
      {children}
    </section>
  );
}