import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import styles from "@adminStyles/Notifications_Sonner.module.css";
import ProtectedRoute from '@components/ProtectedRoute';
import 'primeicons/primeicons.css'; 
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 

import Login from '@pages/Login';
import Registro from '@pages/Registro';
import NotFound from '@pages/NotFound';
import RetornoPage from '@pages/PurchaseReturn';
import Recovery from '@pages/Recovery';
import PassChange from '@pages/PassChange';

import Dashboard from '@adminPage/Dashboard';
import Dashboard_user from '@adminPage/Dashboard_user';
import Dashboard_profit from '@adminPage/Dashboard_profit';
import Dashboard_prices from '@adminPage/Dashboard_prices';
import Dashboard_admin from '@adminPage/Dashboard_admin';
import Dashboard_requests from '@adminPage/Dashboard_requests';

import MainClient from '@clientPage/main';
import Student from '@clientPage/Student';
import External from '@clientPage/External';
import UsInfo from '@clientPage/UsInfo';
import Bags from '@clientPage/Bags';
import Docs from '@clientPage/Docs';
import UseRequest from '@clientPage/UseRequest';
import Profile from '@clientPage/Profile';
import PurchaseHistory from '@clientPage/PurchaseHistory';
import Privacy from '@clientPage/Privacy';
import Terms from '@clientPage/Terms';
import PurchaseDetails from '@clientPage/PurchaseDetails';




/**
 * Componente principal de la aplicación que define las rutas utilizando React Router.
 *
 * @component
 * @returns {JSX.Element} El árbol de rutas de la aplicación.
 *
 * @description
 * Este componente configura todas las rutas principales de la aplicación, incluyendo rutas públicas y protegidas.
 * Utiliza el componente `ProtectedRoute` para restringir el acceso a ciertas rutas según los roles de usuario.
 * También incluye rutas para autenticación, paneles de administración, información, historial de compras, y manejo de errores 404.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/newPass" element={<PassChange />} />

        <Route path="/dashboard" element={
          <ProtectedRoute isAllowed={["Administrador", "Co-admin"]}>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/dashboard-profit" element={
          <ProtectedRoute isAllowed={["Administrador"]}>
            <Dashboard_profit />
          </ProtectedRoute>
        } />

        <Route path="/dashboard-prices" element={
          <ProtectedRoute isAllowed={["Administrador"]}>
            <Dashboard_prices />
          </ProtectedRoute>
        } />

        <Route path="/admin/dashboard-users" element={
          <ProtectedRoute isAllowed={["Administrador"]}>
            <Dashboard_user />
          </ProtectedRoute>} />

        <Route path="/admin/dashboard-requests" element={
          <ProtectedRoute isAllowed={["Administrador","Revisor"]}>
            <Dashboard_requests />
            <Toaster position="top-right" toastOptions={{className: styles.customToast, duration: 3000,}}/>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/dashboard-roles" element={
          <ProtectedRoute isAllowed={["Administrador"]}>
            <Dashboard_admin />
            <Toaster position="top-right" toastOptions={{className: styles.customToast, duration: 3000,}}/>
          </ProtectedRoute>
        } />

        <Route path="/product-details/:id" element={
          <ProtectedRoute isAllowed={["Cliente"]}>
            <PurchaseDetails />
          </ProtectedRoute>
        } />

        <Route path="/paymentaccept" element={<RetornoPage />} />
        
        <Route path="/mainClient" element={<MainClient />} />

        <Route path="/about-us" element={ <UsInfo />} />

        <Route path="/bags" element={
          <ProtectedRoute isAllowed={["Cliente"]} onlyPaidClients={true}>
            <Bags />
          </ProtectedRoute>
        } />

        <Route path="/docs" element={<Docs />} />

        <Route path="/students" element={<Student/>} />

        <Route path="/external" element={<External />} />

        <Route path="/patagon/solicitud" element={ 
          <>
          <UseRequest />
          <Toaster position="top-right" toastOptions={{className: styles.customToast, duration: 3000,}}/>
          </>
        } />

        <Route path="/account/profile" element={
          <ProtectedRoute isAllowed={["Cliente"]}>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="/account/purchase-history" element={
          <ProtectedRoute isAllowed={["Cliente"]}>
            <PurchaseHistory />
          </ProtectedRoute>
        } />

        <Route path="/privacy" element={<Privacy />} />

        <Route path="/terms" element={ <Terms />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} /> {/* Cualquier otra ruta redirige a 404 */}
      </Routes>
    </Router>
  );
}

export default App;
