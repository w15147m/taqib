import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState({
    title: '',
    message: '',
    type: 'info', // 'success' | 'error' | 'info'
    onConfirm: null,
    confirmText: 'Got it'
  });

  const [toastVisible, setToastVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    message: '',
    type: 'success'
  });

  const showAlert = (title, message, type = 'info', onConfirm = null, confirmText = 'Got it') => {
    setConfig({ title, message, type, onConfirm, confirmText });
    setVisible(true);
  };

  const hideAlert = () => {
    setVisible(false);
  };

  const showToast = (message, type = 'success') => {
    setToastConfig({ message, type });
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  return (
    <AlertContext.Provider value={{ 
      showAlert, hideAlert, visible, config,
      showToast, hideToast, toastVisible, toastConfig 
    }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
