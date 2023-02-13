import React from 'react';
import { useNavigate } from 'react-router-dom';
import './app.css';
import Header from './Header';

function App({ children }) {
  window.navigate = useNavigate();
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default App;
