import React, { useState, useEffect } from 'react';
import MenuDashboard from '@components/menuDashboard/menuDashboard';
import styles from '@adminStyles/DashboardRequests.module.css';
import styles1 from '@styles/DashboardGeneral.module.css';
import TableComponent from '@components/Table/Table';
import AcceptRequestModal from '@components/RequestsUsers/AcceptRequestModal';
import RejectRequestModal from '@components/RequestsUsers/RejectRequestModal';
import { fetchRequest } from '@hooks/patagonUserFetch';
import useFileViewer from '@hooks/useFileViewer';
import useExportToExcel from '@hooks/exportExcelRequests';
import useFetchSolicitudes from '@hooks/useDashBoardSolicitudes';
import { jwtDecode } from 'jwt-decode';
import logo from '../../assets/SoloLogo_Patagon.png';
import { toast } from 'sonner';
import refreshAccessToken from '@components/RefreshToken';
import DuplicateUserModal from '@components/DuplicateUsers/DuplicateUserModal';

/**
 * Componente de administración para gestionar las solicitudes de nuevos usuarios.
 * Permite visualizar, filtrar, aceptar, rechazar y exportar solicitudes.
 * 
 * Funcionalidades principales:
 * - Visualización de solicitudes en una tabla con filtros por estado (pendiente, aceptado, rechazado).
 * - Visualización de documentos asociados a cada solicitud (PDF y clave pública).
 * - Aceptación y rechazo de solicitudes mediante modales de confirmación.
 * - Manejo de casos de duplicidad de correo electrónico con modal informativo.
 * - Exportación del historial de solicitudes a Excel.
 * - Navegación hacia el dashboard de usuarios en caso de duplicidad.
 * 
 * Acceso restringido a acciones de aceptación/rechazo según el rol del usuario (Administrador o Co-admin).
 * 
 * @component
 * @returns {JSX.Element} Página de administración de solicitudes.
 */
