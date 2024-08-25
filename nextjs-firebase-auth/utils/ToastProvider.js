import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      draggable: true,
      theme: "colored",
      progress: undefined
    });
  };

  return <ToastContext.Provider value={{ notify }}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);
