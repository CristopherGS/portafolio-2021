import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nvar from './components/Nvar';
import Abutme from './components/Abutme';

ReactDOM.render(
  <React.StrictMode>
    <Nvar />
    <Abutme />
  </React.StrictMode>,
  document.getElementById('root')
);
ReactDOM.render(
  <React.StrictMode>
    <Abutme />
  </React.StrictMode>,
  document.getElementById('about')
);
