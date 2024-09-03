import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Toast.css'; // Import your custom CSS file

// Create a context for toast notifications
const ToastContext = createContext();

// Custom hook to use toast context
export const useToast = () => useContext(ToastContext);

// Toast provider component
export const ToastProvider = ({ children }) => {
  // Function to show a toast notification
  const showToast = (message, type, options) => {
    const toastOptions = {
      position: options?.position || "top-center",
      autoClose: options?.autoClose || 5000,
      hideProgressBar: options?.hideProgressBar !== undefined ? options.hideProgressBar : false,
      closeOnClick: options?.closeOnClick !== undefined ? options.closeOnClick : true,
      pauseOnHover: options?.pauseOnHover !== undefined ? options.pauseOnHover : true,
      draggable: options?.draggable !== undefined ? options.draggable : true,
      progress: options?.progress !== undefined ? options.progress : undefined,
    };

    if (type === 'success') {
      toast.success(message, toastOptions);
    } else if (type === 'error') {
      toast.error(message, toastOptions);
    } else if (type === 'confirm') {
      const isConfirmed = window.confirm(message);
      if (isConfirmed) {
        options?.onConfirm?.();
      } else {
        options?.onCancel?.();
      }
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastContainer className="custom-toast-container" />
      {children}
    </ToastContext.Provider>
  );
};
