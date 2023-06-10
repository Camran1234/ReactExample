import axios from "axios";
import { useEffect, useState } from "react";


function Catalogo() {

    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [categoriaVer, setCategoriaVer] = useState('');
    const [empresas, setEmpresas] = useState([]);
    const [empresa, setEmpresa] = useState('');
    const [oferta, setOferta] = useState('');

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [productos, setProductos] = useState([]);

    const handleCategoria = () => {
        axios.get('http://localhost:4000/api/catalogo/categorias', {})
        .then(response => {
            console.log(response.data.result)
            setCategorias(response.data.result);
        })
        .catch(error => {console.log(error)})
    }

    const handleSetEmpresa = (event) => {
        setEmpresa(event.target.value)
    }
    
    const handleSetCategoria = (event) => {
        setCategoria(event.target.value)
    }

    const handleSetCategoriaVer = (event) => {
        setCategoriaVer(event.target.value);
    }

    const handleSetOferta = (event) => {
        setOferta(event.target.value)
    }

    const handleSetNombre = (event) => {
        setNombre(event.target.value)
    }

    const handleSetPrecio = (event) => {
        setPrecio(event.target.value)
    }

    const handleSetDescripcion = (event) => {
        setDescripcion(event.target.value)
    }


    const handleEmpresa = () => {
        axios.get('http://localhost:4000/api/catologo/empresas', {})
        .then(response => {
            console.log(response.data.result)
            setEmpresas(response.data.result);
        })
        .catch(error => {console.log(error)})
    }

    const handleGuardarProducto = () => {
        axios.post('http://localhost:4000/api/catalogo/agregarProducto', {
            nombre: nombre,
            categoria: categoria,
            precio: precio,
            empresa: empresa,
            descripcion: descripcion,
            oferta: oferta
        })
        .then(response => {
            alert(response.data.message)
        })
        .catch(error => {console.log(error)})
    }

    const handleViewProductos = () => {
        axios.post('http://localhost:4000/api/catologo/verProductoCategoria', {
            categoria: categoriaVer
        })
        .then(response => {
            setProductos(response.data.result)
        })
        .catch(error => {console.log(error)})
    }

    useEffect(() => {
        handleCategoria();
        handleEmpresa();
    }, []);

    return (
        <div className="principal">
            <h1>Catalogo de Productos</h1>
            <div className="conteiner-registro-empresa">
                <div>
                    <label style={{color: 'white'}}>Nombre del Producto</label>
                    <input type="text" required onChange={handleSetNombre}/>
                </div>
                <div>
                    <label style={{color: 'white'}}>Categorias</label>
                    <select
                        label='Categoria' 
                        onChange={handleSetCategoria}
                        value={categoria}
                        required>
                            <option value="">¿Que categoria es?</option>
                            {
                                categorias.map((categoria) => {
                                    return (
                                        <option value={categoria.idCategoria}>{categoria.categoria}</option>
                                    )
                                })
                            }
                    </select>
                </div>
                <div>
                    <label style={{color: 'white'}}>Precio</label>
                    <input type='text' onChange={handleSetPrecio} required/>
                </div>
                <div>
                    <label style={{color: 'white'}}>Empresas</label>
                    <select
                        label='Empresas' 
                        onChange={handleSetEmpresa}
                        value={empresa}
                        required>
                            <option value="">¿Que empresa es?</option>
                            {
                                empresas.map((empresa) => {
                                    return (
                                        <option 
                                            value={empresa.idEmpresa}
                                        >{empresa.nombre}</option>
                                    )
                                })
                            }
                    </select>
                </div>
                <div>
                    <label style={{color: 'white'}}>Descripcion</label>
                    <input onChange={handleSetDescripcion} type="text" required/>
                </div>
                <div>
                    <label style={{color: 'white'}}>oferta</label>
                    <select 
                        onChange={handleSetOferta}
                        value={oferta}
                        required
                    >
                        <option value="">¿Tiene oferta?</option>
                        <option value="1">Si</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div>
                    <button type='button' onClick={handleGuardarProducto}>Guardar Producto</button>
                </div>
                <br/><br/>
                <div>
                    <label style={{color: 'white'}}>Categorias</label>
                    <select
                        label='Categoria' 
                        onChange={handleSetCategoriaVer}
                        value={categoriaVer}
                        required>
                            <option value="">Categoria a Ver</option>
                            {
                                categorias.map((categoria) => {
                                    return (
                                        <option value={categoria.idCategoria}>{categoria.categoria}</option>
                                    )
                                })
                            }
                    </select>
                </div>
                <div>
                    <button type="button" onClick={handleViewProductos}>Ver Productos</button>
                </div>
                <div>
                    <table className='table table-hover'>
                        <thead className='table-success'>
                            <tr>
                            <th>Categoria</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Empresa</th>
                            <th>Descripcion</th>
                            <th>Oferta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((prod) => {
                                return (
                                    <tr>
                                        <td>{prod.categoria}</td>
                                        <td>{prod.nombre}</td>
                                        <td>{prod.precio}</td>
                                        <td>{prod.empresa}</td>
                                        <td>{prod.descripcion}</td>
                                        <td>{prod.oferta}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Catalogo;