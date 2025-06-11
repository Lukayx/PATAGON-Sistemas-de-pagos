import React from "react";
import styles from "./Card.module.css"; // Importa tu archivo de estilos como módulo
import { useNavigate } from "react-router-dom";

/**
 * Componente Card
 * 
 * Muestra una tarjeta con información de un producto, incluyendo nombre, detalles, precio, RAM y duración.
 * Permite navegar a la página de detalles del producto al hacer clic en el botón "Comprar".
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.nombre - Nombre del producto.
 * @param {string|number} props.tiempo - Duración del producto en horas.
 * @param {string[]} props.detalles - Lista de detalles del producto.
 * @param {string|number} props.precio - Precio del producto en USD.
 * @param {string} props.ram - Cantidad de RAM del producto.
 * @param {string} props.delay - Retraso de animación para la tarjeta.
 * @param {string|number} props.ID - Identificador único del producto.
 * 
 * @returns {JSX.Element} Elemento JSX que representa la tarjeta del producto.
 */
const Card = ({ nombre, tiempo, detalles, precio, ram, delay, ID }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/product-details/${ID}`); 
  };
  

  return (
    <div className={styles.bolsaCard} style={{ animationDelay: delay }}>
      <div className={styles.bolsaLeft}>
        <p className={styles.nombre}>{nombre}</p>
        <ul className={styles.bolsaDetails}>
          {detalles.map((detalle, i) => (
            <li key={i}>{detalle}</li>
          ))}
          <br />
          <li>{ram}</li>
        </ul>
      </div>

      <div className={styles.bolsaRight}>
        <div className={styles.headerRight}>
          <p className={styles.tiempo}>{tiempo} horas</p>
          <p className={styles.price}>${precio} USD</p>
        </div>
        <button className={styles.botonCompra} onClick={handleBuyClick}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Card;
