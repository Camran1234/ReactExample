import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@mui/material";
import "../styles/Usuario.css"
import ruta from "./Ruta";
import { userComponent, NavFact, ButtonB } from '../components/UserComponent';
import {ModalPopup} from '../components/ModalPopup'
import { useNavigate } from 'react-router-dom';


const Ennavegacioncategorias = () => {
    //const [arreglo,setArreglo] = usesState([]);
    const navigate = useNavigate()
    const [dataprocess, setDataProcess] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [timer, setTimer] = useState(0);
    const [idusuario, setIdUsuario] = useState(1);
    const [filtrado, setFiltrado] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [ID_PRODUCTO, setIdProducto] = useState(0);
    /*const link = document.querySelector(`link[href="repartidor/verPedidos"]`);
    if (link) {
      link.parentNode.removeChild(link);
    }*/
    


    const showProductos = productos.map((producto) => {
        return(
          <>
          <ModalPopup
          producto={producto}
          idusuario={localStorage.getItem("idusuario")}
          display = {true}
          />          
          </>
        )
    })
    
    const showEmpresas = empresas.map((element) => {
      let {idEmpresa, nombre, categoria_idcategoria} = element;
      if(categoria_idcategoria === undefined || categoria_idcategoria === null){
          categoria_idcategoria = ""
      }
        return(
          <>
          <tr key={categoria_idcategoria} onClick={() => mandoNombreEmpresa(idEmpresa)}>
          <td>{categoria_idcategoria}</td>
          <td>{nombre}</td>   
          <td>
          PRODUCTOS.
            
          </td>                   
          </tr>            
          </>
        )
    })

    const showCategories = dataprocess.map((row) => {
      let {idCategoria, categoria} = row;
      return(
        <>
        <tr key={idCategoria} onClick={() => mandoidCategoria(idCategoria)}>
          <td>{idCategoria}</td>
          <td>{categoria}          
          </td>  
          <td>
          BUSCAR
          </td>  
        </tr>        
        </>
      )
    })
 
    const showAll = () => {
      userComponent.getEmpresas()
        .then(result => {
          if(result.length >0){
            setEmpresas(result)
            setFiltrado(true)
          }
        })
        .catch(err => {
          alert("No se pudieron obtener las empresas "+err)
        })
    }

    const mandoidCategoria = async(idCategoria) => {
      userComponent.categoriaEmpresa(idCategoria)
        .then(result => {
          if(result == undefined || result == null){
            alert("Sin restaurantes")
          }else{
            console.log("Se esta consultando restaurantes.!!!"+ idCategoria)
            console.warn("Resultado query: "+JSON.stringify(result))
            setEmpresas(result)
            setProductos([])
            setFiltrado(true)
          }
        }).catch((err)=>{
          alert("Error al consultar restaurantes.");
        })
      }

      const mandoNombreEmpresa = async(nombreEmpresa) => {
          userComponent.productoEmpresa(nombreEmpresa)
            .then(result => {
              if(result == undefined || result == null){
                alert("Sin productos")
              }else{
                console.log("Se esta consultando productos !!!"+ nombreEmpresa)
                console.warn("Resultado query: "+JSON.stringify(result))
                setProductos(result)
                setFiltrado(true)
              }
            }).catch((err)=>{
              alert("Error al buscar productos de una empresa.");
            })
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

        userComponent.getCategorias()
        .then(result=> {
          setDataProcess(result)
        })  
        .catch(error => {
          console.error("No se pudo obtener las categorias: "+JSON.stringify(error))
        });
          
        const id = setInterval(() => {
          setTimer((prev) => prev + 1)
        }, 10000)
        return () => {
          clearInterval(id)
        }
        
      }, [timer])



    return (
      
      <div className = 'cardU'>
        
        <NavFact />
        <div className='container mt-4'>
          <ButtonB onClick={() => showAll()}>Mostrar Todo</ButtonB>
          <h1 className='text-center'>NAVEGACION DE CATEGORIAS</h1>
            <h1 className='text-center'>Categorias</h1>
            <table className='table table-hover'>
                <thead>
                <tr>
                    <th>ID_CATEGORIA</th>
                    <th>CATEGORIA</th>   
                    <th>ACCESO</th>                    
                </tr>
                </thead>
                <tbody>
                 {showCategories}
                </tbody>
            </table>
            <h1 className='text-center' >EMPRESAS</h1>  
            <table  className='table table-hover'>
                <thead>
                <tr>
                    <th>ID_CATEGORIA</th>
                    <th>NOMBRE_EMPRESA</th>  
                    <th>PRODUCTO_ARTICULOS</th>                      
                </tr>
                </thead>
                <tbody>                 
                     {showEmpresas}
                </tbody>
            </table>
            <h1 className='text-center' >PRODUCTOS</h1>  
            <table className='table table-hoverrr'>
                <thead>
                <tr>
                    <th>ID_PRODUCTO</th>
                    <th>NOMBRE_PRODUCTO</th>    
                    <th>PRECIO</th>    
                    <th>DESCRIPCION</th>
                    <th>Imagen</th>                                          
                </tr>
                </thead>
                <tbody>                 
                     {showProductos}
                </tbody>
            </table>
       
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
      </div>
        
    );
}

export default Ennavegacioncategorias;
