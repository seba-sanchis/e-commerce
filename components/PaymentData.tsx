import { paymentMethods } from "@/constants";

export default function PaymentData() {
  return (
    <section className="py-4">
      <div className="flex justify-between w-full h-20 max-w-[980px] rounded mx-auto">
        {paymentMethods.map((payment) => (
          <div
            key={payment.name}
            className="flex justify-center items-center gap-4 w-full"
          >
            {payment.icon}
            <span>{payment.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
