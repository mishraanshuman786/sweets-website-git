import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";

export async function POST(req, res) {
  try {
    const data = await req.formData();
    console.log(data);
    const status = data.get("code");
    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");

    console.log("response received", status);
    console.log(merchantId);
    console.log(transactionId);

    const st =
      `/pg/v1/status/${merchantId}/${transactionId}` +
      "05992a0b-5254-4f37-86fb-e23bb79ea7e7";
    const dataSha256 = sha256(st);

    const checksum =
      dataSha256 + "###1";
    console.log(checksum);

    const options = {
      method: "POST",
      url: `https://apps-uat.phonepe.com/v3/transaction/${merchantId}/${transactionId}/status`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`,
      },
    };

    // Check payment status
    const response = await axios.request(options);
    console.log("response:", response.data.code);

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
