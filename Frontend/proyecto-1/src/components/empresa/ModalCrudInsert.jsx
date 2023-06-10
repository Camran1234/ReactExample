import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'
import handlerCrud from './CrudInject'
import {ButtonGreen, ButtonWrapper, ButtonRed, InputLarge, InputSmall} from './CrudInject'
import Form from 'react-bootstrap/Form';
import { userComponent } from '../UserComponent';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      width: '40%',
      height: '50%',
      margin: 'auto',
      background: 'rgba(223,223,235,255)',
      align: 'center'
    },
  };

  
  

const ModalCrudInsert = ({empresa}) => {
    const [idEmpresa, setIdEmpresa] = useState(empresa)
    const [access, setAccess] = useState(false)
    const [timer, setTimer] = useState(0)
    //datos pregrabados
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    //Form producto
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState(0);
    const [descripcion, setDescripcion] = useState("")
    const [productosOferta, setProductosOferta] = useState([])
    const [foto, setFoto] = useState("")
    const [oferta, setOferta] = useState(false)

    //Momentaneo
    const [productoSelect, setProductSelect] = useState(0)
/**
 * body: {
 *  idEmpresa: 1
 *  nombreProducto: capuchino,
 *  categoria: cafes,
 *  precio: 0.12,
 *  descripcion: "descripcion",
 *  oferta: false,
 *  productosOferta: [
 *      {
 *          idProducto: 1
 *      },
 *      {
 *          idProducto: 2
 *      }
 *  ],
 *  foto: "Link"
 * }
 */
    const handleForm = () => {
        let product = {
            idEmpresa: idEmpresa,
            nombreProducto: nombre,
            categoria: categoria,
            precio: precio,
            descripcion: descripcion,
            oferta: oferta,
            productosOferta: productosOferta,
            foto: foto
        }

        handlerCrud.insertProduct(product)
            .then(result => {
                alert("Ingresado: "+result.message);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handlePrecio = (valor) => {
        if(valor < 0){
            setPrecio(0);
        }else{
            setPrecio(valor);
        }
    }

    const options = categorias.map((element) => (
        <option key={element.idCategoria} value={element.categoria}>
            {element.categoria}
        </option>
    )); 

    const optionProductos = productos.map((href) => {
        return(
            <option key={href.idProducto} value={href.idProducto}>
                {href.nombreProducto}
            </option>
        )
    });

    const optionProductosOfertados = productosOferta.map((href) => {
        
        return(
            <li>{href.nombreProducto}</li>
        )
    })

    const handleOfertaAdd= () => {        
        const foundObject = productos.find(obj => obj.idProducto == productoSelect);
        const name = foundObject ? foundObject.nombreProducto : null;
        let productosOfertados = productosOferta;
        productosOfertados.push({
            idProducto: productoSelect,
            nombreProducto: name
        })
        setProductosOferta(productosOfertados)
    }

    const handleOfertaChange= (event) => {        
        setProductSelect(event.target.value);
        console.log("Seleccionado: "+event.target.value);
    }
    
    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    }

    useEffect(()=> {
        //actualizando valores cada segundo
        setIdEmpresa(empresa)
        userComponent.getCategorias()
            .then(result=> {
                setCategorias(result);
            })
            .catch(error => {
                console.error(error)
            })

        userComponent.productoEmpresa(empresa)
            .then(result => {            
                let productos = [];
                if(result != undefined && result != null){
                    productos = result;
                }
                setProductos(productos)
            })
            .catch(error => {
                console.error(error)
            })

        const id = setInterval(() => {
            setTimer((prev) => prev + 1)
          }, 1000)
        return () => {
            clearInterval(id)
        }
              
    }, [timer])

      return(
        <>
            <ButtonWrapper>
                <ButtonGreen onClick={() => setAccess(true)}>Agregar Producto</ButtonGreen>
            </ButtonWrapper>
            {access && (
                <>
                    <Modal
                        isOpen={access}
                        onRequestClose={() => setAccess(false)}
                        style={customStyles}
                    >
                        <Form className='form-modal' onSubmit={handleForm}>                        

                            <div className='form-modal item'>
                                <Form.Label column sm="4">
                                    Nombre Producto
                                </Form.Label>
                                <Form.Control type="text" value={nombre} 
                                onChange={(e) => setNombre(e.target.value)}
                                required/>
                                
                            </div>
                            <div className='form-modal container horizontal'>
                                <Form.Label column sm="7">
                                    Categoria
                                    <Form.Control type="text"  value={categoria} 
                                    onChange={(e) => setCategoria(e.target.value)}
                                    required/>
                                </Form.Label> 
                                
                                <Form.Label column sm="4">
                                    Existentes
                                    <Form.Select onChange={handleCategoriaChange}>
                                        <option value="">Choose...</option>
                                        {options}
                                    </Form.Select>

                                </Form.Label> 
                                
                            </div>
                            <div className='form-modal item'>
                            <Form.Label column sm="6">
                                Precio
                                <Form.Control type="number" value={precio} 
                                onChange={(e) => handlePrecio(e.target.value)}
                                required
                                />
                            </Form.Label>
                            
                            </div>
                            <div className='form-modal item'>                                
                                <Form.Label column sm="12">
                                    Descripcion
                                    <Form.Control as="textarea" rows={3} value={descripcion} 
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                    />
                                </Form.Label>
                                
                            </div>
                            <div className='form-modal item'>
                                <Form.Label row="true" >
                                    <Form.Check 
                                    type="checkbox"
                                    label="¿Es oferta?"
                                    onChange={(e) => setOferta(e.target.checked)}></Form.Check>
                                </Form.Label>
                            </div>
                            {oferta ? (
                                <div className='form-modal container horizontal'>
                                    <ul>
                                        {optionProductosOfertados}
                                    </ul>
                                    <div className='form-modal container vertical'>
                                        <Form.Label column sm="8">
                                            Productos
                                            <Form.Select onChange={handleOfertaChange}>
                                                <option value="">Escoger</option>
                                                {optionProductos}
                                            </Form.Select>
                                        </Form.Label> 
                                        <ButtonGreen type="button" onClick={() => handleOfertaAdd()}>Agregar</ButtonGreen>
                                    </div>

                                </div>
                            ): null}
                            <div className='form-modal item'>
                                <Form.Label column sm="12">
                                    Foto
                                    <Form.Control as="textarea" rows={5} value={foto} 
                                    onChange={(e) => setFoto(e.target.value)}
                                    required
                                    />
                                </Form.Label>
                            </div>
                            <div className='form-modal item'>
                                <ButtonWrapper>
                                    <ButtonGreen type='submit'>Ingresar</ButtonGreen>
                                    <ButtonRed onClick={() => setAccess(false)}>Atras</ButtonRed>
                                </ButtonWrapper>       
                            </div>    
                        </Form>
                    </Modal>
                </>
            )}
        </>
        
      )
}

export {ModalCrudInsert}