import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";

export async function POST(req, res) {
  try {
    const data = await req.formData();
   
    const status = data.get("code");
    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");

   
    const st =
      `/pg/v1/status/${merchantId}/${transactionId}` +`${process.env.NEXT_SALT_KEY}`;
    const dataSha256 = sha256(st);

    const checksum =
      dataSha256 + "###1";
   

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`,
      },
    };

    // Check payment status
    const response = await axios.request(options);
   

    if (response.data.code === "PAYMENT_SUCCESS") {
      return NextResponse.redirect("https://laddoostory.com/success", {
        status: 301,
      });
    } else {
      return NextResponse.redirect("https://laddoostory.com/failure", {
        status: 301,
      });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.error(error);
  }
}
