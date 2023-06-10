import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from 'react-router-dom';
import "../styles/navAdmin.css";

const NavbarAdmin = () => {

  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin")
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid mb-2 mt-2">
        <a className="navbar-brand a-nav-admin" href="#">
          AlChilazo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu-nav-admin">
            <li className="nav-item me-2 lista-admin">
              <a className="nav-link active a-nav-admin" aria-current="page" href="/solicitudes">
                Solicitudes
              </a>
            </li>
            <li className="nav-item me-2 lista-admin">
              <a className="nav-link a-nav-admin" href="/deshabilitarusuario">
                Usuarios
              </a>
            </li>
            <li className="nav-item me-2 lista-admin">
              <a className="nav-link a-nav-admin" href="/catalogoProductos">
                Catalogo
              </a>
            </li>
            <li className="nav-item me-2 lista-admin">
              <a className="nav-link a-nav-admin" href="/informeventas">
                Informe ventas
              </a>
            </li>
            <li className="nav-item me-2 lista-admin">
              <a className="nav-link a-nav-admin" href="/informeusuarios">
                Informe usuarios
              </a>
            </li>
            <li className="nav-item me-2 lista-admin">
              <a className="nav-link a-nav-admin" href="/informerepartidor">
                Informe repartidores
              </a>
            </li>
          </ul>
          <div className="d-flex dropdown" role="search">
          <li className="d-flex nav-item dropdown">
              <a
                className="nav-link dropdown-toggle a-nav-admin"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Administrador
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li className="drop-menu-admin">
                  <p className="dropdown-item">
                    Administrador
                  </p>
                </li>
                <li className="drop-menu-admin">
                  <a className="dropdown-item a-nav-admin" onClick={handleCerrarSesion}>
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
