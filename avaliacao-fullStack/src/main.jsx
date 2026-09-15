import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importação obrigatória do SCSS global contendo Box Model e a Responsividade
import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);