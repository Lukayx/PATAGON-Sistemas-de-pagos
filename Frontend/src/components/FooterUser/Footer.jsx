import React from 'react';
import styles from './Footer.module.css'; // Importación del CSS como módulo

/**
 * Componente Footer
 *
 * Renderiza el pie de página del sitio web, incluyendo el logo de la Universidad Austral de Chile,
 * enlaces de navegación (Sobre nosotros, Contacto, Política de privacidad, Términos y condiciones)
 * y un mensaje de derechos reservados.
 *
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el pie de página del usuario.
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <main>

        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            {/* Logo clickeable que redirige a uach.cl */}
            <a href="https://www.uach.cl" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Escudo_uaustralchile.png" alt="Logo UACh" />
            </a>
          </div>
          <div className={styles.footerLinks}>
            <ul>
              <li><a href="/about-us">Sobre nosotros</a></li>
              <li><a href="https://patagon.uach.cl/contacto" target="_blank" rel="noopener noreferrer">Contacto</a></li>
              <li><a href="/privacy">Política de privacidad</a></li>
              <li><a href="/terms">Términos y condiciones</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Universidad Austral de Chile. Todos los derechos reservados.</p>
        </div>
      </main>
    </footer>
  );
}

export default Footer;
