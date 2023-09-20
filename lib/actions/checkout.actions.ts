"use server";

import mercadopago from "mercadopago";

import { PreferenceItem } from "mercadopago/models/preferences/create-payload.model";
import { env } from "@/constants";

const {
  MERCADOPAGO_ACCESS_TOKEN,
  MERCADOPAGO_CLIENT_ID,
  MERCADOPAGO_CLIENT_SECRET,
  MERCADOPAGO_URL,
} = env;

// Payment gateway integration (Mercado Pago - Checkout Pro)
export async function newCheckOut(
  params: PreferenceItem[],
  userId: string,
  email: string,
  dni: number
) {
  // Add credentials
  mercadopago.configure({
    // access_token: MERCADOPAGO_ACCESS_TOKEN!,
    client_id: MERCADOPAGO_CLIENT_ID!,
    client_secret: MERCADOPAGO_CLIENT_SECRET!,
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
    console.log(response.body);
    return response.body;
  } catch (error: any) {
    throw new Error(`Failed to checkout: ${error.message}`);
  }
}