const Solicitudes = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { solicitudes, loading, error } = useFetchSolicitudes();
    const [filter, setFilter] = useState('pendiente');
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const { exportToExcel } = useExportToExcel();
    const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
    const [duplicateEmail, setDuplicateEmail] = useState('');
    const { viewFile } = useFileViewer();
    const ipserver = import.meta.env.VITE_IP;
    const port = import.meta.env.VITE_PORT;
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.rol;
    const IP = import.meta.env.VITE_SERVERIP;



    const handleViewPDF = async (id) => {
        viewFile(id, 'pdf');
    };

    const handleViewPUB = async (id, nombre) => {
        const key = await viewFile(id, 'pub');
        alert(`Nombre de usuario: ${nombre}\n\nClave pública:\n${key}`);
    };

    const handleAcceptClick = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setIsAcceptModalOpen(true);
    };

    const handleRejectClick = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setIsRejectModalOpen(true);
    };

    const handleAccept = async (formData) => {
        const { success, data, error } = await fetchRequest(
            `${IP}/new-user-creation-patagon`, 'POST', formData
        );

        if (success) {
            window.location.reload();
            toast.success('Solicitud aceptada exitosamente!');
            setIsAcceptModalOpen(false);
        } else {
            if (error === 'El correo ya está registrado') {
                setDuplicateEmail(formData.email);
                setIsDuplicateModalOpen(true);
            } else {
                console.error('Error al aceptar la solicitud:', error);
                toast.error('Error al aceptar la solicitud');
            }
        }
    };


    const handleReject = async (reasonData) => {
        console.log(reasonData);
        const { success, data, error } = await fetchRequest(
            `${IP}/reject-request`, 'POST', reasonData);

        if (success) {
            window.location.reload();
            setIsRejectModalOpen(false);
            toast.success('Solicitud rechazada exitosamente!');
        } else {
            console.error('Error al rechazar la solicitud:', error);
            toast.error('Error al rechazar la solicitud');
        }
    };


    const handleExport = () => {
        exportToExcel(
            `http://${ipserver}:${port}/api/command/requests`,
            'Solicitudes_Historico'
        );
    };

    const handleNavigateToUsers = () => {
        window.location.href = '/admin/dashboard-users';
    };


    const columns = React.useMemo(
        () => [
            { Header: 'Nombre', accessor: 'nombre', id: 'nombre' },
            { Header: 'Email', accessor: 'email' },
            {
                Header: 'Institución',
                accessor: 'institucion',
                Cell: ({ value }) => (
                    <div className={styles.institutionColumn} title={value}>
                        {value}
                    </div>
                ),
            },
            { Header: 'Estado', accessor: 'estado' },
            { Header: 'Fecha', accessor: 'fecha' },
            {
                Header: 'Documentos',
                accessor: 'documentos',
                Cell: ({ row }) => (
                    <div className={styles.files}>
                        <button
                            className={styles.fileButton}
                            onClick={() => handleViewPDF(row.original.ID_request)}
                            title="Solicitud"
                        >
                            <img src="/icons/pdf-icon.svg" alt="Ver PDF" />
                        </button>
                        <button
                            className={styles.fileButton}
                            onClick={() => handleViewPUB(row.original.ID_request, row.original.nombre)}
                            title="Llave pública"
                        >
                            <img src="/icons/pub_icon.svg" alt="Ver PUB" />
                        </button>
                    </div>
                ),
            },
            {
                Header: 'Acciones',
                accessor: 'acciones',
                Cell: ({ row }) => actionsRenderer(row.original),
            }
        ],
        []
    );


    const actionsRenderer = (solicitud) => {
        if (solicitud.estado === 'pendiente') {
            return (
                (userRole === 'Administrador' || userRole === 'Co-admin') && ( // Agrupando correctamente la condición
                    <div className={styles.actionButtonsContainer}>
                        <button
                            className={styles.actionButtonsAccept}
                            onClick={() => handleAcceptClick(solicitud)}
                        >
                            Aceptar
                        </button>
                        <button
                            className={styles.actionButtonsReject}
                            onClick={() => handleRejectClick(solicitud)}
                            title="Rechazar solicitud"
                        >
                            Rechazar
                        </button>
                    </div>
                )
            );
        }

        return 'Sin acciones';
    };


    const filteredSolicitudes = solicitudes.filter(solicitud => {
        switch (filter) {
            case 'pendiente':
                return solicitud.estado === 'pendiente';
            case 'aceptado':
                return solicitud.estado === 'aceptado';
            case 'rechazado':
                return solicitud.estado === 'rechazado';
            default:
                return true;
        }
    });

    return (
        <div className={styles1.dashboardContainer}>
            <MenuDashboard toggleMenu={() => setIsOpen(!isOpen)} isOpen={isOpen} />
            <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`}>
                <div className={styles1.header}>
                    <div className={styles1.titleLogo}>
                        <img src={logo} className={styles1.menuIcon} alt="Logo" />
                        <h1>Dashboard Solicitudes</h1>
                    </div>
                </div>

                <div className={styles.filterButtons}>
                    <button
                        className={filter === 'pendiente' ? styles.active : ''}
                        id={styles.btn}
                        onClick={() => setFilter('pendiente')}
                    >
                        Pendientes
                    </button>
                    <button
                        className={filter === 'aceptado' ? styles.active : ''}
                        id={styles.btn}
                        onClick={() => setFilter('aceptado')}
                    >
                        Aceptadas
                    </button>
                    <button
                        className={filter === 'rechazado' ? styles.active : ''}
                        id={styles.btn}
                        onClick={() => setFilter('rechazado')}
                    >
                        Rechazadas
                    </button>
                </div>

                <button className={styles.excel} onClick={handleExport}>
                    <img src="/icons/excel-icon.svg" alt="Exportar" />
                    Exportar
                </button>

                <div className={styles.solicitudesList}>
                    {loading ? (
                        <div className={styles.spinnerContainer}>
                            <div className={styles.spinner}></div>
                            <p>Cargando solicitudes...</p>
                        </div>
                    ) : filteredSolicitudes.length > 0 ? (
                        <TableComponent
                            key={solicitudes.length}
                            columns={columns}
                            data={filteredSolicitudes}
                        />
                    ) : (
                        <p>No hay solicitudes disponibles.</p>
                    )}
                </div>

                {isAcceptModalOpen && (
                    <AcceptRequestModal
                        isOpen={isAcceptModalOpen}
                        onClose={() => setIsAcceptModalOpen(false)}
                        onAccept={handleAccept}
                        solicitud={selectedSolicitud}
                    />
                )}

                {isRejectModalOpen && (
                    <RejectRequestModal
                        isOpen={isRejectModalOpen}
                        onClose={() => setIsRejectModalOpen(false)}
                        onReject={handleReject}
                        solicitud={selectedSolicitud}
                    />
                )}

                {isDuplicateModalOpen && (
                    <DuplicateUserModal
                        isOpen={isDuplicateModalOpen}
                        onClose={() => setIsDuplicateModalOpen(false)}
                        email={duplicateEmail}
                        onNavigate={handleNavigateToUsers} // Llamada a la función de navegación
                    />
                )}
            </main>
        </div>
    );
};

export default Solicitudes;
