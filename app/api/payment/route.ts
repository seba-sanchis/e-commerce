import { NextRequest, NextResponse } from "next/server";
import mercadopago from "mercadopago";
import { newOrder } from "@/lib/actions";
import { PreferenceItem } from "mercadopago/models/preferences/create-payload.model";

export const POST = async (request: NextRequest) => {
  const { data, type } = await request.json();

  try {
    if (type === "payment") {
      const { body } = await mercadopago.payment.findById(data.id);

      const pickedItems = body.additional_info.items.map((item: PreferenceItem) => ({
        category: item.category_id,
        description: item.description,
        sku: item.id,
        thumbnail: item.picture_url,
        quantity: item.quantity,
        name: item.title,
        price: item.unit_price,
      }));

      const order = {
        orderId: body.order.id,
        date: body.date_approved,
        status: body.status,
        picked: pickedItems,
        payment: {
          company: body.payment_method.id,
          type: body.payment_method.type,
        },
        installments: body.installments,
        transaction: {
          bank: body.transaction_details.financial_institution,
          installment: body.transaction_details.installment_amount,
          paid: body.transaction_details.total_paid_amount,
          received: body.transaction_details.net_received_amount,
          overpaid: body.transaction_details.overpaid_amount,
        },
        payer: {
          firstName: body.payer.first_name,
          lastName: body.payer.last_name,
          email: body.payer.email,
          identification: body.payer.identification.number,
          phone: {
            areaCode: body.payer.phone.area_code,
            number: body.payer.phone.number,
            extension: body.payer.phone.extension,
          },
        },
        reference: body.external_reference,
      };

      // console.log("/api/payment order:", order);

      await newOrder(order);
    }

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create a new customer" },
      { status: 500 }
    );
  }
};
