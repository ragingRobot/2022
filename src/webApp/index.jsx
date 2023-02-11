import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './app.jsx';

const appRouting = (

  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<App />} />
      </Route>
    </Routes>
  </Router>
);
ReactDOM.render(appRouting, document.getElementById('root'));
