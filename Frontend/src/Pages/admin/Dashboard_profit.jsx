import React, { useState, useEffect, useRef } from "react";
import MenuDashboard from "@components/menuDashboard/menuDashboard";
import styles from "@adminStyles/DashboardProfit.module.css";
import styles1 from "@styles/DashboardGeneral.module.css";
import LinearGraphic from "@components/Graphics/LinearGraphic";
import BarGraphic from "@components/Graphics/BarGraphic";
import useExportToExcel from '@hooks/exportExcelRequests';
import useDashboardStats from "@hooks/useDashboardStatsProfit";
import logo from '../../assets/SoloLogo_Patagon.png';
import * as XLSX from 'xlsx';


/**
 * Componente Dashboard_profit
 * 
 * Página de administración que muestra estadísticas y gráficos relacionados con las ganancias,
 * ingresos y productos vendidos en la plataforma. Permite exportar los datos de transacciones
 * a Excel y visualizar información relevante sobre métodos de pago y ventas recientes.
 * 
 * Características principales:
 * - Visualización de ganancias totales en dólares.
 * - Exportación de detalles de transacciones a un archivo Excel.
 * - Muestra de ingresos diarios, mensuales y anuales (actualmente en $0).
 * - Listado de los productos más vendidos.
 * - Gráficos de barras y líneas para métodos de pago e ingresos en los últimos 3 meses y 7 días.
 * - Expansión de gráficos para una mejor visualización.
 * 
 * Hooks utilizados:
 * - useState: Manejo de estados locales para expansión de gráficos y datos de ingresos.
 * - useRef: Referencias a los contenedores de los gráficos para detectar clics fuera.
 * - useEffect: Obtención de datos de ingresos de los últimos 3 meses y manejo de eventos de clic.
 * 
 * @component
 * @returns {JSX.Element} Página de dashboard de ganancias para el administrador.
 */
const Dashboard_profit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedDiv, setExpandedDiv] = useState(null);
  const divRefs = useRef([]);
  const [labels2, setLabels2] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);
  const { exportToExcel, loading } = useExportToExcel();
  const { data } = useDashboardStats();
  const ip_server = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT;
  const IP = import.meta.env.VITE_SERVERIP;
  

  const labels = data?.weeklyStats ? data.weeklyStats.map(item => item.date) : [];
  const dataPoints = data?.weeklyStats ? data.weeklyStats.map(item => item.count) : [];
  

  useEffect(() => {
    const fetchData3Months = async () => {
      try {
        const response = await fetch(`${IP}/get-users-stats-3months`);
        const result = await response.json();

        const newLabels2 = result.map(item => item.month); 
        const newDataPoints2 = result.map(item => item.count);

        setLabels2(newLabels2);
        setDataPoints2(newDataPoints2);
      } catch (error) {
        console.error('Error fetching 3-month data:', error);
      }
    };

    fetchData3Months();
  }, []);

 

  const handleExpand = (div) => {
    setExpandedDiv(expandedDiv === div ? null : div);
  };

  const handleExport = () => {
    exportToExcel(
      `${IP}/get-ingresos`,
      'Transacciones_Historico'
    );
  };

  const handleClickOutside = (event) => {
    if (expandedDiv && divRefs.current) {
      const isOutsideClick = divRefs.current.every(
        (ref) => ref && !ref.contains(event.target)
      );
      if (isOutsideClick) {
        setExpandedDiv(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [expandedDiv]);

  return (
    <div className={styles1.dashboardContainer} id={styles.black}>
      <MenuDashboard toggleMenu={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <main className={`${styles1.content} ${isOpen ? styles1.open : ""}`} id={styles.main}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon}/>
            <h1>Dashboard Profit</h1>
          </div>
        </div>
        
        <div className={styles.CardContainer}>
          <div className={styles.CardGanancias}>
            <div className={styles.CardGananciasTitle}>
              <h2>Ganancias totales</h2>
              <p>Total de ganancias realizadas en dolares</p>
            </div>
            <div className={styles.CardGananciasValue}>
              <p>${data?.totalGanancias ?? 0}</p>
            </div>
            <div className={styles.exportExcel}>
              <button className={styles.excel} onClick={handleExport}>
                <img src="/icons/excel-icon.svg" alt="Exportar" />
                <span>Exportar detalles</span>
              </button>
            </div>
          </div>
          <div className={styles.CardIngresos}>
            <div className={styles.CardIngresosTitle}>
              <h2>Ingresos</h2>
              <p>Diarios, mensuales y anuales</p>
            </div>
            <div className={styles.CardIngresosValues}>
              <div>
                <p>Diario</p>
                <span>$0</span>
              </div>
              <div>
                <p>Mensual</p>
                <span>$0</span>
              </div>
              <div>
                <p>Anual</p>
                <span>$0</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.containerMethodPayment}>
          <div className={styles.topProducts}>
            <h2>Top productos vendidos</h2>
            <div className={styles.topProductsContainer}>
              {data?.products?.length > 0 ? (
                data.products.map((product, index) => (
                  <div className={styles.topProduct} key={index}>
                    <p>Bolsa: {product.id_product}</p>
                    <p>Total Vendido: {parseInt(product.total_sold, 10)}</p>
                  </div>
                ))
              ) : (
                <p>No hay productos disponibles</p>
              )}
            </div>
          </div>
          <div className={styles.graphicMethodPayment}>
            <BarGraphic
              labels={['PayPal', 'MercadoPago']}
              dataPoints={[data?.paypal ?? 0, data?.mercadopago ?? 0]}
              title="Métodos de pago utilizados"
              color="#0b6730"
            />
          </div>
        </div>

        <div className={styles.contenedor}>
          <div 
            className={`${styles.div1} ${expandedDiv === 'div1' ? styles.expanded : ''}`}
            onClick={() => handleExpand('div1')}
            ref={(el) => (divRefs.current[0] = el)}
          >
            <LinearGraphic
              labels={labels2}
              dataPoints={dataPoints2}
              title="Ingresos últimos 3 meses"
              color="#0b6730"
            />
          </div>
          <div 
            className={`${styles.div2} ${expandedDiv === 'div2' ? styles.expanded : ''}`}
            onClick={() => handleExpand('div2')}
            ref={(el) => (divRefs.current[1] = el)}
          >
            <LinearGraphic
              labels={labels}
              dataPoints={dataPoints}
              title="Ingresos últimos 7 días"
              color="#0b6730"
            />
          </div>
          <div 
            className={`${styles.div3} ${expandedDiv === 'div3' ? styles.expanded : ''}`}
            onClick={() => handleExpand('div3')}
            ref={(el) => (divRefs.current[2] = el)}
          >
            <BarGraphic
              labels={['MercadoPago', 'PayPal']}
              dataPoints={[20, 30]}
              title="Método de pago utilizados"
              color="#0b6730" 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard_profit;
