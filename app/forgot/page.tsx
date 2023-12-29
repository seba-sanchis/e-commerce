import { ForgotPassword } from "@/components";

export default function Page() {
  return (
    <section className="flex flex-col flex-1 max-w-[980px] w-full mx-auto pt-14">
      <h1 className="text-3xl font-semibold w-2/3 h-16">
        Restablecé tu contraseña
      </h1>
      <div className="flex">
        <div className="border-r border-secondary-gray w-2/3 pr-10">
          <p>
            Ingresá tu dirección de correo electrónico asociado a tu cuenta para
            continuar.
          </p>

          <ForgotPassword />
        </div>
        <div className="flex w-1/3 pl-10 text-[#6e6e73]">
          <i className="fi fi-rr-circle-user text-6xl"></i>
          <p className="pl-5 text-sm">
            Te enviaremos un enlace a tu correo electrónico para que puedas
            restablecer la contraseña.
          </p>
        </div>
      </div>
    </section>
  );
}
