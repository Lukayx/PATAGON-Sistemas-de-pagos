import React from 'react';
import styles from '@styles/notfound.module.css';
import ParticlesBG from "@components/Particles/ParticlesBG";
import { jwtDecode } from 'jwt-decode';

/**
 * Componente de página "No Encontrada" (404).
 * 
 * Muestra un mensaje de error cuando el usuario intenta acceder a una página inexistente
 * o sin los permisos necesarios. Según el rol del usuario autenticado, redirige al
 * dashboard correspondiente o a la página principal del cliente.
 *
 * @component
 * @returns {JSX.Element} Página de error 404 con opción de redirección según el rol del usuario.
 */
const NotFound = () => {
  const token = localStorage.getItem('token');
  let decodedToken, userRole;
  
  if (token) {
    decodedToken = jwtDecode(token);
    userRole = decodedToken.rol;
  }


  const redirectTo = ['Administrador', 'Revisor', 'Co-admin'].includes(userRole) ? '/dashboard' : '/mainClient';

  return (
    <>
      <ParticlesBG />
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.icon}>🔒</div> {/* Puedes cambiar el icono por algo similar a GitHub */}
          <h1 className={styles.title}>404 - Página No Encontrada</h1>
          <p className={styles.message}>
            No tienes permiso para acceder a esta página o la página no existe.
          </p>
          {/* El enlace redirige según el rol del usuario */}
          <a href={redirectTo} className={styles.button}>Volver al Inicio</a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
