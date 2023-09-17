"use server";

import mercadopago from "mercadopago";

import { PreferenceItem } from "mercadopago/models/preferences/create-payload.model";
import { env } from "@/constants";

const { MERCADOPAGO_TOKEN, MERCADOPAGO_URL } = env;

// Payment gateway integration (Mercado Pago - Checkout Pro)
export async function newCheckOut(
  params: PreferenceItem[],
  userId: string,
  email: string,
  dni: number
) {
  console.log("MERCADOPAGO_TOKEN", MERCADOPAGO_TOKEN);
  // Agrega credenciales
  mercadopago.configure({
    access_token: MERCADOPAGO_TOKEN!,
  });

  try {
    const response = await mercadopago.preferences.create({
      items: params,
      notification_url: `${MERCADOPAGO_URL}/api/payment`,
      back_urls: {
        failure: `${MERCADOPAGO_URL}/bag`,
        pending: `${MERCADOPAGO_URL}/profile/orders`,
        success: `${MERCADOPAGO_URL}/profile/orders`,
      },
      payer: {
        email: email,
        identification: { type: "DNI", number: `${dni}` },
      },
      external_reference: userId,
    });

    return response.body;
  } catch (error: any) {
    throw new Error(`Failed to checkout: ${error.message}`);
  }
}
