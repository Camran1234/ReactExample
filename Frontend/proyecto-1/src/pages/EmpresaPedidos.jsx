import ruta from './Ruta'
import "../styles/Empresa.css"
import React, {Component} from "react"
import { dataEmpresa, NavFactory, ButtonAccept, ButtonCancel } from '../components/RestaurantComplements';

class EmpresaPedidos extends Component {
    constructor(props){
        super(props);
        this.state = {
            entries: [],
            earrings: [],
            idEmpresa: 1,
            //idEmpresa: null,
        }
    }

    mostrarEntrantes(){
        return (
            <>
                {this.state.entries.map(element => {
                    let {pedido, idDepartamento, idCiudad, nameDepartamento,
                    nameCiudad, pedidos} = element
                        /*<h4>UID: {numSolicitud}</h4>
                            <h2>{empresa}</h2>
                            <h3>Cliente: {nombreCompleto}</h3>
                            <h4>Entregar a: <p>{direccion}</p></h4>*/ 
                    return(
                        <>
                        <div className="cardE-bottom sub item" >
                            <h2>UID: {pedido}</h2>
                            <h3>Departamento: {nameDepartamento}</h3>
                            <h3>Ciudad: {nameCiudad}</h3>
                            <h3>Pedidos</h3>
                            {pedidos.map(pedido => {
                                let oferta = "no";
                                if(pedido.oferta == 1){
                                    oferta="si"
                                }
                                return(
                                    <>
                                        <div className="cardE-bottom sub item2">
                                            <h4>{pedido.nombreProducto}</h4>
                                            <h4>Cantidad: {pedido.cantidad}</h4>
                                            <h4>Es oferta: {oferta}</h4>
                                            <h4>Descripcion:</h4><h6>{pedido.descripcion}</h6>
                                        </div>
                                    </>
                                )
                            })}

                            <ButtonAccept
                                idPedido= {pedido}
                                message = "Aceptar"
                            />
                                        
                            <ButtonCancel
                                idPedido = {pedido}
                                message = "Cancelar"
                            />  

                        </div>
                        </>
                    )
                })}
            </>
        )
    }

    mostrarPendientes(){
        return (
            <>
                {this.state.earrings.map(element => {
                    let {pedido, idDepartamento, idCiudad, nameDepartamento,
                        nameCiudad, pedidos} = element
                            /*<h4>UID: {numSolicitud}</h4>
                                <h2>{empresa}</h2>
                                <h3>Cliente: {nombreCompleto}</h3>
                                <h4>Entregar a: <p>{direccion}</p></h4>*/ 
                        return(
                            <>
                            <div className="cardE-bottom sub item" >
                                <h2>UID: {pedido}</h2>
                                <h3>Departamento: {nameDepartamento}</h3>
                                <h3>Ciudad: {nameCiudad}</h3>
                                <h3>Pedidos</h3>
                                {pedidos.map(pedido => {
                                    let oferta = "no";
                                    if(pedido.oferta == 1){
                                        oferta="si"
                                    }
                                    return(
                                        <>
                                            <div className="cardE-bottom sub item2">
                                                <h4>{pedido.nombreProducto}</h4>
                                                <h4>Cantidad: {pedido.cantidad}</h4>
                                                <h4>Es oferta: {oferta}</h4>
                                                <h4>Descripcion:</h4><h6>{pedido.descripcion}</h6>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                            </>
                        )
                })}
            </>
        )
    }

    componentDidMount(){
        if(localStorage.getItem("idEmpresa") === null || localStorage.getItem("idEmpresa") === undefined
        || localStorage.getItem("empresa") === null || localStorage.getItem("empresa") === undefined ){
            console.log("Returning 1")
          return;
        }else{
          if(localStorage.getItem('empresa') == false){
            console.log("Returning 2")
            return;
          }else{
            console.log("asignando, idEmpresa: "+localStorage.getItem("idEmpresa"))
            this.setState({idEmpresa: localStorage.getItem("idEmpresa")});
          }
        }
        let idEmpresa = localStorage.getItem("idEmpresa");
        //Generando informacion para pedidos entrantes
        let entryData=[];
        let earringData=[];
        console.warn("Buscando pedidos de empresa: "+idEmpresa)
        dataEmpresa.mostrarPedidos(idEmpresa, "Esperando verificacion")
            .then( result => {
                let data = [];
                if(result != null){
                    data = result;
                }
                for (let index=0; index< data.length; index++){
                    let {idPedido, departamento, ciudad} = data[index];
                    dataEmpresa.detallarPedidos(idPedido, departamento, ciudad)
                    .then(res => {
                        let {idPedido, departamento, ciudad, pedidos} = res;
                        dataEmpresa.getDepartamento(departamento)
                        .then(resDept => {
                            dataEmpresa.getCiudad(departamento, ciudad)
                            .then(resCt => {
                                entryData.push({
                                    pedido: idPedido,
                                    idDepartamento: departamento,
                                    idCiudad: ciudad,
                                    nameDepartamento: resDept,
                                    nameCiudad: resCt,
                                    pedidos: pedidos
                                })

                                if(index == (data.length -1)){
                                    this.setState({entries:entryData})
                                }
                            }).catch(error=>{console.warn("No se agrego la ciudad: "+error)})
                        }).catch(error => {console.warn("No se agrego el departamento: "+error)})
                    }).catch(error=>{console.warn("No se pudo detallar el pedido: "+error)})
                }
            })
            .catch( error => {
                alert("No se pudieron mostrar los pedidos entrantes");                
            })

        //Generando peticiones en proceso
        dataEmpresa.mostrarPedidos(idEmpresa, "En proceso")
            .then( result => {
                let data = [];
                if(result != null){
                    data = result;
                }
                for (let index=0; index< data.length; index++){
                    let {idPedido, departamento, ciudad} = data[index];
                    dataEmpresa.detallarPedidos(idPedido, departamento, ciudad)
                    .then(res => {
                        let {idPedido, departamento, ciudad, pedidos} = res;
                        dataEmpresa.getDepartamento(departamento)
                        .then(resDept => {
                            dataEmpresa.getCiudad(departamento, ciudad)
                            .then(resCt => {
                                earringData.push({
                                    pedido: idPedido,
                                    idDepartamento: departamento,
                                    idCiudad: ciudad,
                                    nameDepartamento: resDept,
                                    nameCiudad: resCt,
                                    pedidos: pedidos
                                })

                                if(index == (data.length -1)){
                                    this.setState({earrings: earringData})
                                }
                            }).catch(error=>{console.warn("No se agrego la ciudad: "+error)})
                        }).catch(error => {console.warn("No se agrego el departamento: "+error)})
                    }).catch(error=>{console.warn("No se pudo detallar el pedido: "+error)})
                }
            })
            .catch( error => {
                console.error("No se pudieron mostrar los pedidos entrantes");                
            })
    }

    render(){
        //DESCOMENTAR ESTO CUANDO EL LOGIN ESTE BIEN IMPLEMENTADO
        /*if(localStorage.getItem("empresa")){
            return (<div></div>)
        }*/

        return(
            <div>
                <div className="cardE">
                <NavFactory />
                <div className="cardE-bottom">
                    <div className="cardE-bottom sub">
                        <h1>Peticiones Entrantes</h1>
                        <br/>
                        {this.mostrarEntrantes()}
                    </div>
                    <div className="cardE-bottom sub">
                        <h1>Peticiones Pendientes</h1>
                        <br/>
                        {this.mostrarPendientes()}
                    </div>
                </div>
            </div>     
            </div> 
        )
    }
}

export default EmpresaPedidos;