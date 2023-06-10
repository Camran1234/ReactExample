import { useNavigate } from "react-router-dom";
import {NavFactory} from "../components/RestaurantComplements"


function MenuEmpresa(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('empresa');
    localStorage.removeItem('idEmpresa');
    navigate("/")
  };

  

  return (
    <div>
      <h1>Bienvenido al menú de Empresa {localStorage.getItem("idEmpresa")}</h1>
      <button onClick={() => handleLogout()}>Cerrar sesión</button>
      <NavFactory />
    </div>
  );
}

export default MenuEmpresa;