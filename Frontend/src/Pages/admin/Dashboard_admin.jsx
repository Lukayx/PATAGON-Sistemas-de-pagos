import React, { useState, useEffect } from 'react';
import MenuDashboard from '@components/menuDashboard/menuDashboard';
import styles from '@adminStyles/DashboardAdmin.module.css';
import styles1 from '@styles/DashboardGeneral.module.css'; 
import Notification_dashboard from '@components/notificaciones/notificaciones_dashboard.jsx';
import RefreshAccessToken from '@components/RefreshToken.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import TableComponent from '@components/Table/Table';
import logo from '../../assets/SoloLogo_Patagon.png';
import { toast} from 'sonner';

/**
 * Componente Dashboard para la administración de usuarios con rol de administrador.
 *
 * Este componente permite visualizar, crear y eliminar administradores dentro del sistema.
 * Incluye funcionalidades como:
 * - Listado de administradores existentes.
 * - Creación de nuevos administradores mediante un formulario modal.
 * - Generación automática de contraseñas seguras.
 * - Eliminación de administradores con confirmación.
 * - Visualización de los permisos asociados a cada rol (Admin, Co-admin, Revisor).
 *
 * Utiliza hooks de React para el manejo de estado y efectos secundarios, y realiza peticiones
 * a la API para la gestión de usuarios administradores.
 *
 * @component
 * @returns {JSX.Element} Interfaz de administración de usuarios con roles administrativos.
 */
const Dashboard = () => {
  const initialData = {
    nombre: "",
    email: "",
    password: "",
    rol: "Admin",
  };
  const [form, setForm] = useState(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [admins, setAdmins] = useState([]);
  const port = import.meta.env.VITE_PORT;
  const ipserver = import.meta.env.VITE_IP;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://${ipserver}:${port}/api/command/get-admins-role`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrors({ server: data.error });
        } else {
          setAdmins(data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrors({ server: 'Error en la solicitud: ' + error.message });
      });
  }, []);

  const generatePassword = (e) => {
    e.preventDefault();
    const length = Math.floor(Math.random() * (27 - 12 + 1)) + 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setForm({ ...form, password: password });
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Nombre', accessor: 'nombre', id: 'nombre', sortType: 'alphanumeric' },
      { Header: 'Email', accessor: 'email', sortType: 'alphanumeric' },
      { Header: 'Rol', accessor: 'rol' },
      { Header: 'Fecha ingreso', accessor: 'fecha_ingreso' },
      {
        Header: 'Acciones', accessor: 'acciones',
        Cell: ({ row }) => (
          <div className={styles.actions}>
            <button onClick={() => handleDeleteUser(row.original.email)} className={styles.btnEliminar}>Eliminar</button>
          </div>
        )        
      },
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const token = localStorage.getItem('token');
    fetch(`http://${ipserver}:${port}/api/command/insert-user-role`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(form),
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.error) {
          setErrors({ server: data.error });
          alert(data.error);
        } else {
          console.log(data);
          window.location.reload();
          toast.success('Usuario creado exitosamente!');
          setModal(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrors({ server: 'Error en la solicitud: ' + error.message });
      });
  };

  const handleDeleteUser = async (email) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmed) return;
    fetch(`http://${ipserver}:${port}/api/command/delete-admins-roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email: email })
    })
    .then((response) => {
      if (response.ok) {
        console.log('Solicitud enviada exitosamente');
        window.location.reload();
        toast.success('Usuario eliminado exitosamente!');
        return response.json();
      } else {
        console.error('Error al eliminar el usuario:', response.statusText);
        setErrors({ server: 'Error en la solicitud: ' + response.statusText });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setErrors({ server: 'Error en la solicitud: ' + error.message });
    });
  };

  const renderPermissions = () => {
    if (form.rol === "Admin") {
      return (
        <ul className={styles.descripcionRol}>
          <li>Ver, aceptar o rechazar solicitudes.</li>
          <li>Crear admins y ver ganancias.</li>
          <li>Ver usuario o eliminarlo.</li>
        </ul>
      );
    } else if (form.rol === "Co-admin") {
      return (
        <ul className={styles.descripcionRol}>
          <li>Ver, aceptar o rechazar solicitudes.</li>
          <li>Ver usuario pero no eliminarlo.</li>
          <li>Ver ganancias.</li>
        </ul>
      );
    } else if (form.rol === "Revisor") {
      return (
        <ul className={styles.descripcionRol}>
          <li>Solo ver solicitudes.</li>
        </ul>
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => { setIsOpen(!isOpen) }} isOpen={isOpen} />

      <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon} />
            <h1>Dashboard Admin</h1>
          </div>
          <Notification_dashboard />
        </div>
        <div className={styles.titleSectionAdmins}>
          <h1>Administradores</h1>
          <button className={styles.btnCrear} onClick={() => { setModal(true) }}>
            <FontAwesomeIcon icon={faUserPlus} className={styles.iconUser} />
            <span>Crear administrador</span>
          </button>
        </div>
      
          <TableComponent columns={columns} data={admins} />
      
      </main>

      {/* -----------------------MODAL----------------------- */}
      <div className={styles.modal} style={{ display: modal ? 'block' : 'none' }}>
        <div className={styles.modalContent}>
          <form onSubmit={handleSubmit}>
            <span onClick={() => { setModal(false) }}>
              <FontAwesomeIcon icon={faTimes} className={styles.close} />
            </span>
            <h2>Crear administrador</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" value={form.nombre} name="nombre" autoComplete='off' placeholder='Co-admin...' onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" value={form.email} name="email" autoComplete='off' placeholder='example@gmail.com' onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.passInput}>
                <label htmlFor="password">Contraseña</label>
                <input type={!showPassword ? "password" : "text"} value={form.password} autoComplete='off' name="password" placeholder='Escriba una contraseña segura' onChange={handleChange} required />
                <button
                  type="button" // Cambiado a type="button" para evitar el envío
                  className={styles.showPass}
                  onClick={(e) => {
                    e.preventDefault(); // Evita que se envíe el formulario
                    setShowPassword(!showPassword);
                  }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className={styles.eyeIcon} />
                </button>
              </div>
              <button className={styles.randomPassword} onClick={generatePassword}>
                <span>Random Password</span>
              </button>
            </div>
            <div className={styles.rolGroup}>
              <select className={styles.optionsAdmin} value={form.rol} name="rol" onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="Co-admin">Co-admin</option>
                <option value="Revisor">Revisor</option>
              </select>
              {renderPermissions()}
            </div>
            <div className={styles.buttons}>
              <button className={styles.btnModal} type="submit">
                <span>Aceptar</span>
              </button>
              <button className={styles.btnModal} onClick={() => setModal(false)}>
                <span>Cancelar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;