import React from "react";
import useForm from "@hooks/loginForm";
import LoginButton from "@components/loginButton/loginButton";
import ParticlesBG from "@components/Particles/ParticlesBG";
import InputPassword from "@components/InputPassword/inputPassword";
import InputText from "@components/InputText/inputText";
import style from "@styles/LoginGeneral.module.css";
import style2 from "@styles/Login.module.css";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

/**
 * Componente de página de inicio de sesión para clientes.
 *
 * Renderiza un formulario de inicio de sesión con campos para correo electrónico y contraseña,
 * manejo de errores, y opciones adicionales como "Recordarme", recuperación de contraseña,
 * registro y acceso como invitado. Utiliza un hook personalizado `useForm` para gestionar el
 * estado del formulario, validaciones y envío.
 *
 * @component
 * @returns {JSX.Element} Página de inicio de sesión para clientes.
 */
function Login() {
  const initialData = {
    email: "",
    password: "",
  };

  const { form, errors, loading, handleChange, handleSubmit } = useForm(initialData);

  return (
    <>
      <ParticlesBG/>
      <div className={style.body}>
        <div className={style.contenedor}>
          <div className={style.background}></div>
          <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
            {errors.server && <p className={style2.errorMessage}  >{errors.server}</p>}
            <InputText  icon={faEnvelope} id="email" label="Gmail" value={form.email} handleChange={handleChange} disabled={loading}/>
            <InputPassword  id="password" label="Contraseña" value={form.password} handleChange={handleChange} disabled={loading}/>
            <div className={style2.loginGroup}>
              <div>
                <input id="check" type="checkbox" disabled={loading}/>
                <label htmlFor="check"> Recordarme</label>
              </div>
              <a href="/recovery" className={style.forgPass}>¿Olvidaste tu contraseña?</a>
            </div>
            <LoginButton text="Ingresar" disabled={loading}/>
            <div className={style2.linkGroup}>
              <p>¿No tienes cuenta? <a href="/registro">Regístrate</a></p>
              <a href="/mainClient">Entrar como invitado</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;