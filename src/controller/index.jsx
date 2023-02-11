import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Switcher from './Switcher';

const appRouting = (
  <Router>
    <Routes>
      <Route path="/controller" element={<Switcher />} />
    </Routes>
  </Router>
);

ReactDOM.render(appRouting, document.getElementById('root'));
