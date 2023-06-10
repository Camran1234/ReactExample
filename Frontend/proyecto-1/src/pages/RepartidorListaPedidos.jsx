import React, {Component} from "react"
import "../styles/RepartidorPedido.css"
import ruta from "./Ruta";
import { useNavigate } from "react-router-dom";
import {ButtonAccept,ButtonCancel, ButtonDelivery, ButtonGroup, MenuNav} from "../components/Complements"
import { updateRepartidorStatus, getEstadoRepartidor, getActualOrder} from "../components/RepartidorComplement"
import { userComponent } from "../components/UserComponent";

class RepartidorListaPedidos extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            prueba: 'prueba',
            idUsuario: 1,
            peticiones: [],
            detalles: [],
            disabled: false,
            idPedido: 0,
            detallesEstado: [],
            descripcionCancelado: "",
            calificacion: 0,
        };
    }

    setDescripcionCancelado(desc){
        this.setState({descripcionCancelado:desc })
    }

    setIdPedido(idPedido){
        this.setState({idPedido: idPedido})
    }

    setDisabled(estado){
        let result = false;
        if(estado != 1){
            result = true;
            //Handle estado
            this.chargeEstado()
        }else{
            let idRepartidor = this.state.idUsuario
            this.displayPetition(idRepartidor)
                .then(result => {
                    this.setPetitions(result);
                })
                .catch(err => {
                    console.error(err);
                })
        }
        this.setState({disabled:result})
    }

    setPetitions(petitions){
        this.setState({
            peticiones:petitions
        });
    }

    setUsuario(idUsuario){
        this.setState({idUsuario: idUsuario});
    }

    setDetalles(detalles){
        this.setState({detalles:detalles})
    }

    showDetails(idPeticion){
        this.getPetitionDetails(idPeticion)
            .then(result => {
                if(result != undefined && result != null){
                    let array = [];
                array.push(result)
                this.setDetalles(array)
                this.setIdPedido(idPeticion)
                }
            })
            .catch(err => {
                alert("No se pudo obtener los detalles", err.message)
            })
    }


    async getPetitionDetails(idPeticion){
        try {
            let data = {
                "idPeticion": idPeticion
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

            let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/detallesPedido", config);
            let response = await request.json();
            if (response === undefined){
                alert("Error: servidor no disponible");
                return;
            }
            if (response.length == 0){
                alert("Error: error en servidor");
                return;
            }
            return response.body;
        } catch (error) {
            console.log(error);
        }
    }

    async displayPetition(idRepartidor){
        try {
            let data = {
                "idRepartidor": idRepartidor.toString()
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

            let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/pedidosCercanos", config);
            let response = await request.json();
            if (response === undefined){
                alert("Error: servidor no disponible");
                return;
            }
            if (response.length == 0){
                alert("Error: error en servidor");
                return;
            }
            if(response.body == undefined || response.body == null){
                return [];
            }
            return response.body;
        } catch (error) {
            console.log(error);
        }
    }

    async getOrderStatus(idPedido){
        try {
            let data = {
                "idPeticion": idPedido.toString(),
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

            let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/getStatusOrder", config);
            let response = await request.json();
            if (response === undefined){
                alert("Error: servidor no disponible");
                return;
            }
            if (response.length == 0){
                alert("Error: error en servidor");
                return;
            }
            return response.body;
        } catch (error) {
            console.log(error);
        }
    }

    async setOrderStatus(idPedido, estado){
        try {
            let data = {
                "idPeticion": idPedido.toString(),
                "estado": estado.toString(),
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

            let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/setStatusOrder", config);
            let response = await request.json();
            if (response === undefined){
                alert("Error: servidor no disponible");
                return;
            }
            if (response.length == 0){
                alert("Error: error en servidor");
                return;
            }
            return response.body;
        } catch (error) {
            console.log(error);
        }
    }

    chargeEstado(){
        getActualOrder(this.state.idUsuario)
            .then( result => {
                if(result != null && result != undefined){
                    let idPedido = result;
                    this.showDetails(idPedido);
                    let data = {
                        idPedido: idPedido,
                    }
                    this.state.detallesEstado = [];
                    this.state.detallesEstado.push(data);
                }
                
            })
            .catch( error => {
                alert("No se pudo cargar el estado: "+error.toString())
            })
        
    }

    mostrarEstado(){
        return(
            <>
                {this.state.detallesEstado.map(element => {
                    let idPedido = element.idPedido;
                    let idRepartidor = this.state.idUsuario;
                    return (
                        <>
                            <h2>No. Pedido: {idPedido}</h2>
                            <ButtonDelivery
                                repartidor= {idRepartidor}
                                message = "Entregar"
                            />
                                        
                            <ButtonCancel
                                repartidor = {idRepartidor}
                                message = "Cancelar"
                            />  
                                
                        </>
                    )
                })}
            </>
        )
        
    }

    mostrarDetalles(){
        return(
            <>
            {this.state.detalles.map(href => {
                            console.warn(this.state.detalles)
                            let nombreEmpresa = href.nombreEmpresa;
                            let direccionesEmpresa = href.direccionEmpresa; //Array
                            let nombreUsuario = href.nombreUsuario;
                            let direccionUsuario = href.direccionUsuario;
                            let detallesPedido = href.detalles//array un map de esto xfa
                            let descripcion = href.descripcion
                            let total = href.total;
                            return(
                                <>

                                    <h2>Recoger en "{nombreEmpresa}"</h2>
                                    <h3>Direcciones</h3>
                                    {direccionesEmpresa.map(dif => {
                                        let direccion = dif
                                        return(
                                            <>
                                                <h6>"{direccion}"</h6>
                                            </>
                                        )
                                    }) }
                                    <h3>Entregar a {nombreUsuario}</h3>
                                    <h4>Direccion de entrega: {direccionUsuario}</h4>
                                    <h3>Orden</h3>
                                    <div className="card-bottom sub item2">
                                    {detallesPedido.map(ref => {
                                        let nombreProducto = ref.nombreProducto;
                                        let cantidad = ref.cantidad;
                                        let precio = ref.precio;
                                        let descripcion = ref.descripcion;
                                        return (
                                            <>
                                                <h4>{nombreProducto}</h4>
                                                <h5>Cantidad: {cantidad}</h5>
                                                <h5>Precio: Q{precio}</h5>
                                                <h6>"{descripcion}"</h6>
                                                <br/>
                                            </>
                                        )
                                    })}
                                    <br/>
                                    <h5 style={{color:"white"}}>Nota del Cliente: "{descripcion}"</h5>
                                    </div>
                                    <h3 style={{color: "red"}}>Total: Q{total}</h3>
                                    <ButtonAccept disabledOption={this.state.disabled}
                                        repartidor={this.state.idUsuario}
                                        pedido = {this.state.idPedido}
                                        message = "Aceptar"/>
                                    

                                </>
                            )
                        })}
            </>
        )
    }

    componentDidMount() {
        if(localStorage.getItem("idrepartidor") === null || localStorage.getItem("idrepartidor") === undefined
        || localStorage.getItem("repartidor") === null || localStorage.getItem("repartidor") === undefined ){
          return;
        }else{
          if(localStorage.getItem('repartidor') == false){
            return;
          }else{
            this.state.idUsuario = localStorage.getItem('idrepartidor');
          }
        }
        

        
        //this.setUsuario((localStorage.getItem('idRepartidor')));
        //AGREGAR SESION
        //const idRepartidor=1;        
        //Status
        getEstadoRepartidor(localStorage.getItem('idrepartidor'))
            .then(result => {
                this.setDisabled(result);
            })
            .catch(err => {
                console.error(err);
            })
            

    }

    render() {

        //DESCOMENTAR ESTO CUANDO EL LOGIN ESTE COMPLETAMENTE IMPLEMENTADO
        /*if (localStorage.getItem("repartidor")){
            return (<>
                <div></div>
            </>)
        }*/
        return (
            <div>
                <div className="card">
                <MenuNav 
                />
                <div className="card-bottom">
                    <div className="card-bottom sub">
                        <h1>Solicitudes</h1>
                        <br/>
                        {this.state.peticiones.map(href => {
                                let numSolicitud = href.idlista_solicitud_pedido;
                                let nombreCompleto = href.nombre + " "+ href.apellido;
                                let direccion = href.direccion;
                                let empresa = href.empresa;
                                return(
                                    <>
                                    <div className="card-bottom sub item" onClick={() => this.showDetails(numSolicitud)}>
                                        <h4>UID: {numSolicitud}</h4>
                                        <h2>{empresa}</h2>
                                        <h3>Cliente: {nombreCompleto}</h3>
                                        <h4>Entregar a: <p>{direccion}</p></h4>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                    <div className="card-bottom sub">
                        <h1>Detalles Pedido</h1>
                        <br/>
                        {this.mostrarDetalles()}
                    </div>
                    <div className="card-bottom sub" >
                        <h1>Estado</h1>
                        <br/>
                        <div className="card-bottom sub item">
                            {this.mostrarEstado()}
                        </div>                        
                    </div>
                </div>
            </div>     
            </div>       
        );
    }
    
};

export default RepartidorListaPedidos;