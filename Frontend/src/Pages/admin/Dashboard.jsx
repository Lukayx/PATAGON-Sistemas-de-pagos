import React, { useState } from 'react';
import MenuDashboard from '@components/menuDashboard/menuDashboard.jsx';
import styles from '@adminStyles/Dashboard.module.css';
import styles1 from '@styles/DashboardGeneral.module.css';
import Notification_dashboard from '@components/notificaciones/notificaciones_dashboard.jsx';
import logo from '../../assets/SoloLogo_Patagon.png';
import LinearGraphic from "@components/Graphics/LinearGraphic.jsx";
import CircularGraphic from "@components/Graphics/CircularGraphic.jsx";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaUsers, FaChartLine } from 'react-icons/fa';
import useDashboardStats from '@hooks/useDashboardStats.js';

const InfoCard = ({ title, value, change, icon, onClick }) => (
  <div className={styles.infoCard} onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className={styles.iconContainer}>{icon}</div>
    <div className={styles.textContainer}>
      <h2>{title}</h2>
      <p>{value}</p>
      {change && <span>{change}</span>}
    </div>
  </div>
);

/**
 * Componente principal del panel de administración (Dashboard).
 *
 * Este componente muestra un resumen de estadísticas clave para los administradores,
 * incluyendo ingresos totales, usuarios registrados, solicitudes recibidas y gráficos
 * de actividad reciente. Además, presenta una tabla con la lista de solicitudes recientes.
 *
 * Funcionalidades principales:
 * - Visualización de estadísticas generales y gráficas de los últimos 7 días.
 * - Acceso rápido a secciones específicas mediante tarjetas informativas.
 * - Visualización de notificaciones solo para usuarios con rol de "Administrador".
 * - Navegación a diferentes vistas del panel de administración.
 * - Presentación de una tabla con información relevante de solicitudes.
 *
 * @component
 * @returns {JSX.Element} El componente Dashboard renderizado.
 */
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.rol;
  const { data, loading, error } = useDashboardStats();
  const navigate = useNavigate();

  const labels = data?.sevenDaysStats ? data.sevenDaysStats.map(item => item.date) : [];
  const dataPoints = data?.sevenDaysStats ? data.sevenDaysStats.map(item => item.count) : [];

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />
      <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon} alt="Logo" />
            <h1>Dashboard</h1>
          </div>
          {userRole === 'Administrador' && <Notification_dashboard />}
        </div>

        <div className={styles.cardContainer}>
          <InfoCard 
            title="Total ingresos" 
            value={`$${data?.totalGanancias ?? 0} USD`} 
            change={`+${data?.totalMoneyPayed ?? 0}`} 
            icon={<FaDollarSign />} 
            onClick={() => navigate('/admin/dashboard-profit')}
          />
          <InfoCard 
            title="Usuarios registrados" 
            value={data?.totalUsers ?? 0} 
            icon={<FaUsers />} 
            onClick={() => navigate('/admin/dashboard-users')}
          />
          <InfoCard 
            title="Solicitudes recibidas" 
            value={`${data?.totalRequests ?? 0}`} 
            icon={<FaChartLine />} 
            onClick={() => navigate('/admin/dashboard-requests')}
          />
        </div>

        <div className={styles.graphContainer}>
          <div className={styles.graph1}>
            <LinearGraphic
              labels={labels}
              dataPoints={dataPoints}
              title="Ingresos últimos 7 días"
              color="#0b6730"
            />
          </div>
          <div className={styles.graph2}>
            <CircularGraphic
              labels={['Pagado', 'UACh']}
              dataPoints= {[data?.usersTypePagado ?? 0, data?.usersTypeUach ?? 0]}
              title="Distribución de usuarios"
              colors={['#FF6384', '#36A2EB']}
            />
          </div>
        </div>

        <div className={styles.infoTableContainer}>
          <h3 className={styles.infoTableTitle}>Lista de solicitudes</h3>
          <table className={styles.infoTable}>
            <thead className={styles.infoTableThead}>
              <tr className={styles.infoTableTr}>
                <th className={styles.infoTableTh}>#</th>
                <th className={styles.infoTableTh}>Email</th>
                <th className={styles.infoTableTh}>Estado</th>
                <th className={styles.infoTableTh}>Fecha</th>
                <th className={styles.infoTableTh}>Institución</th>
                <th className={styles.infoTableTh}>Nombre</th>
              </tr>
            </thead>
            <tbody className={styles.infoTableTbody}>
              <tr>
                <td>10</td>
                <td>fernacastillo.perez0607@gmail.com</td>
                <td>Aceptado</td>
                <td>2024-09-19</td>
                <td>UACh</td>
                <td>Fernando Castillo Perez</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
