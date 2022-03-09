import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/index.css';
import './assets/stylesheets/dashboard.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
