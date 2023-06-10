import { Navigate, useNavigate } from "react-router-dom";
import {MenuNav} from "../components/Complements"
import ruta from "./Ruta"


function MenuRepartidor(props) {
  const navigate = useNavigate()

    const handleLogout = () => {
      localStorage.removeItem('repartidor');
      localStorage.removeItem('idrepartidor');
      navigate("/")
    };


    return (
      <div>
        <h1>Bienvenido al menú del repartidor {localStorage.getItem('idrepartidor')}</h1>
        <button onClick={() => handleLogout()}>Cerrar sesión</button>
        <MenuNav />
      </div>
    );
  }
  
  export default MenuRepartidor;