import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    const timeoute = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeoute);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
