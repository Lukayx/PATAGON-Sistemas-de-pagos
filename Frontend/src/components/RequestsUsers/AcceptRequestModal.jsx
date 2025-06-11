import React, { useState, useEffect } from 'react';
import styles from '../RequestsUsers/AcceptRequestModal.module.css';

/**
 * Modal para aceptar una solicitud de usuario.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {function} props.onAccept - Función que se llama al aceptar la solicitud, recibe los datos del formulario.
 * @param {Object} props.solicitud - Objeto con los datos de la solicitud a aceptar.
 * @param {string} props.solicitud.nombre - Nombre completo del solicitante.
 * @param {string} props.solicitud.email - Email del solicitante.
 * @param {number|string} props.solicitud.ID_request - ID de la solicitud.
 *
 * @returns {JSX.Element|null} El modal de aceptación de solicitud o null si no está abierto.
 */
const AcceptRequestModal = ({ isOpen, onClose, onAccept, solicitud }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    account: '',
    type: '',
    email: solicitud.email,
    requestId: solicitud.ID_request,
  });

  // Establecer el nombre y apellido automáticamente al abrir el modal
  useEffect(() => {
    if (solicitud.nombre) {
      const [nombre, ...apellidoArray] = solicitud.nombre.split(' ');
      const apellido = apellidoArray.join(' '); // Juntar el resto como apellido
      setFormData((prev) => ({
        ...prev,
        nombre: nombre || '',
        apellido: apellido || '',
      }));
    }
  }, [solicitud]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onAccept(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Aceptar Solicitud: {solicitud.nombre}</h3>
        <form>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Account:
            <select
              name="account"
              className={styles.select}
              value={formData.account}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="Uach">Uach</option>
              <option value="Externo">Externo</option>
              <option value="otra">otra</option>
            </select>
          </label>
          <label>
            Usuario:
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="Pagado">Pagado</option>
              <option value="Uach">Uach</option>
            </select>
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

export default AcceptRequestModal;
