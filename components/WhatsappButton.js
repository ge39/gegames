// components/WhatsappButton.js

import React from 'react';

const WhatsappButton = ({ phone = "5511975145360", message = "Olá, Deixe um comentário,Sugestão ou solicite senha para os Games Eróticos!" }) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <p>
      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          textDecoration: "none",
          backgroundColor: "#25D366",
          color: "#fafafa",
          padding: "8px 12px",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "16px",
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 0 10px #FFD700, 0 0 20px #FF0000';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = 'none';
          e.target.style.transform = 'scale(1)';
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          width="20"
          height="20"
          style={{ marginRight: "8px" }}
        >
          <path d="M16 .396c-8.837 0-16 7.163-16 16 0 2.837.744 5.555 2.157 7.957L0 32l7.828-2.048C10.32 31.184 13.125 32 16 32c8.837 0 16-7.163 16-16S24.837.396 16 .396zm0 29.268c-2.573 0-5.095-.67-7.305-1.936l-.523-.31-4.645 1.215 1.24-4.516-.34-.552A13.13 13.13 0 012.874 16c0-7.23 5.896-13.127 13.126-13.127S29.126 8.77 29.126 16 23.23 29.664 16 29.664zm7.273-9.71c-.398-.2-2.352-1.16-2.716-1.294-.364-.134-.63-.2-.897.2-.267.4-1.03 1.293-1.263 1.56-.233.267-.466.3-.864.1-.398-.2-1.683-.62-3.205-1.977-1.184-1.057-1.984-2.36-2.217-2.76-.233-.4-.025-.617.175-.816.18-.18.4-.466.6-.7.2-.233.267-.4.4-.664.134-.267.067-.5-.033-.7-.1-.2-.897-2.163-1.23-2.963-.324-.78-.652-.67-.897-.682l-.766-.015c-.233 0-.6.084-.916.4s-1.2 1.172-1.2 2.855 1.23 3.308 1.4 3.535c.167.233 2.417 3.692 5.855 5.175.818.353 1.456.564 1.955.723.82.26 1.567.223 2.156.135.658-.098 2.352-.96 2.683-1.885.33-.924.33-1.715.23-1.885-.1-.17-.365-.267-.764-.467z" />
        </svg>
        Fale Conosco
      </a>
    </p>
  );
};

export default WhatsappButton;
