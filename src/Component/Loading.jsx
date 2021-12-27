import React from "react";

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{
        position: "fixed",
        top: "0px",
        bottom: "0px",
        height: "100vh",
        background: "rgba(0,0,0,0.8)",
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
