import axios from "axios";
import { useEffect, useState } from "react";
import { NavFactory } from "../components/RestaurantComplements";
import ruta from "./Ruta";

function ReporteRestaurante() {

    const [reporteFecha, SetReporteFecha] = useState([])
    const [productos, SetProductos] = useState([])
    const [reporteProductos, SetReporteProductos] = useState([])
    const [reporteVentas, SetReporteVentas] = useState([])
    const [producto, setProducto] = useState('')
    const [fecha, setFecha] = useState('')

    const handleReporteFechas = () => {
        axios.post(ruta.ip+':'+ruta.puerto+'/api/reportes/restauranteDate', {
            fecha: fecha,
            idEmpresa: localStorage.getItem("idEmpresa")
        })
        .then(response => {
            console.log(response.data.result)
            SetReporteFecha(response.data.result)
        })
        .catch(error => {console.log(error)})
        handleReporteVentas()
    }

    const handleReporteVentas = () => {
        axios.post(ruta.ip+':'+ruta.puerto+'/api/reportes/restauranteVentas', {
            fecha: fecha,
            idEmpresa: localStorage.getItem("idEmpresa")
        })
        .then(response => {
            console.log(response.data.result)
            SetReporteVentas(response.data.result)
        })
        .catch(error => {console.log(error)})
    }

    const ProductoHandle = (event) => {
        setProducto(event.target.value)
    }

    const FechaHandle = (event) => {
        setFecha(event.target.value)
        console.log(event.target.value)
    }

    const handleReporteProductos = () => {
        axios.post(ruta.ip+':'+ruta.puerto+'/api/reportes/restauranteProduct', {
            idProducto: producto,
            idEmpresa: localStorage.getItem("idEmpresa")
        })
        .then(response => {
            console.log(response.data.result)
            SetReporteProductos(response.data.result)
        })
        .catch(error => {console.log(error)})
    }

    const handleViewProducts = () => {
        axios.get(ruta.ip+':'+ruta.puerto+'/api/obtenerProductos', {})
        .then(response => {
            console.log(response.data.result)
            SetProductos(response.data.result)
        })
        .catch(error => {console.log(error)})
    }

    useEffect(() => {
        handleViewProducts()
    }, [])

    return (
        <div>
            <NavFactory/>
            <h1>Reporte de Restaurante</h1>
            <div>
                <div>
                    <h2 style={{color: 'white'}}>Filtrar por Producto</h2>
                    <select
                        label='Productos'
                        onChange={ProductoHandle}
                        value={producto}
                        required>
                            <option>¿Qué producto es?</option>
                            {productos.map((prod) => {
                                return (
                                    <option
                                        value={prod.idProducto}>{prod.nombreProducto}</option>
                                )
                            })}
                    </select>
                    <button onClick={handleReporteProductos}>Filtrar</button>
                </div>
                <div>
                <table className='table table-hover' style={{background: 'blue'}}>
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Pedidos en Total</th>
                            <th>Ventas Totales</th>
                            <th>Calificacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reporteProductos.map((rep) => {
                            return (
                                <tr>
                                    <td>{rep.empresa}</td>
                                    <td>{rep.num_pedidos}</td>
                                    <td>{rep.ventas}</td>
                                    <td>{rep.calificacion}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
                <div>
                    <h2 style={{color: 'white'}}>Filtrar por Fecha</h2>
                    <input type="date" id="start" name="trip-start" onChange={FechaHandle} required/>
                    <button onClick={handleReporteFechas}>Filtrar</button>
                </div>
                <div>
                <table className='table table-hover' style={{background: 'blue'}}>
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Pedidos en Total</th>
                            <th>Ventas Totales</th>
                            <th>Calificacion</th>
                            <th>Producto más vendido</th>
                            <th>Cantidad más vendida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reporteFecha.map((rep) => {
                            return (
                                <tr>
                                    <td>{rep.empresa}</td>
                                    <td>{rep.num_pedidos}</td>
                                    <td>{rep.ventas}</td>
                                    <td>{rep.calificacion}</td>
                                    <td>{rep.producto}</td>
                                    <td>{rep.cantidad}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
                <div>
                <table className='table table-hover' style={{background: 'blue'}}>
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Pedidos en Total</th>
                            <th>Producto</th>
                            <th>Ventas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reporteVentas.map((rep) => {
                            return (
                                <tr>
                                    <td>{rep.empresa}</td>
                                    <td>{rep.num_pedidos}</td>
                                    <td>{rep.nombreProducto}</td>
                                    <td>{rep.ventas}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
            </div>
        </div>   
    )
}

export default ReporteRestaurante;