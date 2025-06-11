import React, { useState } from 'react';
import styles from '../RequestsUsers/AcceptRequestModal.module.css';

/**
 * Modal para rechazar una solicitud de usuario.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Function} props.onReject - Función que se llama al rechazar la solicitud. Recibe un objeto con el motivo, ID de la solicitud, nombre y email.
 * @param {Object} props.solicitud - Objeto con los datos de la solicitud.
 * @param {number|string} props.solicitud.ID_request - ID de la solicitud.
 * @param {string} props.solicitud.nombre - Nombre del usuario que realizó la solicitud.
 * @param {string} props.solicitud.email - Email del usuario que realizó la solicitud.
 *
 * @returns {JSX.Element|null} El modal de rechazo de solicitud, o null si no está abierto.
 */
const RejectRequestModal = ({ isOpen, onClose, onReject, solicitud }) => {
  const [reason, setReason] = useState('');

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    onReject({ reason, requestId: solicitud.ID_request, nombre: solicitud.nombre, email: solicitud.email });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Rechazar Solicitud: {solicitud.nombre}</h3>
        <form>
          <label>
            Motivo del Rechazo:
            <textarea
              name="reason"
              value={reason}
              onChange={handleReasonChange}
              placeholder="Ingrese el motivo del rechazo..."
            />
          </label>
          
          <div className={styles.modalActions}>
            <button type="button" onClick={handleSubmit}>
              Enviar
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectRequestModal;
