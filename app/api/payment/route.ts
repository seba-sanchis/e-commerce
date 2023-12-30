import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

import { newOrder } from "@/lib/actions/order.actions";
import { Items } from "mercadopago/dist/clients/commonTypes";

const { MERCADOPAGO_ACCESS_TOKEN } = process.env;

export const POST = async (request: NextRequest) => {
  const { data, type } = await request.json();
  console.log("data ->", data);
  console.log("type ->", type);
  try {
    if (type === "payment") {
      const client = new MercadoPagoConfig({
        accessToken: `${MERCADOPAGO_ACCESS_TOKEN}`,
        options: { timeout: 5000 },
      });
      console.log("client ->", client);
      const payment = new Payment(client);
      console.log("payment ->", payment);
      const body = await payment.get({ id: data.id });
      console.log("body ->", body);
      const order = {
        orderId: body.order?.id?.toString(),
        date: body.date_approved,
        status: body.status,
        installments: body.installments,
        reference: body.external_reference,
      };

      const payer = {
        firstName: body.payer?.first_name,
        lastName: body.payer?.last_name,
        email: body.payer?.email,
        identification: body.payer!.identification!.number,
      };

      const paymentMethod = {
        company: body.payment_method?.id,
        type: body.payment_method?.type,
      };

      const phone = {
        areaCode: body.payer?.phone?.area_code,
        number: body.payer?.phone?.number,
        extension: body.payer?.phone?.extension,
      };

      const picked = body.additional_info!.items!.map((item: Items) => ({
        category: item.category_id,
        description: item.description,
        sku: item.id,
        thumbnail: item.picture_url,
        quantity: item.quantity,
        name: item.title,
        price: item.unit_price,
      }));

      const transaction = {
        bank: body.transaction_details?.financial_institution,
        installment: body.transaction_details?.installment_amount,
        paid: body.transaction_details?.total_paid_amount,
        received: body.transaction_details?.net_received_amount,
        overpaid: body.transaction_details?.overpaid_amount,
      };

      await newOrder(order, payer, paymentMethod, phone, picked, transaction);
    }

    return NextResponse.json({ status: 201 });
  } catch (error: any) {
    console.log("Failed to create a new order: ", error.message);

    return NextResponse.json(
      { message: "Failed to create a new order" },
      { status: 500 }
    );
  }
};
