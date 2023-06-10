import axios from 'axios';
import React, {useEffect, useState, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer, toast } from 'react-toastify';
import {NavFact} from '../components/UserComponent'
import { ModalModify } from '../components/ModalModify';
import { ModalSubmit } from '../components/ModalSubmit';
import "../styles/Usuario.css"
import { userComponent, ButtonRed } from '../components/UserComponent';
import { useNavigate } from 'react-router-dom';

const Encarritocompras = () => {
    const navigate = useNavigate()
    const [idUsuario, setIdUsuario] = useState(1);
    const [idLista, setIdLista] = useState(0);
    const [pedidos, setPedidos] = useState([])
    const [timer, setTimer] = useState(0);
    const [processingQuery, setProcess] = useState(false)
    

    const eliminarLista = () => {
        userComponent.eliminarLista(idLista)
            .then(result=>{
                alert(result.message)
                window.location.reload()
            })
            .catch(err => {
                alert(err)
            })
    }

    useEffect(()=> {

        if(localStorage.getItem("idusuario") === null || localStorage.getItem("idusuario") === undefined
        || localStorage.getItem("token") === null || localStorage.getItem("token") === undefined ){
          navigate('/')
        }else{
          if(localStorage.getItem('token') == false){
            navigate('/')
          }else{
            setIdUsuario(localStorage.getItem('idusuario'));
          }
        }

        if(!processingQuery){
            //Todos los restaurantes
            userComponent.getCarrito(localStorage.getItem("idusuario"))
            .then(result => {
                setProcess(true)
                if(result!= null){
                    let {idCarrito, idLista} = result;
                    setIdLista(idLista);
                    userComponent.getPedidos(idLista)
                        .then(resPedidos => {
                            if(resPedidos != null && resPedidos != undefined){
                                let data = [];
                                for(let index=0; index<resPedidos.length; index++){
                                    let element = resPedidos[index];
                                    let {idPedido, idlista_solicitud_pedido, 
                                        idProducto, cantidad, precio, descripcion} = element;
                                    userComponent.getProducto(idProducto)
                                        .then(res=> {
                                            let {nombreProducto, precioProducto, descripcionProducto} = res;
                                            data.push({
                                                idPedido: idPedido,
                                                idlista_solicitud_pedido: idlista_solicitud_pedido,
                                                idProducto: idProducto,
                                                nombreProducto: nombreProducto,
                                                precioProducto: precioProducto,
                                                descripcionProducto: descripcionProducto,
                                                cantidad: cantidad,
                                                precio: precio,
                                                descripcion: descripcion
                                            })
                                            if(index == (resPedidos.length -1)){
                                                setPedidos(data)
                                                setProcess(false)
                                            }
                                        })
                                }
                            }else{
                                throw "error servidor"
                                setProcess(false)
                            }
                        })
                }else{
                    throw "no se pudo obtener el carrito"
                }
            })
            .catch(err => {
                alert("No se pudo obtener los pedidos: "+err)
            })
        }
        

            const id = setInterval(() => {
                setTimer((prev) => prev + 1)
              }, 10000)
              return () => {
                clearInterval(id)
              }
              
            }, [timer])

    const showPedidos = pedidos.map(element => {

        let {idPedido, idlista_solicitud_pedido, 
            idProducto, nombreProducto, precioProducto, descripcionProducto,
            cantidad, precio, descripcion} = element;
        let pedido = {
            idPedido: idPedido,
            precioTotal: precio,
            cantidad: cantidad,
            descEspecial: descripcion
        }
        let producto = {
            idProducto: idProducto,
            nombreProducto: nombreProducto,
            precio: precioProducto,
            descripcionProducto: descripcionProducto
        }
        console.warn(JSON.stringify(pedido))
        console.error(JSON.stringify(producto))

        return(
            <ModalModify 
                idU={idUsuario}
                pedido={pedido}
                producto={producto}
            />
        )
    })

    const showButtons = () => {

        if(pedidos.length >0){
            return(
                <>
                <ModalSubmit
                        idU={idUsuario}
                        idL={idLista}
                    />
                    --------------------
                    
                </>
            )
        }
    }

    return (
        <>
        <div className='cardU'>
            <NavFact />
            <h1 className='text-center'>Carrito De Compras</h1>
            <h2 className ='text-center'>Productos</h2>   
            
            <table className='table table-hoverrr'>
                <thead>
                    <tr>
                        <th>PRODUCTO</th>
                        <th>CANTIDAD</th>    
                        <th>PRECIO_TOTAL</th>    
                        <th>DESCRIPCION</th>                                          
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>                 
                    {showPedidos}
                </tbody>
            </table>                   
            <div className='cardDisplay'>
                
                {showButtons()}
                <ButtonRed onClick={() => eliminarLista()}>Cancelar Pedido</ButtonRed>
            </div>
            <br/>
        </div>

        <br/><br/>
        </>
        
    );
}


export default Encarritocompras;
