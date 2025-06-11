import React from 'react';
import styles from './DashboardSolicitudes.module.css';

/**
 * Componente que muestra una lista paginada de solicitudes.
 *
 * @component
 * @param {Object[]} solicitudes - Arreglo de objetos de solicitudes a mostrar.
 * @param {function} mostrarPDF - Función para mostrar el PDF de una solicitud. Recibe la URL del PDF y el índice de la solicitud.
 * @param {number} currentPage - Número de la página actual.
 * @param {number} totalPages - Número total de páginas disponibles.
 * @param {function} goToPreviousSolicitudesPage - Función para ir a la página anterior de solicitudes.
 * @param {function} goToNextSolicitudesPage - Función para ir a la página siguiente de solicitudes.
 *
 * @returns {JSX.Element} Un componente que renderiza la lista de solicitudes con paginación y botones para ver los PDFs asociados.
 */
const SolicitudesList = ({ solicitudes, mostrarPDF, currentPage, totalPages, goToPreviousSolicitudesPage, goToNextSolicitudesPage }) => {
  const solicitudesPerPage = 5;
  const indexOfLastSolicitud = currentPage * solicitudesPerPage;
  const indexOfFirstSolicitud = indexOfLastSolicitud - solicitudesPerPage;
  const currentSolicitudes = solicitudes.slice(indexOfFirstSolicitud, indexOfLastSolicitud);

  return (
    <div>
      {/* Lista de solicitudes con paginación */}
      <div className={styles.solicitudesList}>
        {currentSolicitudes.map((solicitud, index) => (
          <div className={styles.solicitudItem} key={index}>
            <span>{solicitud.username}</span>
            <span>{solicitud.email}</span>
            <span>{solicitud.archivo}</span>
            <span>{solicitud.fecha}</span>
            <button className={styles.verPdfBtn} onClick={() => mostrarPDF(solicitud.pdfUrl, index)}>
              Ver Solicitud
            </button>
          </div>
        ))}
      </div>

      {/* Botones de paginación */}
      <div className={styles.pagination}>
        <button onClick={goToPreviousSolicitudesPage} disabled={currentPage === 1}>
          -
        </button>
        <button onClick={goToNextSolicitudesPage} disabled={currentPage === totalPages}>
          +
        </button>
        <span className={styles.pageCount}>Página {currentPage} de {totalPages}</span>
      </div>
    </div>
  );
};

export default SolicitudesList;
