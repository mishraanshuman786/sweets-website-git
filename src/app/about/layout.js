import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <div
        className="fixed-bottom"
        style={{ marginBottom: 100, marginLeft: 1600, width: 100 }}
      >
        {/* WhatsApp content */}
        <a
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
        </a>
      </div>

      {children}
    </div>
  );
};

export default Layout;
