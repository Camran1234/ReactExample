import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from "../components/NavbarAdmin";
import axios from 'axios';
import '../styles/NavbarAdmin.css'

const InformeRepartidor = () => {
    const navigate = useNavigate();
    const [repartidores, setRepartidores] = useState([]);

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
                const informe = await axios.get('http://localhost:4000/api/informerepartidor')
                setRepartidores(informe.data.reporte)

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
            <h1>Informe de repartidores</h1>

            <div className='container bg-light'>
                <table className='table table-hover table-striped m-2'>
                    <thead className='table-success'>
                        <tr className='text-black'>
                            <th scope='col'>ID Repartidor</th>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Apellido</th>
                            <th scope='col'>Correo</th>
                            <th scope='col'>Pedidos entregados</th>
                            <th scope='col'>Total puntos</th>
                            <th scope='col'>Total ganado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repartidores.map((usuario, index) =>  (
                            <tr className='text-black' key={index}>
                                <td>{usuario.idrepartidor}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.cant_envios}</td>
                                <td>{usuario.total_puntos}</td>
                                <td>{usuario.comision}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default InformeRepartidor;