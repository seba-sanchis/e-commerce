"use server";

import User from "@/models/user";
import { Sessions } from "@/types";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { getServerSession } from "next-auth";
import { connectToDB } from "../database";
import { authOptions } from "../options";

const { MERCADOPAGO_ACCESS_TOKEN, MERCADOPAGO_URL } = process.env;

// Payment gateway integration (Mercado Pago - Checkout Pro)
export async function newCheckOut(items: Items[]) {
  // Add credentials
  const client = new MercadoPagoConfig({
    accessToken: MERCADOPAGO_ACCESS_TOKEN!,
    options: { timeout: 5000 },
  });

  const preference = new Preference(client);

  try {
    const session = (await getServerSession(authOptions)) as Sessions;

    await connectToDB();

    // Find the user by ID
    const currentUser = await User.findById(session.user?.id);

    if (!currentUser) {
      throw new Error("User not found");
    }

    const response = await preference.create({
      body: {
        items,
        notification_url: `${MERCADOPAGO_URL}/api/payment`,
        back_urls: {
          failure: `${MERCADOPAGO_URL}/bag`,
          pending: `${MERCADOPAGO_URL}/profile/orders`,
          success: `${MERCADOPAGO_URL}/profile/orders`,
        },
        payer: {
          email: currentUser.email,
          identification: { type: "DNI", number: `${currentUser.dni}` },
          name: currentUser.firstName,
          surname: currentUser.lastName,
        },
        external_reference: currentUser._id,
      },
    });

    return response.init_point;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to checkout: ${error.message}`);
    }
  }
}
