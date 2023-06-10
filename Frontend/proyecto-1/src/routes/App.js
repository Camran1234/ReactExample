import React, { useState,useContext,useEffect, Fragment } from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import SolicitudesAdmin from '../pages/solicituresAdmin';
import DeshabilitarUsuario from '../pages/DeshabilitarUsuario';
//<<<<<<< HEAD
import Encarritocompras from '../pages/carritocompras';
import Ennavegacioncategorias from '../pages/navegacioncategorias';
//import '../App.css';
//=======
import Login from '../pages/login';
import LoginEmpresa from '../pages/loginEmpresa';
import LoginRepartidor from '../pages/loginRepartidor';
import LoginAdministrador from '../pages/loginAdmin';
import RegistroEmpresa from '../pages/registroEmpresa';
import RegistroUsuario from '../pages/registroUsuario';
import MenuUsuario from '../pages/menuUsuario';
import MenuRepartidor from '../pages/menuRepartidor';
import MenuEmpresa from '../pages/menuEmpresa';
import ErrorPage from '../pages/PaginaDeError';
import RegistroRepartidor from '../pages/registroRepartidor';
import Roles from '../pages/Roles';
import MenuAdmin from '../pages/menuAdmin';
import InformeUsuarios from '../pages/informeUsuarios';
import InformeRepartidor from '../pages/informeRepartidor';
import InformeVentas from '../pages/informeVentas';
import '../styles/App.css';
//npm i react-router-dom --save
import RepartidorListaPedidos from '../pages/RepartidorListaPedidos';
import SolicitudEntrega from '../pages/solicitudEntrega';
import PedidosAsignados from '../pages/pedidosAsignados';
import EmpresaPedidos from '../pages/EmpresaPedidos';
import EntregaPago from '../pages/EntregaPago'
import ComisionGenerada from '../pages/ComisionGenerada';
import '../styles/App.css';
import Catalogo from '../pages/catalogoProducto';
import CrudView from '../pages/empresa/CrudView'
import ReporteRestaurante from '../pages/reporteRestaurante';
import MenuRestaurantes from '../pages/usuario/MenuRestaurantes'
import MenuProductos from '../pages/usuario/MenuProductos';
//>>>>>>> develop
import HistorialPedidosRepartidor from '../pages/HistorialPedidosRepartidor';
import HistorialComisiones from '../pages/ComisionesGeneradas';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isEmpresa, setIsEmpresa] = useState(!!localStorage.getItem('empresa'));
  const [isRepartidor, setIsRepartidor] = useState(!!localStorage.getItem('repartidor'));
  const [isAdministrador, setIsAdministrador] = useState(!!localStorage.getItem('administrador'));
  useEffect(() => {
    if (localStorage.getItem('token') === false) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    if (localStorage.getItem('empresa') === false) {
      setIsEmpresa(false);
    } else {
      setIsEmpresa(true);
    }
  }, []);

  const handleLogoutEmpresa = () => {
    setIsEmpresa(false);
  };
  useEffect(() => {
    if (localStorage.getItem('repartidor') === false) {
      setIsRepartidor(false);
    } else {
      setIsRepartidor(true);
    }
  }, []);

  const handleLogoutRepartidor = () => {
    setIsRepartidor(false);
  };
  useEffect(() => {
    if (localStorage.getItem('administrador') === false) {
      setIsAdministrador(false);
    } else {
      setIsAdministrador(true);
    }
  }, []);

  const handleLogoutAdministrador = () => {
    setIsAdministrador(false);
  };



  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Roles />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/loginEmpresa" element={<LoginEmpresa />} />
          <Route path="/loginRepartidor" element={<LoginRepartidor />} />
          <Route path="/loginAdministrador" element={<LoginAdministrador />} />

          <Route path="/menuAdmin" element={ isAdministrador ? ( <MenuAdmin onLogout={handleLogoutAdministrador} />) : (<Navigate to="/" />)}/>
          <Route path="/menuUsuario" element={ isLoggedIn ? ( <MenuUsuario onLogout={handleLogout} />) : (<Navigate to="/" />)}/>
          <Route path="/menuRepartidor" element={ isRepartidor ? ( <MenuRepartidor onLogout={handleLogoutRepartidor} />) : (<Navigate to="/" />)}/>
          <Route path="/menuEmpresa" element={ isEmpresa ? ( <MenuEmpresa onLogout={handleLogoutEmpresa} />) : (<Navigate to="/" />)}/>

          <Route path="/" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/solicitudes" element={<SolicitudesAdmin />} />
          <Route path="/registroEmpresa" element={<RegistroEmpresa />} />
          <Route path="/registroUsuario" element={<RegistroUsuario />} />
          <Route path='/registroRepartidor' element={<RegistroRepartidor/>} />
          <Route path="/repartidor/verPedidos" element={<RepartidorListaPedidos />} />
          <Route path="/repartidor/comisionGenerada" element={<ComisionGenerada />} />
          <Route path="/solicitudEntrega" element={<SolicitudEntrega />} />
          <Route path="/pedidosAsignados" element={<PedidosAsignados />} />
          <Route path="/deshabilitarusuario" element={<DeshabilitarUsuario/>} />
          
          <Route path="/usuario/buscador" element={<MenuRestaurantes/>} />
          <Route path="/usuario/empresa/:idEmpresa/:empresa" element={<MenuProductos/>} />
          <Route path="/carritocompras" element={<Encarritocompras/>} />
          <Route path="/entregas" element={<EntregaPago/>} />
          <Route path="/navegacioncategorias" element={<Ennavegacioncategorias/>} />
          <Route path="/informeusuarios" element={< InformeUsuarios/>} />
          <Route path="/informerepartidor" element={< InformeRepartidor/>} />
          <Route path="/informeventas" element={< InformeVentas/>} />


          <Route path="/empresa/pedidos" element={<EmpresaPedidos />} />
          <Route path="/empresa/crud" element={<CrudView />} />
          
          <Route path='/catalogoProductos' element={<Catalogo/>}/>
          <Route path='/empresa/reporteRestaurante' element={<ReporteRestaurante/>}/>
          <Route path='/historialPedidosRepartidor' element={<HistorialPedidosRepartidor/>}/>
          <Route path='/historialComisiones' element={<HistorialComisiones/>}/>
      
      </Routes>

      
    </BrowserRouter>
    //AGREGAR ARRIBA
    //<Route path="/registroEmpresa" element={<RegistroEmpresa/>} />
    //<Route path="/registroUsuario" element={<RegistroUsuario/>} />


  );

}

export default App;
