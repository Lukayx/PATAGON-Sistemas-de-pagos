import React, { useEffect } from 'react';
import style from '@styles/LoginGeneral.module.css';
import style2 from '@styles/Registro.module.css';
import useForm from '@hooks/registerForm';
import LoginButton from '@components/loginButton/loginButton';
import ParticlesBG from '@components/Particles/ParticlesBG';
import InputPassword from '@components/InputPassword/inputPassword';
import useNewPassword from '@hooks/changePassword.js'; 

/**
 * Componente de React para la página de cambio de contraseña.
 *
 * Esta página permite al usuario establecer una nueva contraseña utilizando un token recibido por URL.
 * Incluye validaciones de seguridad para la contraseña, como longitud mínima, inclusión de mayúsculas y números,
 * y verificación de coincidencia entre la contraseña y su confirmación.
 * 
 * Funcionalidades principales:
 * - Obtiene el token de la URL para autorizar el cambio de contraseña.
 * - Valida los campos de contraseña y confirmación antes de enviar.
 * - Muestra mensajes de error y éxito según la respuesta del backend y las validaciones locales.
 * - Deshabilita los campos y el botón de envío mientras se procesa la solicitud.
 *
 * @component
 * @returns {JSX.Element} Página de cambio de contraseña.
 */
const PassChange = () => {
  const initialData = {
    password: '',
    confirmPassword: ''
  };

  const onValidate = (form) => {
    let errors = {};
    let isError = false;

    if (!form.password.trim()) {
      errors.password = "La contraseña no puede estar vacía";
      isError = true;
    } else if (!/(?=.*[A-Z])/.test(form.password)) {
      errors.password = "La contraseña debe contener al menos una letra mayúscula.";
      isError = true;
    } else if (!/(?=.*\d)/.test(form.password)) {
      errors.password = "La contraseña debe contener al menos un número.";
      isError = true;
    } else if (form.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres.";
      isError = true;
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
      isError = true;
    }

    return isError ? errors : null;
  };

  const { form, errors, loading, handleChange } = useForm(initialData, onValidate);
  const { changePassword, error: backendError, success, loading: backendLoading } = useNewPassword();

  // Obtener el token de la URL
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');


  // Validación adicional para asegurar que el token esté presente
  const isTokenValid = token && token.length > 0;

  const handlePasswordChange = (e) => {
    e.preventDefault();

    // Validamos que el token esté presente
    if (!isTokenValid) {
      alert("El token es requerido.");
      return;
    }
    const validationErrors = onValidate(form);
    if (!validationErrors) {
      changePassword(form.password, token); // Enviar la nueva contraseña y el token
    } else {
      if (validationErrors.confirmPassword) {
        alert(validationErrors.confirmPassword);
      } else if (validationErrors.password) {
        alert(validationErrors.password);
      }
    }
  };

  return (
    <>
      <ParticlesBG />
      <div className={style.body}>
        <div className={style.contenedor}>
          <form onSubmit={handlePasswordChange}>
            <h1>Cambiar Contraseña</h1>
            <InputPassword 
              type="password"
              id="password"
              value={form.password}
              label="Nueva Contraseña"
              handleChange={handleChange}
              disabled={loading || backendLoading}
            />
            {errors.password && <div className={style2.errorMessage}>{errors.password}</div>}

            <InputPassword
              type="password"
              id="confirmPassword"
              value={form.confirmPassword}
              label="Confirmar Contraseña"
              handleChange={handleChange}
              disabled={loading || backendLoading}
            />
            {errors.confirmPassword && <div className={style2.errorMessage}>{errors.confirmPassword}</div>}

            {backendError && <div className={style2.errorMessage}>{backendError}</div>}
            {success && <div className={style2.successMessage}>{success}</div>}

            <LoginButton text="Cambiar Contraseña" disabled={loading || backendLoading} />
          </form>
        </div>
      </div>
    </>
  );
};

export default PassChange;
