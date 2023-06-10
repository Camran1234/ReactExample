import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import NavbarAdmin from '../components/NavbarAdmin';
import '../styles/NavbarAdmin.css';
import { useNavigate } from 'react-router-dom';

const DeshabilitarUsuario = () => {
    const navigate = useNavigate()
    const [usuarios, setUsuarios] = useState([]);
    //const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({idusuario:0, nombre:"Luis", apellido:"Dante", correo:"LuisDante@gmail.com", tarjeta:"123456789", celular:"58987465", direccion:"zona 4 diagonal 3 Villa nueva", estado:0,ciudad:"Villa Nueva", departamento:"Guatemala"})

    useEffect(() => {
        if(localStorage.getItem("admin") === undefined || localStorage.getItem("admin") === null
        || localStorage.getItem("token") === undefined || localStorage.getItem("token") === null){
            navigate('/')
        }else{
            if(localStorage.getItem("admin") == false || localStorage.getItem("token") === false){
                navigate('/')
            }
        }

        const getUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/usuarios')
                setUsuarios(response.data.usuarios)
            } catch (error) {
                console.log("Error al consumir el api", error)
            }
        };
        getUsuarios();
    }, []);

    const handleDesactivarActivar = (index, estado) => {
        let usuario = usuarios[index];
        let id = usuario.idusuario;

        let  url = `http://localhost:4000/api/estadousuario/${id}`;

        let config = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            body: JSON.stringify({
                estado: estado
            }),
            mode: 'cors'
        }

        fetch(url, config)
        .then(response => response.json())
        .then(data => {
            let response = data;

            if(response.message === "Usuario desactivado."){
                toast.warn("Usuario deshabilitado");
            }else{
                toast.success("Usuario habilitado.")
            }

            const nuevoArray = usuarios.map(usr => {
                if(usr.idusuario === usuario.idusuario){
                    usr.estado = estado;
                }
                return usr;
            })

            setUsuarios(nuevoArray);
        })
        .catch(error => console.log(error));
    }

    return(
        <div>
            <div className='div-nav-admin'>
                <NavbarAdmin />
            </div>
                <h1 className='mt-4 bg-success-subtle text-emphasis-success h1-admin'>Deshabilitar Usuario</h1>
            <div className='container bg-light'>
                <table className='table table-hover table-striped m-2'>
                    <thead className='table-success'>
                        <tr className='text-black'>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Apellido</th>
                            <th scope='col'>Correo</th>
                            <th scope='col'>Tarjeta</th>
                            <th scope='col'>Celular</th>
                            <th scope='col'>Dirección</th>
                            <th scope='col'>Ciudad</th>
                            <th scope='col'>Departamento</th>
                            <th scope='col'>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) =>  (
                            <tr className='text-black' key={index}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.tarjeta}</td>
                                <td>{usuario.celular}</td>
                                <td>{usuario.direccion}</td>
                                <td>{usuario.ciudad}</td>
                                <td>{usuario.departamento}</td>
                                <td>
                                    <button
                                    type='button'
                                    className={usuario.estado === 0 ? 'btn btn-warning' : 'btn btn-success' }
                                    onClick={() => {
                                        if(usuario.estado === 0){ //estado activo
                                            handleDesactivarActivar(index, 1);
                                        }else{ // usuario desactivado
                                            handleDesactivarActivar(index, 0);
                                        }
                                    }}
                                    >
                                        {usuario.estado === 0 ? 'Desactivar': 'Activar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
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
    );

};

export default DeshabilitarUsuario;