import { getServerSession } from "next-auth";

import { Sessions } from "@/common.types";
import { UpdateUser } from "@/components";
import { authOptions } from "@/lib/options";
import User from "@/models/user";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as Sessions;

  const response = await User.findOne({
    _id: session.user?.id,
  });

  const data = await JSON.parse(JSON.stringify(response));

  // Function to format a date string to "dd de MMMM" format with or without the year
  function formatDate(orderDate: string) {
    const date = new Date(orderDate);
    const currentDate = new Date();

    const day = date.toLocaleDateString("es-ES", { day: "2-digit" });
    const month = date.toLocaleDateString("es-ES", { month: "long" });
    const year = date.getFullYear();

    if (year === currentDate.getFullYear()) {
      return `${day} de ${month}`;
    } else {
      return `${day} de ${month} de ${year}`;
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full m-4">
      <div>
        <h3 className="text-2xl font-semibold mb-1.5">Envío</h3>
        <div className="flex gap-16">
          <div>
            <h4 className="font-semibold">Dirección de envío</h4>
            <div>
              <span>{response.address}</span>, <span>{response.location}</span>
            </div>
            <div>{response.region}</div>
            <div>{response.postcode}</div>
          </div>
          <div>
            <h4 className="font-semibold">Información de contacto</h4>
            <div>{response.email}</div>
            <div>
              <span>{response.areaCode}</span> <span>{response.phone}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-1.5">Privacidad</h3>
        <div>
          <h4 className="font-semibold">Información personal</h4>
          <div>
            <span>{response.firstName}</span> <span>{response.lastName}</span>
          </div>
          <div>{formatDate(response.birthday)}</div>
          <div>{response.dni}</div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-1.5">Cuenta</h3>
        <div>
          <div>{response.email}</div>
          <div>******</div>
        </div>
      </div>
      <UpdateUser session={data} />
    </div>
  );
}
