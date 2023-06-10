import axios from 'axios';
import React, {useEffect, useState, Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer, toast } from 'react-toastify';
import {NavFact} from '../components/UserComponent'
import "../styles/Usuario.css"
import { userComponent, ButtonRed, ButtonB } from '../components/UserComponent';
import { useNavigate } from 'react-router-dom';
import { MenuNav } from '../components/Complements';

const ComisionGenerada = () => {
    const navigate = useNavigate()
    const [idUsuario, setIdUsuario] = useState(1);
    const [comisiones, setComisiones] = useState(0);
    const [timer, setTimer] = useState(0)
    
    
    


    useEffect(()=> {
        //Todos los restaurantes

        if(localStorage.getItem("idrepartidor") === null || localStorage.getItem("idrepartidor") === undefined
        || localStorage.getItem("repartidor") === null || localStorage.getItem("repartidor") === undefined ){
          return;
        }else{
          if(localStorage.getItem('repartidor') == false){
            return;
          }else{
            setIdUsuario(localStorage.getItem('idrepartidor'))
          }
        }

        userComponent.getComisiones(localStorage.getItem('idrepartidor'))
            .then(result => {
                setComisiones(result)
            })
            .catch(error => {
                alert("ERROR: "+error)
            })


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
            <MenuNav />
            <h1 className='text-center'>Comisiones Totales del Repartidor</h1>
            <h1 className ='text-center'>Q{comisiones}</h1>  

            <br/>
        </div>

        <br/><br/>
        </>
        
    );
}


export default ComisionGenerada;
