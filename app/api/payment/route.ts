import { NextRequest, NextResponse } from "next/server";
import mercadopago from "mercadopago";

export const POST = async (request: NextRequest) => {
  const { data, type } = await request.json();

  try {
    if (type === "payment") {
      const { body } = await mercadopago.payment.findById(data.id);

      console.log("/api/payment body:", {
        orderid: body.order.id, // "11427418621"
        date: body.date_approved, // "2023-08-30T10:19:34.892-04:00"
        status: body.status, // "approved"
        description: body.description, // "Bomba BAP para piscina"
        items: body.additional_info.items, // [Array]
        payment: {
          id: body.payment_method.id, // "visa"
          type: body.payment_method.type, // "credit_card"
        },
        id: body.id, // 1317515789
        installments: body.installments, // 1
        transaction: {
          bank: body.transaction_details.financial_institution, // 50
          installment: body.transaction_details.installment_amount, // 50
          paid: body.transaction_details.total_paid_amount, // 50
          received: body.transaction_details.net_received_amount, // 47.95
          overpaid: body.transaction_details.overpaid_amount, // 0
        },
        payer: {
          firstName: body.payer.first_name, // null
          lastName: body.payer.last_name, // null
          email: body.payer.email, // "test_user_80507629@testuser.com"
          identification: body.payer.identification, // [Object]
          phone: body.payer.phone, // [Object]
          type: body.payer.type, // null
          entity_type: body.payer.entity_type, // null
          id: body.payer.id, // "192180541"
        },
      });
    }

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create a new customer" },
      { status: 500 }
    );
  }
};
