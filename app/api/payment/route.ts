import { NextRequest, NextResponse } from "next/server";
import mercadopago from "mercadopago";

export const POST = async (request: NextRequest) => {
  const data = await request.json();

  console.log("/api/payment request:", data);

  const { query } = await request.json();
  
  console.log("/api/payment query:", query);
  try {
    if (query.type === "payment") {
      const data = await mercadopago.payment.findById(query["data.id"]);

      console.log("/api/payment data:", data);
      //pending: need to store in database
    }

    return NextResponse.json({ status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create a new customer" },
      { status: 500 }
    );
  }
};
