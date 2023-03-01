import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './app.css';
import Header from './Header';

function App({ children }) {
  const location = useLocation();
  window.navigate = useNavigate();

  useEffect(() => {
    window.pathname = location.pathname;
    if (window.changeHandler) {
      window.changeHandler(location);
    }
  }, [location]);

  return (
    <div className={"pageContent " + location.pathname.replace('/','')}>
      <Header />
      {children}
    </div>
  );
}

export default App;