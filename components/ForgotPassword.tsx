"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [emailSent, setEmailSent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // nodemailer module

    setEmailSent("¡Correo enviado con éxito!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <div className="w-80 h-20">
        <input
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="input border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
        />
        {emailSent && (
          <div className="flex items-center mt-2 text-xs text-primary-green">
            <i className="fi fi-rr-check-circle flex items-center mx-1"></i>
            <span>{emailSent}</span>
          </div>
        )}
      </div>
      <button className="button">Restablecer</button>
    </form>
  );
}
