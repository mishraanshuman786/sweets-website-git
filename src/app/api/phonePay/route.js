import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

async function callPhonePey() {
  const transactionId = "MT-" + uuidv4().toString(36).slice(-6);
  const payload = {
    merchantId: "PGTESTPAYUAT91",
    merchantTransactionId: transactionId,
    merchantUserId: "MUID123",
    amount: 10000,
    redirectUrl: `http://localhost:3000/api/status/${transactionId}`,
    redirectMode: "POST",
    callbackUrl: `http://localhost:3000/api/status/${transactionId}`,
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  // encoding the payload
  const datapayload = JSON.stringify(payload);
  const dataBase64 = Buffer.from(datapayload, "utf-8").toString("base64");

  // calculate x-verify/checksum header
  const saltKey = "05992a0b-5254-4f37-86fb-e23bb79ea7e7";
  const fullURL = dataBase64 + "/pg/v1/pay" + saltKey;
  const dataSHa256 = sha256(fullURL);

  const checksum = dataSHa256 + "###1";

  // sending api request
  const UAT_PAY_API_URL = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay`;

  const options = {
    method: "POST",
    url: UAT_PAY_API_URL,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: dataBase64,
    },
  };

  try {
    const response = await axios.request(options);
    console.log("response data:", response.data.data.instrumentResponse.redirectInfo);

    const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
    return redirectUrl;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Data:", data);

    const response = await callPhonePey();
    console.log(response);

    if (response) {
      return NextResponse.json({ status: true, data: response });
    } else {
      return NextResponse.json({ status: false, data: "There is some error in getting the redirect URL." });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ status: false });
  }
}
