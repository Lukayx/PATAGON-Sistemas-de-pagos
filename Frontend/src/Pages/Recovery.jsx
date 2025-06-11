import React from 'react';
import style from '@styles/LoginGeneral.module.css';
import style2 from '@styles/Registro.module.css';
import useForm from '@hooks/registerForm';
import LoginButton from '@components/loginButton/loginButton';
import InputText from '@components/InputText/inputText';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ParticlesBG from '@components/Particles/ParticlesBG';
import useNewPassword from '@hooks/newPassword'; // Importar el hook

/**
 * Componente Recovery
 *
 * Página de recuperación de contraseña para usuarios.
 * Permite al usuario ingresar su correo electrónico para solicitar el restablecimiento de su contraseña.
 * Incluye validación de formato de correo electrónico y muestra mensajes de error o éxito según la respuesta.
 *
 * Hooks utilizados:
 * - useForm: Maneja el estado del formulario, validaciones y eventos de cambio/envío.
 * - useNewPassword: Proporciona la función para solicitar el restablecimiento de contraseña y estados de error/éxito.
 *
 * Elementos principales:
 * - InputText: Campo de entrada para el correo electrónico.
 * - LoginButton: Botón para enviar la solicitud de recuperación.
 * - Mensajes de error y éxito según la validación y la respuesta del servidor.
 *
 * @component
 */
const Recovery = () => {
  const initialData = {
    email: ''
  };

  const onValidate = (form) => {
    let regexEmail = /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

    let errors = {};
    let isError = false;

    if (!form.email.trim()) {
      errors.email = "El correo electrónico no puede estar vacío";
      isError = true;
    } else if (!form.email.includes('@')) {
      errors.email = "El correo electrónico debe contener un '@'";
      isError = true;
    } else if (form.email.endsWith('.') || !/^[a-zA-Z]$/.test(form.email.slice(-1))) {
      errors.email = "El correo electrónico no puede terminar en '.' o un carácter no alfabético";
      isError = true;
    } else if (!regexEmail.test(form.email)) {
      errors.email = "El correo electrónico contiene un formato inválido";
      isError = true;
    }

    return isError ? errors : null;
  };

  const { form, errors, loading, handleChange, handleSubmit } = useForm(initialData, onValidate);
  const { recoverPassword, error, success } = useNewPassword(); // Usamos el hook aquí

  const handleRecovery = (e) => {
    e.preventDefault();
    const validationErrors = onValidate(form);
    if (!validationErrors) {
      recoverPassword(form.email); // Llamamos al hook para enviar el correo
    }
  };

  return (
    <>
      <ParticlesBG />
      <div className={style.body}>
        <div className={style.contenedor}>
          <form onSubmit={handleRecovery}>
            <h1>Recuperar Contraseña</h1>
            <InputText 
              icon={faEnvelope} 
              id='email' 
              value={form.email} 
              label='Correo electrónico' 
              handleChange={handleChange} 
              disabled={loading} 
            />
            {errors.email && <div className={style2.errorMessage}>{errors.email}</div>}

            {error && <div className={style2.errorMessage}>{error}</div>}
            {success && <div className={style2.successMessage}>{success}</div>}

            <LoginButton text="Recuperar" disabled={loading} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Recovery;
