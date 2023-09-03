import { Sidebar } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-grow w-full max-w-[980px] my-8">
      <Sidebar />
      {children}
    </section>
  );
}
