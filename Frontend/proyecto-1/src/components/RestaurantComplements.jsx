import styled from 'styled-components'
import { renderMatches, useNavigate } from 'react-router-dom';
import ruta from '../pages/Ruta'
import { useEffect } from "react";

const dataEmpresa = {};

const ButtonAccept = ( {idPedido, message}) => {
    const navigate = useNavigate();
    const refresh = () => {
      window.location.reload();
    }
  
    const handleClick = () => {
      dataEmpresa.aceptarPedido(idPedido)
        .then(result =>{
            alert("Pedido "+idPedido+" aceptado");
            refresh();
        })
    }
  
    return (
      <AcceptButton onClick={handleClick}>{message}</AcceptButton>
    )
}

const ButtonCancel = ( {idPedido, message}) => {
    const navigate = useNavigate();
    const refresh = () => {
      window.location.reload();
    }
  
    const handleClick = () => {
      const descripcionCancelacion = prompt('Ingrese la razon de la cancelacion')
      dataEmpresa.negarPedido(idPedido, descripcionCancelacion)
        .then(result =>{
            alert("Pedido "+idPedido+" cancelado");
            refresh();
        })
    }
  
    return (
      <CancelButton onClick={handleClick}>{message}</CancelButton>
    )
}

const AcceptButton = styled.button`
  background-color: green;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

const CancelButton = styled.button`
  background-color: red;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

dataEmpresa.aceptarPedido = async (idPedido) => {
    try {
        let data = {
            "idPedido": idPedido
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),
        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/aceptarPedido", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

dataEmpresa.negarPedido = async (idPedido, descripcionCancelado) => {
    try {
        let data = {
            "idPedido": idPedido,
            "descripcionCancelado": descripcionCancelado
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),
        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/negarPedido", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

dataEmpresa.getDepartamento = async (departamento) => {
    try {
        let data = {
            "idDepartamento": departamento,
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),
        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/getDepartamentoName", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        return response.departamento.departamento;
    } catch (error) {
        console.log(error);
    }
}

dataEmpresa.getCiudad = async (departamento, ciudad) => {
    try {
        let data = {
            "idDepartamento": departamento,
            "idCiudad": ciudad
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),
        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/getCiudadName", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        
        return response.ciudad.ciudad;
    } catch (error) {
        console.log(error);
    }
}

dataEmpresa.detallarPedidos = async (pedido, dept, ct) => {
    try {
        let data = {
            "idPedido": pedido,
            "departamento": dept,
            "ciudad": ct,
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),

        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/detallarPedido", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}


dataEmpresa.mostrarPedidos = async (idEmpresa, estado) => {
    try {
        let data = {
            "idEmpresa": idEmpresa,
            "estado": estado
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),

        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/deployPedidos", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        
        return response.result;
    } catch (error) {
        console.log(error);
    }
}

const checkUser = async(empresa) => {
    try{
      let data = {
          idEmpresa: empresa
      }
      let config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET',
              'Access-Control-Request-Method': '*',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
          },
          body: JSON.stringify(data)
      }
  
      let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/check", config);
      let response = await request.json();
      if (response === undefined){
          alert("Error: servidor no disponible");
          return;
      }
      
      return response.estado;
  }catch(error){
      console.log(error)
  }
  }

const NavFactory = () => {
    const navigate = useNavigate();
    const refresh = () => {
        localStorage.setItem("token", false)
      }

      const handleLogout = () => {
        localStorage.removeItem('empresa');
        localStorage.removeItem('idEmpresa');
        navigate("/")
      };

      useEffect(() => {
        let usuarioEmpresa = localStorage.getItem('idEmpresa');
        if(usuarioEmpresa){
            checkUser(localStorage.getItem('idEmpresa'))
          .then(result => {
            const estado = result;
            if(estado != 1){
              alert("Servicio bloqueado a la empresa UID: "+localStorage.getItem('idEmpresa')+", contactar al administrador "+estado)
              handleLogout()
            }
          })
          .catch(error => {
            alert(JSON.stringify(error))
          })
        }
        
      }, [])

    return(
      <div className="w1-col m5">
                      <ul className="horizontal">
                            <li className='horizontal'><a href="/empresa/crud">CRUD</a></li>
                            <li className='horizontal'><a  href="/empresa/pedidos">Pedidos</a></li>
                            <li className='horizontal'><a href="/empresa/reporteRestaurante">Reportes</a></li>
                            <li className="horizontalInv"><a className="right" href="/menuEmpresa">Regresar</a></li>
                      </ul>
        </div>
    )
}





export {NavFactory, dataEmpresa, ButtonAccept, ButtonCancel};
