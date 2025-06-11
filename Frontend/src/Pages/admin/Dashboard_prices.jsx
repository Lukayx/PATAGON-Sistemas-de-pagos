import React, { useState, useEffect } from "react";
import MenuDashboard from "@components/menuDashboard/menuDashboard";
import styles from "@adminStyles/DashboardPrices.module.css";
import styles1 from "@styles/DashboardGeneral.module.css";
import useExportToExcel from '@hooks/exportExcelRequests';
import logo from '../../assets/SoloLogo_Patagon.png';
import Table from "@components/Table/Table";  // Asegúrate de importar tu componente de tabla

/**
 * Componente Dashboard_prices
 * 
 * Página de administración para gestionar la lista de productos (bolsas) y sus precios.
 * Permite visualizar, eliminar productos y exportar la lista a Excel.
 * 
 * Características principales:
 * - Muestra una tabla con los productos y sus precios.
 * - Permite eliminar productos de la lista.
 * - Incluye un botón para agregar nuevos productos (funcionalidad pendiente).
 * - Permite exportar la lista de productos a un archivo Excel.
 * 
 * Estados:
 * - isOpen: controla la visibilidad del menú lateral.
 * - productList: almacena la lista de productos a mostrar.
 * 
 * Hooks utilizados:
 * - useState: para manejar los estados locales.
 * - useEffect: para cargar los productos de prueba al montar el componente.
 * 
 * Props:
 * - No recibe props directamente.
 * 
 * Dependencias externas:
 * - useExportToExcel: hook personalizado para exportar datos a Excel.
 * - Table: componente para renderizar la tabla de productos.
 * - MenuDashboard: componente para el menú lateral.
 * 
 * @component
 */
const Dashboard_prices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productList, setProductList] = useState([]); // Estado para almacenar los productos
  const { exportToExcel } = useExportToExcel();
  const IP = import.meta.env.VITE_SERVERIP; // IP del servidor desde el archivo .env

  // Fetch product data (Aquí puedes dejarlo vacío para usar los datos de prueba)
  useEffect(() => {
    // Datos de prueba para productos
    const dummyProducts = [
      { id_product: 1, product_name: 'Bolsa A', price: 500 },
      { id_product: 2, product_name: 'Bolsa B', price: 600 },
      { id_product: 3, product_name: 'Bolsa C', price: 750 },
      { id_product: 4, product_name: 'Bolsa D', price: 750 },
    ];

    setProductList(dummyProducts); // Establecer los productos de prueba

    // la parte de la llamada al backend por ahora
    // const fetchProductData = async () => {
    //   try {
    //     const response = await fetch(`${IP}/get-products`);
    //     if (!response.ok) {
    //       throw new Error('Error al obtener los productos');
    //     }
    //     const result = await response.json(); 
    //     setProductList(result); 
    //   } catch (error) {
    //     console.error('Error fetching product data:', error); 
    //   }
    // };

    // fetchProductData();
  }, [IP]);

  // Handle exporting to Excel
  const handleExport = () => {
    exportToExcel(`${IP}/get-products`, 'Lista_de_bolsas');
  };

  // Handle adding a new product (vacío por ahora)
  const handleAddProduct = () => {
    console.log("Agregar nueva bolsa (función vacía por ahora)");
    // Aquí irá la lógica para agregar una nueva bolsa
  };

  // Handle deleting a product
  const handleDeleteProduct = (index) => {
    const updatedProducts = productList.filter((_, idx) => idx !== index);
    setProductList(updatedProducts); // Actualizamos el estado después de eliminar
  };

  // Columnas para la tabla
  const columns = [
    { header: 'ID Producto', accessor: 'id_product' },
    { header: 'Nombre Producto', accessor: 'product_name' },
    { header: 'Precio', accessor: 'price' },
    { header: 'Acción', accessor: 'action' },
  ];

  // Filas para la tabla
  const data = productList?.map((product, index) => ({
    id_product: product.id_product,
    product_name: product.product_name,
    price: product.price,
    action: <button onClick={() => handleDeleteProduct(index)}>Borrar</button>
  }));

  return (
    <div className={styles1.dashboardContainer} id={styles.black}>
      <MenuDashboard toggleMenu={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <main className={`${styles1.content} ${isOpen ? styles1.open : ""}`} id={styles.main}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon} alt="Logo" />
            <h1>Dashboard Precios</h1>
          </div>
        </div>
        
        <div className={styles.CardContainer}>
          <div className={styles.CardGanancias}>
            <div className={styles.CardGananciasTitle}>
              <h2>Lista de Productos</h2>
              <p>Precios y valores de las bolsas</p>
            </div>
            <div className={styles.exportExcel}>
              <button className={styles.excel} onClick={handleExport}>
                <img src="/icons/excel-icon.svg" alt="Exportar" />
                <span>Exportar detalles</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.contenedor}>
          <div className={styles.topProducts}>
            <h2>Bolsas</h2>
            <button className={styles.addProduct} onClick={handleAddProduct}>
              Agregar Bolsa
            </button>
            {/* Aquí se agrega el componente Table */}
            <Table className={styles.tabla} columns={columns} data={data} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard_prices;
