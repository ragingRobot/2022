import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './app.jsx';
import Art from './Art/index.jsx';
import Contact from './Contact/index.jsx';
import Home from './Home/index.jsx';
import Resume from './Resume/index.jsx';
import Software from './Software/index.jsx';

const appRouting = (
  <Router>
    <App>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/art" element={<Art />} />
        <Route path="/software" element={<Software />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </App>
  </Router>
);
ReactDOM.render(appRouting, document.getElementById('root'));
