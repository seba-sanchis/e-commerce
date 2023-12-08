import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { SignUp } from "@/components";
import { authOptions } from "@/lib/options";
import { Sessions } from "@/common.types";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Sessions;

  if (session?.user) redirect("/");

  return (
    <div className="flex flex-col w-full max-w-[1200px] px-4">
      <div className="flex flex-col items-center pt-8 max-w-[460px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold">Creá tu cuenta</h1>
        <div className="text-center my-2">
          Una cuenta es todo lo que necesitas para comenzar a agregar productos
          a tu carrito.
        </div>
        <div>
          <span>¿Ya tenés una cuenta?</span>{" "}
          <Link href="/sign-in" className="text-tertiary-blue">
            Ingresar ahora
          </Link>
        </div>
      </div>

      <SignUp />
    </div>
  );
}
