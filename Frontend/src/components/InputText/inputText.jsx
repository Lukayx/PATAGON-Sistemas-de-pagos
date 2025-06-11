import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './inputText.module.css';


/**
 * Componente de campo de texto personalizado con etiqueta y un icono.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - Identificador único para el input y la etiqueta.
 * @param {string} props.label - Texto de la etiqueta asociada al input.
 * @param {function} props.handleChange - Función que se ejecuta al cambiar el valor del input.
 * @param {string} props.value - Valor actual del input.
 * @param {IconProp} props.icon - Icono de FontAwesome a mostrar junto al input.
 * @param {boolean} [props.disabled] - Indica si el input está deshabilitado.
 */
const InputText = ({ id, label, handleChange, value, icon, disabled}) => {
  return (
    <div className={style.inputGroup}>
      <input type='text' id={id} name={id} autoComplete='off' value={value} required onChange={handleChange} disabled={disabled}/>
      <label htmlFor={id}>{label}</label>
      <FontAwesomeIcon icon={icon} className={style.faIcon}/>
    </div>
  );
};

export default InputText;