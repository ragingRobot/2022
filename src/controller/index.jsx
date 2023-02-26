import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Controller from './Controller';
import './app.css';
const appRouting = (
  <Router>
    <Routes>
      <Route path="/controller" element={<Controller />} />
    </Routes>
  </Router>
);

ReactDOM.render(appRouting, document.getElementById('root'));
