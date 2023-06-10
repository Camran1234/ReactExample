import styled from 'styled-components'
import { renderMatches, useNavigate } from 'react-router-dom';
import ruta from '../pages/Ruta'
import { useEffect } from "react";

const userComponent = {};


userComponent.getComisiones = async(idRepartidor) => {
    try{
        if(idRepartidor == null){
            return "";
        }
        let data = {
            idRepartidor: idRepartidor
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/getComisiones", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response.comisiones;
    }catch(error){
        console.log(error)
    }
}

userComponent.getCalificacion = async(idRepartidor) => {
    try{
        let data = {
            idRepartidor: idRepartidor
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/getCalificacion", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response.total_puntos;
    }catch(error){
        console.log(error)
    }
}

userComponent.calificarOrden = async(idPedido, idRepartidor, calificacion) => {
    try{
        let data = {
            idPedido: idPedido,
            idRepartidor: idRepartidor,
            calificacion: calificacion,
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/calificarOrden", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response.result;
    }catch(error){
        console.log(error)
    }
}
userComponent.obtenerEstado = async(idLista) => {
    try{
        let data = {
            idLista: idLista
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/obtenerEstado", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response.result;
    }catch(error){
        console.log(error)
    }
}

userComponent.obtenerDirecciones = async() => {
    try{
        let data = {
            
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/obtenerDirecciones", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    }catch(error){
        console.log(error)
    }
}

userComponent.realizarPedido = async(idLista, descripcion, departamento, ciudad, direccion) => {
    try{
        let data = {
            idLista: idLista,
            descripcion: descripcion,
            departamento: departamento,
            ciudad: ciudad,
            direccion: direccion,
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/realizarPedido", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    }catch(error){
        console.log(error)
    }
}

userComponent.getProducto = async(idProducto) => {
    try{
        let data = {
            idProducto: idProducto
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/getProducto", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    }catch(error){
        console.log(error)
    }
}

userComponent.getPedidos = async(idLista) => {
    try{
        let data = {
            idLista: idLista
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/getPedidos", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response.pedidos;
    }catch(error){
        console.log(error)
    }
}

userComponent.getEmpresas = async () => {
    try {
        let data = {
            
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/GetEmpresas", config);
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

userComponent.getCarrito = async (idUsuario) => {
    try {
        let data = {
            idUsuario: idUsuario
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/getCarrito", config);
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

userComponent.agregarPedido = async (idLista, idProducto, cantidad, descripcion) => {
    try {
        if(descripcion === null || descripcion === undefined){
            descripcion = "-"
        }
        if(descripcion == ""){
            descripcion = "-"
        }
        let data = {
            idLista: idLista,
            producto : {
                idProducto: idProducto,
                cantidad: cantidad,
                descripcion: descripcion
            }
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/agregarPedido", config);
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
        alert (error);
        console.log(error);
    }
}

userComponent.modificarPedido = async (idPedido, cantidad, descripcion) => {
    try {
        let data = {
            idPedido: idPedido,
            cantidad: cantidad,
            descripcion: descripcion
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/modifyPedido", config);
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

userComponent.eliminarPedido = async (idPedido) => {
    try {
        let data = {
            idPedido: idPedido
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/eliminarPedido", config);
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

userComponent.eliminarLista = async (idLista) => {
    try {
        let data = {
            idLista: idLista
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/eliminarLista", config);
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

userComponent.categoriaEmpresa = async (idCategoria) => {
    try {
        let data = {
            idCategoria: idCategoria
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/CategoriaEmpresa", config);
        let response = await request.json();
        if (response === undefined){
            console.log("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            console.log("Error: error en servidor");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

userComponent.getCategorias = async () => {
    try {
        let data = {}
        let config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            }
        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/GetCategorias", config);
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


userComponent.categoriaEmpresa = async (idCategoria) => {
    try {
        let data = {
            idCategoria: idCategoria
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/CategoriaEmpresa", config);
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
        alert("Error: error en servidor no hay categoria");
        //console.log(error);
    }
}


userComponent.productoEmpresa = async (id) => {
    try {
        let data = {
            idEmpresa: id
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/ProductoEmpresa", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

  const checkUser = async(usuario) => {
      try{
        let data = {
            idUsuario: usuario
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/check", config);
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

const NavFact = () => {

    const navigate = useNavigate()
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('idusuario');
      navigate("/")
    };

    useEffect(() => {
        let usuario = localStorage.getItem('idusuario');
        if(usuario){
            checkUser(localStorage.getItem('idusuario'))
            .then(result => {
            const estado = result;
            if(estado != 0){
                console.log("Estado: "+estado)
                alert("Servicio bloqueado al usuario, contactar al administrador")
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
                <li className='horizontal'><a href="/navegacioncategorias">Restaurantes y Menus</a></li>
                <li className='horizontal'><a href="/usuario/buscador">Productos</a></li>
                <li className='horizontal'><a href="/entregas">Entrega y Pago</a></li>
                <li className='horizontal'><a href="">Historial de Pedidos</a></li>
                <li className='horizontal'><a href="/carritoCompras">Carrito de Compras</a></li>
                <li className="horizontalInv"><a className="right" href="/menuUsuario">Regresar</a></li>
            </ul>
        </div>
        
    )
}


const ButtonModify = ({message}) => {

    const handleClick = () => {

    }

    return(
        <>
        <ButtonYellow >{message}</ButtonYellow>
        </>
    )
}

const ButtonEliminate = ({idPedido, message}) => {

    const handleClick = () => {
        userComponent.eliminarPedido(idPedido)
            .then(result => {
                alert(result.message);
                window.location.reload();
            })
            .catch(error => {
                alert(error)
            })
    }

    return(
        <>
        <ButtonRed onClick={handleClick}>{message}</ButtonRed>
        </>
    )
}

const ButtonYellow = styled.button`
  background-color: yellow;
  color: black;
  font-size: 20px;
  padding: 5px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const ButtonRed = styled.button`
  background-color: red;
  color: white;
  font-size: 20px;
  padding: 5px 40px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;



const ButtonB = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const ButtonGreen = styled.button`
  background-color: green;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

export {NavFact, userComponent, ButtonB, ButtonRed, ButtonGreen, ButtonEliminate, ButtonModify}