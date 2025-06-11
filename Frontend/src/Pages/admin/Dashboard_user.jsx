import React, { useEffect} from 'react';
import MenuDashboard from '@components/menuDashboard/menuDashboard';
import styles from '@adminStyles/DashboardUser.module.css';
import styles1 from '@styles/DashboardGeneral.module.css';
import ModalUser from '@components/modalUser/modalUser';
import TableComponent from '@components/Table/Table';
import useDashboardUser from '@hooks/useDashboardUser';
import Notification_dashboard from '@components/notificaciones/notificaciones_dashboard';
import logo from '../../assets/SoloLogo_Patagon.png';
import { jwtDecode } from 'jwt-decode';

/**
 * Componente Dashboard_user
 * 
 * Página de administración para la gestión de usuarios en el sistema de pagos.
 * Permite visualizar usuarios activos y eliminados, buscar usuarios, y realizar acciones
 * como eliminar usuarios (solo disponible para el rol "Administrador").
 * 
 * Características principales:
 * - Visualización de usuarios activos y eliminados en tablas diferenciadas.
 * - Búsqueda de usuarios por nombre o email.
 * - Modal para mostrar detalles o confirmar acciones sobre usuarios seleccionados.
 * - Control de acceso a acciones según el rol del usuario autenticado.
 * - Manejo de estados de carga y errores del servidor.
 * 
 * @component
 * @returns {JSX.Element} Página de administración de usuarios.
 */
const Dashboard_user = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.rol;

  const {
    isOpen,
    errors,
    searchText,
    btnActive,
    showModal,
    selectedUser,
    filtredUsers,
    loading, // Obtener el estado de carga
    setIsOpen,
    setShowModal,
    setSelectedUser,
    handleClickBtnUser,
    handleSearchChange,
    handleCloseModal
  } = useDashboardUser();
  
    const handleRowAction = (user) => {
      setSelectedUser(user);
    };
  
  useEffect(() => {
    if (selectedUser) {
      setShowModal(true);
    }
  }, [selectedUser]);

  const columnsUsers = React.useMemo(
    () => [
      { Header: 'Nombre', accessor: 'nombre', id: 'nombre', sortType: 'alphanumeric' },
      { Header: 'Email', accessor: 'email', sortType: 'alphanumeric' },
      { Header: 'Rol', accessor: 'rol' },
      { Header: 'Fecha ingreso', accessor: 'fecha_ingreso' },
      { Header: 'Tipo', accessor: 'type' },
      {
        Header: 'Acciones', accessor: 'acciones',
        Cell: ({ row }) => (
          <div className={styles.actions}>
            {userRole === 'Administrador' ? (
              <button className={styles.btnAccion} onClick={() => handleRowAction(row.original)}>Eliminar</button>
            ) : (
              <span>Sin acciones</span>
            )}
          </div>
        )
      },
    ],
    []
  );

  const columnsDeletedUsers = React.useMemo(
    () => [
      { Header: 'Nombre', accessor: 'username', id: 'nombre', sortType: 'alphanumeric' },
      { Header: 'Email', accessor: 'email', sortType: 'alphanumeric' },
      { Header: 'Motivo', accessor: 'motivo' },
    ],
    []
  );

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />
      {/* <Notifications /> */}
      <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`} id={styles.content}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon} />
            <h1>Dashboard User</h1>
          </div>
          <Notification_dashboard />
        </div>

        {/* Sección búsqueda */}
        <div className={styles.searchSection}>
          <div className={styles.searchFill_container}>
            <input
              type='text'
              placeholder='Buscar usuario... '
              name='search'
              value={searchText}
              onChange={handleSearchChange}
              disabled={loading} // Deshabilitar el input mientras se carga
            />
          </div>
          <div className={styles.sectionBtn}>
            <button className={`${!btnActive ? styles.btnOn : styles.btnOff} ${loading ? styles.btnOff : ''}`}
              onClick={handleClickBtnUser}>
              <span>Usuarios Activos</span>
            </button>
            <button className={`${btnActive ? styles.btnOn : styles.btnOff} ${loading ? styles.btnOff : ''}`}
              onClick={handleClickBtnUser}>
              <span>Usuarios Eliminados</span>
            </button>
          </div>

        </div>
        <section className={styles.userSection}>
          {errors.server && <p className={styles.errorMessage}>{errors.server}</p>}

          {btnActive ? (
            <TableComponent columns={columnsUsers} data={filtredUsers}/>
          ) : (
            <TableComponent columns={columnsDeletedUsers} data={filtredUsers} />
          )}
        </section>
      </main>
      {showModal && <ModalUser closeModal={handleCloseModal} motivo={selectedUser.motivo ? selectedUser.motivo : null} />}
    </div>
  );
};

export default Dashboard_user;