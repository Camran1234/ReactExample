import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarAdmin from "../components/NavbarAdmin";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/NavbarAdmin.css'
import '../styles/informeUsuario.css'

const InformeUsuarios = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [usuariosActivos, setUsuariosActivos] = useState(0);
    const [usuariosFrecuentes, setUsuariosFrecuentes] = useState([]);

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
                const informe = await axios.get('http://localhost:4000/api/informeusuarios')
                setTotalUsuarios(informe.data.total_usuarios)
                setUsuariosActivos(informe.data.usuarios_activos)
                setUsuariosFrecuentes(informe.data.usuarios_pedidos)

            } catch (error) {
                console.log("Error al consumir el api", error)
            }
        };
        getUsuarios();
    }, []);

    return(
        <div>
            <div className='div-nav-admin'>
                <NavbarAdmin />
            </div>
            <h1>Informe de usuarios</h1>

            <h2 className="h2-informe">Total de usuarios: {totalUsuarios}</h2>
            <h2 className="h2-informe">Usuarios activos: {usuariosActivos}</h2>

            <div className='container bg-light'>
                <h2>Usuarios frecuentes</h2>
                <table className='table table-hover table-striped m-2'>
                    <thead className='table-success'>
                        <tr className='text-black'>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Apellido</th>
                            <th scope='col'>Correo</th>
                            <th scope='col'>Numero de pedidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFrecuentes.map((usuario, index) =>  (
                            <tr className='text-black' key={index}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.num_pedidos}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default InformeUsuarios;