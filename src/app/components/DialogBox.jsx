// components/DialogBox.js

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/styles/DialogBox.module.css'; // Import the CSS module

import { FaCartPlus } from "react-icons/fa";
const DialogBox = ({ title, content, isOpen, onClose }) => {
  const dialogClass = isOpen ? styles.dialogOpen : styles.dialogClosed;

  return (
    <div className={`${styles.overlay} ${dialogClass}`}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2><span><FaCartPlus style={{marginRight:4}}/></span>{title}</h2>
          <button style={{fontSize:40}} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.content} >
          <p style={{color:"black"}}>{content}</p>
        </div>
      </div>
    </div>
  );
};

DialogBox.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogBox;
