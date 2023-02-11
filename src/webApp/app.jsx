import React from 'react';

import './app.css';
import Header from './Header';

function App({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default App;
