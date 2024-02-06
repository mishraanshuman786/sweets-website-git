import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import Context from "../context/Context";
import { PaymentProvider } from "@/context/PaymentContext";
import Link from "next/link";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LADDOOSTORY-ONLINE SWEETS",
  description:
    "Hi, laddoo story is a very unique startup venture,laddoo story offers homemade laddu like,Besan laau , Motichoor laddoo , DRYFRUITS LADDOO, flaxseeds laddoo, coconut laddo and many more homemade veriety of products. Hygiene laddoo is a very important thing for us.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>
        <ToastContainer />
        <AuthProvider>
          <div
            className="container-fluid sticky-top small-device"
            style={{
              color: "white",
              backgroundColor: "#761700",
              width:"100%",
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid grey",
              paddingTop: 10,
              position: "fixed",
              zIndex: 100,
            }}
          >
            <p>Powered By NAGINA FOODS</p>
            <span className="headcontent" style={{borderRight: 2, paddingRight: 8, height: 25}}></span>
            <p>Free Delivery Across India on orders above Rs. 999/-</p>
          </div>
          

          <Context>
            <PaymentProvider>

              
              
              {children}

            </PaymentProvider>
            
          </Context>
        </AuthProvider>
      </body>
    </html>
  );
}
