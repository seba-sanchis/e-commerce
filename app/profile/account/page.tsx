import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/options";
import { Sessions } from "@/types";
import { EditAccount, EditPrivacy, EditShipping } from "@/components";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Sessions;

  if (!session?.user) redirect("/");

  const { account, privacy, shipping } = await JSON.parse(
    JSON.stringify(session.user)
  );

  return (
    <div className="flex flex-col gap-8 w-full m-4">
      <div>
        <h3 className="text-2xl font-semibold mb-1.5">Envío</h3>
        <div className="flex gap-16">
          <div>
            <h4 className="font-semibold">Dirección de envío</h4>
            <div>
              <span>{shipping?.address}</span>,{" "}
              <span>{shipping?.location}</span>
            </div>
            <div>{shipping?.zip}</div>
            <div>{shipping?.region}</div>
          </div>
          <div>
            <h4 className="font-semibold">Información de contacto</h4>
            <div>
              <span>{shipping?.areaCode}</span> <span>{shipping?.phone}</span>
            </div>
          </div>
        </div>
        <EditShipping shipping={shipping!} />
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-1.5">Privacidad</h3>
        <div>
          <h4 className="font-semibold">Información personal</h4>
          <div>
            Estás en control de tu información personal y podés gestionar tus
            datos o eliminar tu cuenta en cualquier momento. Nos comprometemos a
            proteger tu privacidad.
          </div>
        </div>
        <EditPrivacy privacy={privacy!} />
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-1.5">Cuenta</h3>
        <div>
          <div>{account?.email}</div>
        </div>
        <EditAccount account={account!} />
      </div>
    </div>
  );
}
