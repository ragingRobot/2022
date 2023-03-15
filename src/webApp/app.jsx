import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import './app.less';

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
    <div className="pageContent">
      <Header />
      {children}
    </div>
  );
}

export default App;
