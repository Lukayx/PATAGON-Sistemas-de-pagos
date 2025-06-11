import React from "react";
import styles from "./itemUser.module.css";
import { format } from 'date-fns';

/**
 * Componente que representa un ítem de usuario en una lista.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Objeto que contiene la información del usuario.
 * @param {string|number} props.delay - Retraso para la animación de aparición del ítem.
 * @param {Function} props.setShowModal - Función para mostrar el modal de confirmación o información.
 * @param {Function} props.selectUser - Función para seleccionar el usuario actual.
 *
 * @returns {JSX.Element} Elemento visual que muestra la información del usuario, permitiendo acciones como eliminar o ver motivo.
 */
const ItemUser = ({ user, delay, setShowModal, selectUser}) => {
  const [open, setOpen] = React.useState(false);
  let dead = false;
  let formattedDate = '';
  console.log(user);
  if (!user.motivo) {
    if (user.fecha_ingreso !== null) {
      // Calcular días desde el ingreso del usuario
      formattedDate = format(user.fecha_ingreso, 'dd-MM-yyyy');
    }
  } else {
    dead = true;  
  }
  return (
    <div className={`${styles.item}`} style={{ animationDelay: delay }} onClick={ () => {setOpen(!open)}}>
      <div className={styles.itemBackground} ></div>
      {/* <div className={styles.divEllipsisV}>
        <FontAwesomeIcon icon={faEllipsisV} className={styles.icon} />
      </div> */}
      <div className={`${styles.divUsername} ${open ? styles.open : ''}`} onClick={ () => {setOpen(!open)}}>
        <span>{dead ? user.username : user.nombre}</span>
      </div>
      <div className={styles.infoDiv}>
        <span>Email:</span>
        <span>{user.email}</span>
        {!dead && <span>Ultimo registro:</span>}
        {!dead && <span>{formattedDate ? formattedDate : '-'}</span>}
        <button className={`${styles.button}`} onClick={() => { setShowModal(true); selectUser(user) }}> {!dead ? "Eliminar usuario" : "Ver Motivo"} </button>
      </div>
      {/* <a className={styles.hoverText} onClick={() => { setShowModal(true); selectUser(user) }}>{ dead ? "VER MOTIVO" : "ELIMINAR USUARIO"}</a> */}
    </div>
  );
};

export default ItemUser;