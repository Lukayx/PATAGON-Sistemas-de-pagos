/**
 * Punto de entrada principal de la aplicación React.
 * 
 * Este archivo importa los módulos necesarios de React y ReactDOM,
 * así como el componente principal `App`. Utiliza el método
 * `createRoot` de ReactDOM para renderizar la aplicación dentro del
 * elemento con id 'root' en el DOM. El componente `App` se envuelve
 * en `React.StrictMode` para ayudar a identificar posibles problemas
 * en la aplicación durante el desarrollo.
 *
 * @file main.jsx
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
