import { NextRequest, NextResponse } from "next/server";
import mercadopago from "mercadopago";

export const POST = async (request: NextRequest) => {
  const { data, date_created, type } = await request.json();

  console.log("/api/payment request:", {
    data: data.id,
    date_created: date_created,
    type: type,
  });
  
  try {
    if (type === "payment") {
      const result = await mercadopago.payment.findById(data.id);

      console.log("/api/payment result:", result);
      //pending: need to store in database
    }

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create a new customer" },
      { status: 500 }
    );
  }
};

//  request: {

//   	action: 'payment.created',

//   	api_version: 'v1',

//   	data: { id: '1317514189' },

//   	date_created: '2023-08-30T12:42:24Z',

//   	id: 107293030343,

//   	live_mode: false,

//   	type: 'payment',

//   	user_id: '103268085'

//   	}
