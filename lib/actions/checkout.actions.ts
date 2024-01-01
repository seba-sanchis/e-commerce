"use server";

import { MercadoPagoConfig, Preference } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";

const { MERCADOPAGO_ACCESS_TOKEN, MERCADOPAGO_URL } = process.env;

// Payment gateway integration (Mercado Pago - Checkout Pro)
export async function newCheckOut(
  params: Items[],
  userId: string,
  email: string,
  dni: string,
  firstName: string,
  lastName: string
) {
  // Add credentials
  const client = new MercadoPagoConfig({
    accessToken: MERCADOPAGO_ACCESS_TOKEN!,
    options: { timeout: 5000 },
  });

  const preference = new Preference(client);

  try {
    const response = await preference.create({
      body: {
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
          name: firstName,
          surname: lastName,
        },
        external_reference: userId,
      },
    });

    return response.init_point!;
  } catch (error: any) {
    throw new Error(`Failed to checkout: ${error.message}`);
  }
}
