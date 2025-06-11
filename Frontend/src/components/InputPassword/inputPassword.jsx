import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import style from './inputPassword.module.css';

/**
 * Componente de campo de entrada para contraseñas con opción para mostrar/ocultar el valor.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - Identificador único para el input.
 * @param {string} props.label - Etiqueta descriptiva para el campo de contraseña.
 * @param {string} props.value - Valor actual del campo de contraseña.
 * @param {function} props.handleChange - Función que maneja el cambio de valor del input.
 * @param {boolean} props.disabled - Indica si el campo está deshabilitado.
 *
 * @returns {JSX.Element} Elemento JSX que representa un campo de contraseña con icono y botón para mostrar/ocultar.
 */
const InputPassword = ({ id, label, value, handleChange, disabled}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={style.inputGroup}>
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        required
        autoComplete='off'
        disabled={disabled}
      />
      <label htmlFor={id}>{label}</label>
      <FontAwesomeIcon icon={faLock} className={style.faIcon} />
      <button type="button" onClick={toggleShowPassword}>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className={style.ojo} />
      </button>
    </div>
  );
};

export default InputPassword;