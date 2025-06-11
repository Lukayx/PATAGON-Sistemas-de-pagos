import React, { useState } from "react";
import styles from "./navBarClient.module.css";
import logo from "../../../src/assets/SoloLogo_Patagon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';

/**
 * Componente de barra de navegación para el cliente.
 *
 * Muestra enlaces de navegación condicionalmente según el tipo de usuario autenticado,
 * permitiendo alternar el menú en dispositivos móviles y gestionar la sesión del usuario.
 *
 * @component
 *
 * @example
 * <NavBar />
 *
 * @returns {JSX.Element} Elemento JSX que representa la barra de navegación.
 */
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isActive = (path) => location.pathname === path;
  const token = localStorage.getItem('token');
  let decodedToken;
  if(token){
    decodedToken = jwtDecode(token);
  }
  console.log(decodedToken);
  
  const handleOut = (event) =>{
    event.preventDefault();
    localStorage.removeItem('rol'); // Elimina el rol del localStorage
    localStorage.removeItem('token'); // Elimina el token del localStorage
    localStorage.removeItem('email'); // Elimina el refreshToken del localStorage
    localStorage.removeItem('username'); // Elimina el nombre de usuario del localStorage
    localStorage.removeItem('refreshToken'); // Elimina el refreshToken del localStorage
    window.location.href = event.target.href; // Redirige al usuario a la ruta especificada en el enlace
  };
  return (
    <div className={styles.header}>
      <div className={styles.sectionIzq}>
        <FontAwesomeIcon icon={ faBars } className={styles.logo} id={styles.l1}/>
        <img src={logo} alt="logo" className={styles.logo} id={styles.l2}/>
        <div className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`${styles.navMenu} ${menuOpen ? styles.show : ""}`}>
          <a href="/mainClient" className={isActive("/mainClient") ? styles.active : ""}>
            Home
          </a>

          { token && decodedToken.type === "UACh" ? (
            ''
          ) : (
            <a href="/bags" className={isActive("/bags") ? styles.active : ""}>
              Productos
            </a>
          )}
          <a href="/about-us" className={isActive("/about-us") ? styles.active : ""}>
            Nosotros
          </a>
          <a href="/docs" className={isActive("/docs") ? styles.active : ""}>
            Documentación
          </a>

          { token && (decodedToken.type === "Pagado" || decodedToken.type === "UACh")? (
            ''
          ) : (
          <a href="/patagon/solicitud" className={isActive("/patagon/solicitud") ? styles.active : ""}>
            Solicitud de uso
          </a>
        )}
        </div>
        </div>
        <div className={styles.userDiv}>
          { token ? (
            <>
            <a className={styles.user}>{decodedToken.username ? decodedToken.username  : 'Usuario'}</a>
            <ul>
              <li><a href="/account/profile">Mi Perfil</a></li>
              <li><a href="/account/purchase-history">Historial de compras</a></li>
              <li><a href="/" onClick={ handleOut }>Cerrar sesión</a></li>
            </ul>
            </>
          ) : (
            <a href="/" className={styles.user}>Iniciar sesión</a>
          )
          
          }
          
        </div>
      </div>
  );
};

export default NavBar;
