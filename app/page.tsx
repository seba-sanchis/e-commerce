import { Banner, Categories, PaymentData } from "@/components";

export default function Home() {
  return (
    <main className="w-full flex-1 flex flex-col gap-3">
      <Banner />

      <PaymentData />

      <Categories />
    </main>
  );
}
