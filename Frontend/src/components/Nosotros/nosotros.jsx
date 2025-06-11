import React from "react";
import styles from "./nosotros.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faLock, faCheckCircle, faBolt, faClock } from "@fortawesome/free-solid-svg-icons";

/**
 * Componente funcional que representa la sección "Nosotros" de la aplicación.
 * 
 * Muestra información sobre la misión, visión, valores y equipo de la empresa,
 * así como las razones para preferir sus servicios en computación de alto rendimiento (HPC).
 * Incluye secciones para destacar la seguridad, confidencialidad, confiabilidad, eficiencia
 * y tiempo de respuesta, además de presentar a los miembros principales del equipo.
 * 
 * @component
 * @returns {JSX.Element} Sección informativa sobre la empresa y su equipo.
 */
const Nosotros = () => {
  return (
      <section className={styles.section2}>
        <div className={styles.header}>
          <h1>NOSOTROS SOMOS</h1>
          <h3>Tu Partner en computacion de alto rendimiento</h3>
        </div>
        <div className={styles.parrafos}>
          <div>
            <h2>Misión y Visión</h2>
            <p>Nuestra Misión es más que ofrecer capacidad computacional: queremos ser tu aliado estratégico en Computación de Alto Rendimiento (HPC). Afrontamos tus desafíos de investigación científica y computación intensiva como si fueran nuestros, ofreciéndote soluciones tecnológicas avanzadas, eficientes y adaptadas a tus necesidades.</p>
            <p>Nuestra Visión es brindar un servicio de excelencia en HPC que permita a investigadores, empresas y organizaciones realizar simulaciones y análisis de gran escala. Queremos que tus proyectos científicos y tecnológicos se desarrollen de manera fluida, eficiente y con resultados de alto impacto.</p>
          </div>
          <div>
            <h2>Por que preferirnos</h2>
            <ul>
              <li>Somos un equipo especializado en computación científica, investigación avanzada y desarrollo tecnológico.</li>
              <li>Estamos comprometidos con el éxito de tus proyectos, brindando asesoría personalizada y recursos de última generación.</li>
              <li>Contamos con experiencia en múltiples disciplinas científicas y sectores industriales.</li>
              <li>Ofrecemos un entorno optimizado para cálculos intensivos, garantizando el máximo rendimiento.</li>
              <li>Trabajamos con planificación detallada y seguimiento constante para asegurar el éxito de cada tarea.</li>
              <li>Respaldamos nuestros servicios con acuerdos claros y un enfoque de colaboración duradero.</li>
            </ul>
          </div>
        </div>
        <section className={styles.trustedPartner}>
          <h1>Un aliado seguro</h1>
          <div className={styles.divTexto}>
            <p>Seremos mucho más que otro recurso técnico en tu equipo. </p>
            <p>Porque hacemos nuestros tus desafíos, nos adaptamos a tus necesidades y te brindamos la seguridad de que tus proyectos de investigación y desarrollo estarán en manos confiables, con el soporte y la tecnología de vanguardia del supercomputador Patagón.</p>
          </div>
        </section>

        <section className={styles.values}>
          <h1>Valores</h1>
          <div className={styles.valueItems}>
            <div>
              <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} /> <p>Seguridad</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faLock} className={styles.icon} /> <p>Confidencialidad</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} /> <p>Confiabilidad</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faBolt} className={styles.icon} /> <p>Eficiencia</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faClock} className={styles.icon} /> <p>Tiempo de respuesta</p>
            </div>
          </div>
        </section>

        <section className={styles.team}>
          <h1>Equipo Patagon</h1>
          <div className={styles.patagonMembers}>
            <div className={styles.member}>
              <img src="/assets/cristobal.png" alt="Cristobal Navarro" />
              <span>Cristobal Navarro</span>
            </div>
            <div className={styles.member}>
              <img src="/assets/felipe.png" alt="Felipe Quezada" />
              <span>Felipe Quezada</span>
            </div>
          </div>
        </section>
      </section>
  );
}

export default Nosotros;