import React from 'react';
import styles from './DuplicateUserModal.module.css';

/**
 * Modal que muestra un mensaje cuando se detecta un usuario duplicado por correo electrónico.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto o cerrado.
 * @param {function} props.onClose - Función que se ejecuta al cerrar el modal.
 * @param {string} props.email - Correo electrónico del usuario duplicado.
 * @param {function} props.onNavigate - Función que se ejecuta al navegar a la sección de usuarios.
 * @returns {JSX.Element|null} El modal de usuario duplicado o null si no está abierto.
 */
const DuplicateUserModal = ({ isOpen, onClose, email, onNavigate }) => {
  if (!isOpen) return null; // Si no está abierto, retorna null
  return (
      <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
              <h2>Usuario ya registrado</h2>
              <p>
                  El usuario con el correo <strong>{email}</strong> ya existe. 
                  Por favor, elimina el usuario antes de aceptar.
              </p>
              <div className={styles.buttons}>
                  <button onClick={onNavigate} className={styles.navigateButton}>
                      Ir a Usuarios
                  </button>
                  <button onClick={onClose} className={styles.closeButton}>
                      Cerrar
                  </button>
              </div>
          </div>
      </div>
  );
};


export default DuplicateUserModal;
