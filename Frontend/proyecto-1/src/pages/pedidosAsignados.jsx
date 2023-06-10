import axios from 'axios';
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PedidosAsignados = () => {
    const [solicitud, setSolicitud] = useState([]);  
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState({nombre:"default", apellido:"default", celular:"0000000", ciudad:"default", departamento:"default", correo:"default@default.com", cv:"www.google.com", nit:"0000000000", nombreComercial:"default", razonSocial:"default", telefono:"00000000-0"});
   
    useEffect(() => {
        const getSolicitudes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/pedidosAsignados');
                console.log(response.data)
                setSolicitud(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getSolicitudes();
    }, []);

    const handleDetalle = (index) => {
        const detalleSolicitud = solicitud[index];
        const detalleSolicitudTemp = {...detalleSolicitud}
        setSolicitudSeleccionada(detalleSolicitudTemp);
    };



    return (
        <div className='container mt-4'>
            <h1 className='text-center'>PEDIDOS ASIGNADOS</h1>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button fs-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            PEDIDOS ASIGNADOS
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <table className='table table-hover'>
                                <thead className='table-success'>
                                <tr>
                                    <th>NOMBRE</th>                             
                                    <th>PEDIDO</th>
                                    <th>ESTADO DEL PEDIDO</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {solicitud.map((detalleSolicitud, index) => (
                                        <tr key={index}>                                           
                                            <td>{detalleSolicitud.nombre + " "+ detalleSolicitud.apellido}</td>                                
                                            <td>{detalleSolicitud.nombreProducto}</td>                                   
                                            <td>
                                                <button 
                                                type='button' 
                                                className='btn btn-primary' 
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                onClick={() => handleDetalle(index)}
                                                >{detalleSolicitud.estado}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">   
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <table className='table table-hover m-2'>
                                <thead className='table-success'>
                                    <tr>
                                    <th>NOMBRE</th>                             
                                    <th>PEDIDO</th>
                                    <th>ESTADO DEL PEDIDO</th>
                                    </tr>
                                </thead>                           
                            </table>                            
                        </div>
                    </div>
                </div>
            </div>
            {solicitudSeleccionada && (
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">detalleSolicitud</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-striped">
                                    <tbody>
                                    <tr>
                                        <td>NOMBRE:</td>
                                        <td>{solicitudSeleccionada.nombre }</td>
                                    </tr>
                                    <tr>
                                        <td>PEDIDO:</td>
                                        <td>{solicitudSeleccionada.nombreProducto}</td>
                                    </tr>
                                    <tr>
                                        <td>ESTADO:</td>
                                        <td>{solicitudSeleccionada.estado}</td>
                                    </tr>                                    
                                                                       
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                        </div>
                    </div>
                </div>
            )}

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
}

export default PedidosAsignados;