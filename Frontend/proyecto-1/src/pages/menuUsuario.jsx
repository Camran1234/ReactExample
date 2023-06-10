import { NavFact } from "../components/UserComponent";
import { useNavigate } from "react-router-dom";



  const MenuUsuario = ({props}) => {
    const navigate = useNavigate()
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('idusuario');
      navigate("/")
    };

   

    return (
      <div>
        <h1>Bienvenido al menú de usuario {localStorage.getItem("idusuario")}</h1>
        <button onClick={() => handleLogout()}>Cerrar sesión</button>
        <NavFact />
      </div>

    );
  }

  
  export default MenuUsuario;