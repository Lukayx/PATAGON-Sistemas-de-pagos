import React from 'react';
import styles from './loginButton.module.css';

/**
 * Botón de inicio de sesión reutilizable.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.text - Texto que se muestra dentro del botón.
 * @param {function} props.onClick - Función que se ejecuta al hacer clic en el botón.
 * @param {boolean} props.disabled - Indica si el botón está deshabilitado.
 * @returns {JSX.Element} Elemento botón personalizado para inicio de sesión.
 */
const LoginButton = ({ text, onClick, disabled }) => {
  return (
    <button className={styles.textButton} type='submit' onClick={onClick} disabled={disabled}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </button>
  );
};

export default LoginButton;