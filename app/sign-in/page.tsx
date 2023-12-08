import Link from "next/link";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { OAuth, SignIn } from "@/components";
import { authOptions } from "@/lib/options";
import { Sessions } from "@/common.types";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Sessions;

  if (session?.user) redirect("/");

  const providers = await getProviders();

  return (
    <section className="flex flex-col flex-1 max-w-[980px] w-full mx-auto">
      <h1 className="text-[40px] font-semibold pt-[34px]">
        Iniciá sesión para comprar.
      </h1>
      <div className="flex flex-col items-center grow w-[480px] mt-[72px] mx-auto text-[#494949]">
        <h2 className="text-2xl font-semibold mb-10">Ingresá a la tienda</h2>

        <SignIn />

        <div className="flex flex-col items-center text-sm gap-2 my-4">
          <div>
            <Link href="/forgotten-password" className="text-tertiary-blue">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div>
            <span>¿No tenés cuenta?</span>{" "}
            <Link href="/sign-up" className="text-tertiary-blue">
              Crear ahora
            </Link>
          </div>
        </div>

        <div className="flex items-center w-full my-4">
          <div className="h-[1px] flex-grow shrink bg-secondary-gray"></div>
          <div className="mx-4">O</div>
          <div className="h-[1px] flex-grow shrink bg-secondary-gray"></div>
        </div>

        <div className="flex flex-col items-center text-sm gap-2">
          {providers &&
            Object.values(providers).map(
              (provider) =>
                provider.name !== "Credentials" && (
                  <OAuth
                    key={provider.id}
                    id={provider.id}
                    name={provider.name}
                  />
                )
            )}
        </div>
      </div>
    </section>
  );
}
