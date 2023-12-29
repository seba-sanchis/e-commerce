import { CardsShelf, Collections, Hero, PaymentMethods } from "@/components";

export default function Home() {
  return (
    <main className="w-full flex-1 flex flex-col gap-3">
      <Hero />

      <PaymentMethods />

      <Collections />

      <CardsShelf />
    </main>
  );
}
