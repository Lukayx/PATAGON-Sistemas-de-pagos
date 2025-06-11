import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Asegúrate de tener esta dependencia instalada
import particleConfig from './config/setup';

// Usa particleConfig donde lo necesites


// Componente que permite el uso de particulas 
/**
 * Componente de fondo de partículas animadas utilizando React y tsParticles.
 * 
 * Este componente renderiza un canvas de partículas como fondo animado,
 * utilizando la configuración proporcionada por `particleConfig`.
 * El canvas se posiciona absolutamente para ocupar toda la pantalla y
 * se sitúa detrás del contenido principal mediante `zIndex`.
 * 
 * @component
 * @example
 * <ParticlesComponent id="particles-bg" />
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - Identificador único para el canvas de partículas.
 * 
 * @returns {JSX.Element} Un div conteniendo el canvas de partículas y el contenido superpuesto.
 */
const ParticlesComponent = React.memo((props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Esta función permite traer la configuración la cual tendrá la página con las particulas
  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => (particleConfig),
    []
  );

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100vh' }}>
      {/* Canvas de partículas */}
      <Particles 
        id={props.id} 
        init={particlesLoaded} 
        options={options} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // Establece un zIndex bajo para estar detrás
        }} 
      />
      {/* Contenido encima del canvas */}
      {/* <h1 style={{ position: 'relative', zIndex: 1, color: "#ffffff" }}>Tu encabezado aquí</h1> */}
      {/* Agrega más contenido si es necesario */}
    </div>
  );
});

export default ParticlesComponent;