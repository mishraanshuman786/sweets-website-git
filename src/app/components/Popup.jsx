import React from "react";
import popupstyles from "./styles/Popup.module.css";
const Popup = ({ title, content, onClose }) => {
  return (
    <div className={popupstyles.popupContainer}>
      <div className={popupstyles.popup}>
        <div className={popupstyles.popupHeader}>
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={popupstyles.popupContent}>
          <div
            className="h5 mt-3 text-left container-fluid"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className={popupstyles.popupFooter}>
          <button className={popupstyles.closeBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
