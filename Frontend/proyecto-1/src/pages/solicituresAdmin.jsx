import axios from 'axios';
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/SolicitudesAdmin.css';
import NavbarAdmin from '../components/NavbarAdmin';
import { useNavigate } from 'react-router-dom';

const SolicitudesAdmin = () => {
    const [repartidores, setRepartidores] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [repartidorSeleccionado, setRepartidorSeleccionado] = useState({nombre:"default", apellido:"default", celular:"0000000", ciudad:"default", departamento:"default", correo:"default@default.com", cv:"www.google.com", nit:"0000000000", nombreComercial:"default", razonSocial:"default", telefono:"00000000-0"});
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState({nombre:"default", direccion:"default", departamento:"default", ciudad:"default"});
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("admin") === undefined || localStorage.getItem("admin") === null
        || localStorage.getItem("token") === undefined || localStorage.getItem("token") === null){
            navigate('/')
        }else{
            if(localStorage.getItem("admin") == false || localStorage.getItem("token") === false){
                navigate('/')
            }
        }
        

        const getSolicitudes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/solicitudes');
                setRepartidores(response.data.repartidores);
                setEmpresas(response.data.empresas);
            } catch (error) {
                console.log(error);
            }
        };
        getSolicitudes();
    }, []);

    const handleDetalle = (index) => {
        const repartidor = repartidores[index];
        const repartidorTemp = {...repartidor}
        setRepartidorSeleccionado(repartidorTemp);
    };

    const handleDetalleEmpresa = (index) => {
        const empresa = empresas[index];
        const empresaTemp = {...empresa}
        setEmpresaSeleccionada(empresaTemp);
    }

    const hendleResponderSolicitud = (estado, id) => {
        let url = `http://localhost:4000/api/solrepartidor/${id}`;

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

            if(response.message === "Repartidor aprobado."){
                toast.success("Repartidor aprobado.");
            }else{
                toast.error("Repartidor rechazado.");
            }

            const nuevaListaRepartidores = repartidores.filter(repartidor => repartidor.idrepartidor !== id);
            setRepartidores(nuevaListaRepartidores);
        })
        .catch(error => console.error(error));

    }

    const showEmpresa = () => {
        return (
            <>
                {empresaSeleccionada && (
                    <div className="modal fade" id="staticBackdropEmp" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5 h1-admin" id="staticBackdropLabel">Empresa</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <table className="table table-striped">
                                        <tbody>
                                        <tr className='text-black'>
                                            <td>Nombre:</td>
                                            <td>{empresaSeleccionada.nombre}</td>
                                        </tr>
                                        <tr className='text-black'>
                                            <td>Dirección:</td>
                                            <td>{empresaSeleccionada.direccion}</td>
                                        </tr>
                                        <tr className='text-black'>
                                            <td>Departamento:</td>
                                            <td>{empresaSeleccionada.departamento}</td>
                                        </tr>
                                        <tr className='text-black'>
                                            <td>Ciudad:</td>
                                            <td>{empresaSeleccionada.ciudad}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => hendleResponderSolicitudEmpresa(1, empresaSeleccionada.idEmpresa)} data-bs-dismiss="modal">Aprobar</button>
                                    <button type="button" className="btn btn-danger" onClick={() => hendleResponderSolicitudEmpresa(2, empresaSeleccionada.idEmpresa)} data-bs-dismiss="modal">Rechazar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }

    const showRepartidor = () => {
        return(
            <>
                {repartidorSeleccionado && (
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5 h1-admin" id="staticBackdropLabel">Repartidor</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <table className="table table-striped">
                                        <tbody>
                                        <tr className='text-black'>
                                            <td>Nombre:</td>
                                            <td>{repartidorSeleccionado.nombre + " " + repartidorSeleccionado.apellido}</td>
                                        </tr>
                                        <tr className='text-black'>
                                            <td>Celular:</td>
                                            <td>{repartidorSeleccionado.celular}</td>
                                        </tr>
                                        <tr className='text-black'>
                                            <td>Ciudad:</td>
                                            <td>{repartidorSeleccionado.ciudad}</td>
                                        </tr>
                                        <tr className='text-black'>
                                            <td>Departamento:</td>
                                            <td>{repartidorSeleccionado.departamento}</td>
                                        </tr>
                                        <tr className='text-black'>
                                            <td>Correo:</td>
                                            <td>{repartidorSeleccionado.correo}</td>
                                        </tr>
                                        <tr className='text-black'>
                                            <td>CV:</td>
                                            <td><a className='a-cv-admin' href={repartidorSeleccionado.cv} target="_blank">{repartidorSeleccionado.cv}</a></td>
                                        </tr>
                                        <tr className='text-black'>
                                            <td>NIT:</td>
                                            <td>{repartidorSeleccionado.nit}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => hendleResponderSolicitud(1, repartidorSeleccionado.idrepartidor)} data-bs-dismiss="modal">Aprobar</button>
                                    <button type="button" className="btn btn-danger" onClick={() => hendleResponderSolicitud(2, repartidorSeleccionado.idrepartidor)} data-bs-dismiss="modal">Rechazar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }

    const hendleResponderSolicitudEmpresa = (estado, id) => {
        let url = `http://localhost:4000/api/solempresa/${id}`;

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

            if(response.message === "Empresa aprobada."){
                toast.success("Empresa aprobada.");
            }else{
                toast.error("Empresa rechazada.");
            }

            const nuevaListaEmpresas = empresas.filter(empresa => empresa.idEmpresa !== id);
            setEmpresas(nuevaListaEmpresas);
        })
        .catch(error => console.error(error));

    }


    return (
        <div>
            {showRepartidor()}
            {showEmpresa()}
            <div className='div-nav-admin'>
                <NavbarAdmin />
            </div>
            <div className='container mt-4'>
                <h1 className='text-center h1-admin'>Solicitudes</h1>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header encabezado-acordion-admin">
                            <button className="accordion-button fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Repartidores
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <table className='table table-hover'>
                                    <thead className='table-success'>
                                    <tr className="text-black">
                                        <th>Nombre</th>
                                        <th>Celular</th>
                                        <th>Correo</th>
                                        <th>CV</th>
                                        <th>Detalle</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {repartidores.map((repartidor, index) => (
                                            <tr className="text-black" key={index}>
                                                <td>{repartidor.nombre}</td>
                                                <td>{repartidor.celular}</td>
                                                <td>{repartidor.correo}</td>
                                                <td><a className='a-cv-admin' href={repartidor.cv} target="_blank">{repartidor.cv}</a></td>
                                                <td>
                                                    <button 
                                                    type='button' 
                                                    className='btn btn-primary' 
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                    onClick={() => handleDetalle(index)}
                                                    >Ver detalle</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header encabezado-acordion-admin">
                            <button className="accordion-button collapsed fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Empresas
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <table className='table table-hover m-2'>
                                    <thead className='table-success'>
                                        <tr className='text-black'>
                                            <th>Nombre</th>
                                            <th>Dirección</th>
                                            <th>Departamento</th>
                                            <th>Ciudad</th>
                                            <th>Detalle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {empresas.map((empresa, index) => (
                                            <tr className='text-black' key={index}>
                                                <td>{empresa.nombre}</td>
                                                <td>{empresa.direccion}</td>
                                                <td>{empresa.departamento}</td>
                                                <td>{empresa.ciudad}</td>
                                                <td>
                                                    <button
                                                    type='button'
                                                    className='btn btn-primary'
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdropEmp"
                                                    onClick={() => handleDetalleEmpresa(index)}
                                                    >Ver detalle</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>                            
                            </div>
                        </div>
                    </div>
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
        </div>
    );
}

export default SolicitudesAdmin;
