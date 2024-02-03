import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div>
        <div
        className="fixed-bottom"
        style={{ marginBottom: 80, marginLeft: 1250, width: 100,}}
      >
        {/* WhatsApp content */}
        <Link
          className="show-tool-tip"
          href="https://wa.me/916307010388"
          style={{
            textDecoration: "none",
            display: "block",
            position: "relative",
          }}
          target="_blank"
        >
          <img
            src="/whatsapp.svg"
            alt="whatsapp"
            className="bounce" // Apply the bounce class here
            style={{
              width: 60,
              height: 60,
              color: "green",
              animation: "bounce 1s infinite",
            }} // Apply the bouncing animation
          />
        </Link>
      </div>
      

      {children}
    </div>
  );
};

export default Layout;
