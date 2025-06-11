import React from 'react';
import styles from './docsUser.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faBriefcase, faBook } from '@fortawesome/free-solid-svg-icons';


/**
 * Componente DocsUser
 *
 * Renderiza la sección de documentación para usuarios del supercomputador Patagon.
 * Incluye tarjetas informativas para guiar a los usuarios sobre el uso general,
 * información para externos y recursos para estudiantes.
 *
 * @component
 * @returns {JSX.Element} Elemento principal que contiene la documentación para los usuarios.
 */
const DocsUser = () => {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Documentación</h1>
        <h3>Tu supercomputador distribuido para cálculos de alto rendimiento</h3>
      </div>
      <section className={styles.section1}>
        <div className={styles.card}>
          <div className={styles.background}></div>
          <header>
            <div className={styles.icon}><FontAwesomeIcon icon={faUserGraduate}/></div>
            <h3>Como usarlo</h3>
          </header>
          <p>
            En esta sección podrás encontrar una documentación
            completa de acceso de uso al Supercomputador Patagon.
          </p>
          
            <a href="https://patagon.uach.cl/patagon/tutoriales" className={styles.link} target="_blank" rel="noopener noreferrer">Ver más</a>
          

        </div>

        <div className={styles.card}>
          <div className={styles.background}></div>
          <header>
            <div className={styles.icon}><FontAwesomeIcon icon={faBriefcase} /></div>
            <h3>Externos</h3>
          </header>
          <p>Si eres dueño de una empresa o trabajas en una,
            esta sección te servirá para saber más informacion
            de nuestras normativas de uso con el supercomputador
            Patagon.
          </p>
          
            <a href="/external" className={styles.link}>Ver más</a>
          
        </div>

        <div className={styles.card}>
          <div className={styles.background}></div>
          <header>
            <div className={styles.icon}><FontAwesomeIcon icon={faBook}/></div>
            <h3>Estudiantes</h3>
          </header>
          <p>
            Si eres estudiante o miembro de la Uach, ¡esto es para ti!
            A continuación encontrarás información
            importante diseñada especialmente para
            quienes forman parte del ámbito académico.
          </p>
          
            <a href="/students" className={styles.link}>Ver más</a>
          
        </div>
      </section>
    </main>
  )
}

export default DocsUser;