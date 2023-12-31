import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import Context from "../context/Context";
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LADDOOSTORY-ONLINE SWEETS",
  description: "Hi, laddoo story is a very unique startup venture,laddoo story offers homemade laddu like,Besan laau , Motichoor laddoo , DRYFRUITS LADDOO, flaxseeds laddoo, coconut laddo and many more homemade veriety of products. Hygiene laddoo is a very important thing for us.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>
        <AuthProvider>
          <div
            className="container-fluid sticky-top small-device"
            style={{
              color: "white",
              backgroundColor: "#761700",
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid grey",
              paddingTop: 10,
              position:"fixed",
              zIndex:100
            }}
          >
            <p>Free Delivery Available Over All India After 999. Rs Shopping.</p>
          </div>
        
          <Context>
            <div className="fixed-bottom" style={{ marginBottom: 90, marginLeft: 30,width:100 }}>
              <Link
                className="show-tool-tip"
                href="https://wa.me/916307010388"
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                {/* <div
                  className="whatsapp"
                  style={{
                    width: 200,
                    color: "white",
                    backgroundColor: "green",
                    fontSize: 15,
                    borderRadius: 6,
                    padding: 10,
                    animation: "bounce 1s infinite", // Apply the bouncing animation
                  }}
                >
                  <p>If you want Customized Product.</p>
                  <p>Chat With Us To Get Customized Products.</p>
                </div> */}

                <img src="/whatsapp.svg" alt="whatsapp"
                  className="bounce" // Apply the bounce class here
                  style={{ width: 80, height: 80, color: "green", animation: "bounce 1s infinite" }} // Apply the bouncing animation
                />
              </Link>
            </div>
            {children}
          </Context>
        </AuthProvider>
       
      </body>
    </html>
  );
}

