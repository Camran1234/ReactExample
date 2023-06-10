import axios from 'axios';
import React, {useEffect, useState, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer, toast } from 'react-toastify';
import {NavFact} from '../components/UserComponent'
import "../styles/Usuario.css"
import { userComponent, ButtonRed, ButtonB } from '../components/UserComponent';
import { useNavigate } from 'react-router-dom';

const EntregaPago = () => {
    const navigate = useNavigate()
    const [idUsuario, setIdUsuario] = useState(1);
    const [idLista, setIdLista] = useState(0);
    const [idRepartidor, setIdRepartidor] = useState(0);
    const [pedidos, setPedidos] = useState([])
    const [timer, setTimer] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [estado, setEstado] = useState("");
    const [value, setValue] = useState(0);
    const [processingQuery, setProcess] = useState(false);
    
    
    const Calificar = () => {
        if(value >=1 && value<=5){
            userComponent.calificarOrden(idLista, idRepartidor, value)
                .then(result => {
                    alert("Orden Calificada ")

                })
                .catch(err => {
                    alert("ERROR: "+err)
                })
        }else{
            alert("Solo se permiten calificacions de 1 a 5")
        }
        
        
    }

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (parseInt(inputValue) >= 1 && parseInt(inputValue) <= 5) {
          setValue(inputValue);
        }
      };
    

    const showCalificacion = () => {
        if(estado == "Entregado"){
            return(
                <div className='center-calificacion'>
                    <label>calificar</label>
                    <input type="number" value={value} onChange={handleChange} />
                    <ButtonB onClick={Calificar}>Calificar</ButtonB>
                </div>
            )
        }
    }

    useEffect(()=> {
        //Todos los restaurantes

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
            console.warn("Calling: "+processingQuery)
            setProcess(true)
            userComponent.getCarrito(localStorage.getItem("idusuario"))
            .then(result => {
                if(result!= null){
                    let {idCarrito, idLista} = result;
                    setIdLista(idLista);
                    userComponent.obtenerEstado(idLista)
                        .then(resultEs => {
                            setProcess(false)
                            let {estado, repartidor_idrepartidor} = resultEs;
                            setEstado(estado)
                            setIdRepartidor(repartidor_idrepartidor)
                        })
                }
            })
            .catch(err => {

            })
        }
        


        const id = setInterval(() => {
          setTimer((prev) => prev + 1)
        }, 5000)
        return () => {
          clearInterval(id)
        }
        
      }, [timer])



    return (
        <>
        <div className='cardU'>
            <NavFact />
            <h1 className='text-center'>Estado Orden {idLista}</h1>
            <h2 className ='text-center-green'>{estado}</h2>               

            {showCalificacion()}
            <br/>
        </div>

        <br/><br/>
        </>
        
    );
}


export default EntregaPago;
