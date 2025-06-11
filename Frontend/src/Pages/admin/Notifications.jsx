import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom'; 
import styles from '@styles/Notifications.module.css';

/**
 * Componente Notifications
 * 
 * Página de administración que muestra notificaciones en tiempo real cuando se recibe una nueva solicitud.
 * Utiliza un socket para escuchar eventos 'newRequest' desde el servidor y muestra una notificación animada
 * por cada nueva solicitud recibida. Las notificaciones desaparecen automáticamente después de 5 segundos.
 * Al hacer clic en una notificación, redirige al usuario a la página de solicitudes del dashboard.
 * 
 * @component
 * @returns {JSX.Element} Elemento React que representa el área de notificaciones para el administrador.
 */
const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate(); 
    const port = import.meta.env.VITE_PORT;
    const ipserver = import.meta.env.VITE_IP;

    useEffect(() => {
        const socket = io(`http://${ipserver}:${port}`);

        socket.on('newRequest', (data) => {
            const newNotification = {
                id: Date.now(), 
                nombre: data.nombre,
                email: data.email
            };
            setNotifications((prev) => [...prev, newNotification]);

            // Eliminar la notificación después de 5 segundos
            setTimeout(() => {
                setNotifications((prev) => prev.filter(notification => notification.id !== newNotification.id));
            }, 5000);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleClick = () => {
        navigate('/dashboard-solicitudes');
    };

    return (
        <div>
            {/* Ícono de notificaciones con animación */}
            <div className={`${styles.notificationIcon} ${notifications.length > 0 ? styles.active : ''}`}>
                🔔
            </div>
        {/* Renderiza las notificaciones */}
        {/* {notifications.length > 0 && notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={styles.notification}
                    onClick={handleClick} 
                    style={{ cursor: 'pointer' }} 
                >
                    <div className={styles['notification-icon']}>🔔</div>
                    <div className={styles['notification-content']}>
                        <div className={styles.title}>Nueva solicitud: {notification.nombre}</div>
                        <div className={styles.email}>Correo: {notification.email}</div>
                    </div>
                </div>
            ))} */}
        </div>
    );
};

export default Notifications;
