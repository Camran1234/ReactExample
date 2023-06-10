import React from 'react';
import '../styles/Roles.css';
import { useNavigate } from 'react-router-dom';

function Roles() {
  const navigate = useNavigate(); // obtiene la función navigate

  function redirectToLogin() {
    navigate('/login'); // navega a la ruta /login
  }
  function redirectToRegister() {
    navigate('/loginEmpresa'); // navega a la ruta /register
  }
  function redirectToEmpresa() {
    navigate('/loginRepartidor'); // navega a la ruta /empresa
  }
    function redirectToRepartidor() {
    navigate('/repartidor'); // navega a la ruta /repartidor
    }
    function redirectToAdmin() {
    navigate('/loginAdministrador'); // navega a la ruta /usuario
    }

  return (
    <div className='contenido-pantalla'>
      <h1>¿Y tú quién eres?</h1>
      <nav>
        <ul>
          <li>
            <span></span><span></span><span></span><span></span>
            <button onClick={redirectToAdmin} className='boton-quien'>ADMINISTRADOR</button>
          </li>
          <li>
            <span></span><span></span><span></span><span></span>
            <button onClick={redirectToEmpresa} className='boton-quien'>REPARTIDOR</button>
          </li>
          <li>
            <span></span><span></span><span></span><span></span>
            <button onClick={redirectToLogin} className='boton-quien'>USUARIO</button>
          </li>
          <li>
            <span></span><span></span><span></span><span></span>
            <button onClick={redirectToRegister} className='boton-quien'>EMPRESA</button>
          </li>
          <li>
            <span></span><span></span><span></span><span></span>
            <button onClick={redirectToLogin} className='boton-quien'>¿Aún no sabes?</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Roles;
