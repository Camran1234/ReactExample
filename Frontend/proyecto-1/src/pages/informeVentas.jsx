import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavbarAdmin from "../components/NavbarAdmin";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/NavbarAdmin.css'
import '../styles/informeUsuario.css'

const InformeVentas = () => {
    const navigate = useNavigate();
    const [totalPedidos, setTotalPedidos] = useState(0);
    const [pedidosEmpresa, setPedidosEmpresa] = useState([]);
    const [productosMasVendidos, setProductosMasVendidos] = useState([]);
    const [empresasMasPedidos, setEmpresasMasPedidos] = useState([]);

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
                const response = await axios.get('http://localhost:4000/api/informeventas')
                setTotalPedidos(response.data.total_pedidos)
                setPedidosEmpresa(response.data.pedidos_empresa)
                setProductosMasVendidos(response.data.productos_mas_vendidos)
                setEmpresasMasPedidos(response.data.empresas_mas_pedidos)

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
            <h1>Informe de ventas</h1>
            <h2 className="h2-informe">Total de pedidos generados: {totalPedidos}</h2>
            <div className='container bg-light'>
                <h2>Total de pedidos por empresa</h2>
                <table className='table table-hover table-striped m-2'>
                    <thead className='table-success'>
                        <tr className='text-black'>
                            <th scope='col'>Empresa</th>
                            <th scope='col'>Cantidad de pedidos</th>
                            <th scope='col'>Precio Total (Q)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosEmpresa.map((usuario, index) =>  (
                            <tr className='text-black' key={index}>
                                <td>{usuario.empresa}</td>
                                <td>{usuario.cantidad_pedidos}</td>
                                <td>{usuario.precio_total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='container bg-light'>
                <h2>Productos mas vendidos</h2>
                <table className='table table-hover table-striped m-2'>
                    <thead className='table-success'>
                        <tr className='text-black'>
                            <th scope='col'>ID producto</th>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Cantidad Vendida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosMasVendidos.map((usuario, index) =>  (
                            <tr className='text-black' key={index}>
                                <td>{usuario.idProducto}</td>
                                <td>{usuario.nombreProducto}</td>
                                <td>{usuario.cantidad_vendida}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='container bg-light'>
                <h2>Empresas con mas pedidos</h2>
                <table className='table table-hover table-striped m-2'>
                    <thead className='table-success'>
                        <tr className='text-black'>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Total pedidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresasMasPedidos.map((usuario, index) =>  (
                            <tr className='text-black' key={index}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.total_pedidos}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InformeVentas;