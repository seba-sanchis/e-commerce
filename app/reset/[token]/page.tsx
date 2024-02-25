import { ResetPassword } from "@/components";
import { verifyToken } from "@/lib/actions/account.actions";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

type Props = {
  params: { token: string };
};

export default async function Reset({ params }: Props) {
  const email = await verifyToken(params.token);

  if (email.error)
    return (
      <section className="flex flex-col flex-1 max-w-[980px] w-full mx-auto pt-14">
        <h1 className="text-3xl font-semibold w-2/3 h-16">
          Tu solicitud de cambio de contraseña expiró.
        </h1>
        <div className="flex">
          <div className="border-r border-secondary-gray w-2/3 pr-10">
            <p>
              Restablecé tu contraseña nuevamente haciendo{" "}
              <Link href="/forgot">click aquí.</Link>
            </p>
          </div>
          .
        </div>
      </section>
    );

  return (
    <section className="flex flex-col flex-1 max-w-[980px] w-full mx-auto pt-14">
      <h1 className="text-3xl font-semibold w-2/3 h-16">
        Cambiá tu contraseña
      </h1>
      <div className="flex">
        <div className="border-r border-secondary-gray w-2/3 pr-10">
          <p>Ingresá una nueva contraseña para asociar a tu cuenta.</p>

          <ResetPassword email={email} />
        </div>
        <div className="flex w-1/3 pl-10 text-[#6e6e73]">
          <div>
            <FaRegUserCircle size={40} />
          </div>

          <p className="pl-5 text-sm">
            Luego de cambiar la contraseña podrás volver a ingresar para
            continuar con tus compras.
          </p>
        </div>
      </div>
    </section>
  );
}
