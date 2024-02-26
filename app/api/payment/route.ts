import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

import { newOrder } from "@/lib/actions/order.actions";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

const { MERCADOPAGO_ACCESS_TOKEN } = process.env;

export const POST = async (request: NextRequest) => {
  const { data, type } = await request.json();

  try {
    if (type === "payment") {
      const client = new MercadoPagoConfig({
        accessToken: `${MERCADOPAGO_ACCESS_TOKEN}`,
        options: { timeout: 5000 },
      });

      const payment = new Payment(client);

      const body: PaymentResponse = await payment.get({ id: data.id });

      if (!body.additional_info?.items)
        throw new Error("No items found in additional info");

      const order = {
        orderId: body.order?.id?.toString() ?? "",
        date: body.date_approved ?? "",
        status: body.status ?? "",
        installments: body.installments ?? 0,
        reference: body.external_reference ?? "",
        payer: {
          firstName: body.additional_info?.payer?.first_name ?? "",
          lastName: body.additional_info?.payer?.last_name ?? "",
          email: body.payer?.email ?? "",
          identification: body.payer?.identification?.number ?? "",
          phone: {
            areaCode: body.payer?.phone?.area_code ?? "",
            number: body.payer?.phone?.number ?? "",
            extension: body.payer?.phone?.extension ?? "",
          },
        },
        payment: {
          company: body.payment_method?.id ?? "",
          type: body.payment_method?.type ?? "",
        },
        picked: body.additional_info.items.map((item: Items) => ({
          category: item.category_id ?? "",
          description: item.description ?? "",
          sku: item.id ?? "",
          thumbnail: item.picture_url ?? "",
          quantity: item.quantity ?? 0,
          name: item.title ?? "",
          price: item.unit_price ?? 0,
        })),
        transaction: {
          bank: body.transaction_details?.financial_institution ?? "",
          installment: body.transaction_details?.installment_amount ?? 0,
          paid: body.transaction_details?.total_paid_amount ?? 0,
          received: body.transaction_details?.net_received_amount ?? 0,
          overpaid: body.transaction_details?.overpaid_amount ?? 0,
        },
      };

      await newOrder(order);
    }

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create a new order" },
      { status: 500 }
    );
  }
};
