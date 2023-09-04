import { payments } from "@/constants";
import Image from "next/image";

export default function PaymentData() {
  return (
    <section className="flex flex-col gap-4 py-4">
      <div className="flex justify-center items-center w-full mx-auto gap-4 max-w-[980px]">
        <Image
          src="/assets/mercadopago.png"
          alt="mercadopago"
          width={56}
          height={56}
        />
        <span>Pagá de forma fácil y rápida con Mercado Pago.</span>
      </div>
      <div className="flex justify-center items-center w-full mb-2 mx-auto gap-8 max-w-[980px]">
        {payments.map((payment) => (
          <div className="flex items-center gap-2 text-sm">
            {payment.icon}
            <span>{payment.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
