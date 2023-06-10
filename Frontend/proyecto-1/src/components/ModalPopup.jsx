import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'
import '../styles/Usuario.css'
import {userComponent} from './UserComponent'
import { ModalContent } from './usuario/ModalContent';
import { ButtonRed } from './usuario/OfertaComponents'
// Set up the-modal
Modal.setAppElement('#root'); // Set the root element for accessibility purposes

const ModalPopup = ({producto, idusuario, display}) => {
  const [idUsuario, setIdUsuario] = useState(idusuario)
  const [isOpen, setIsOpen] = useState(false);
  const [idProducto, setIdProducto] = useState(producto.idProducto);
  const [nombreProducto, setNombreProducto] = useState(producto.nombreProducto);
  const [precio, setPrecio] = useState(producto.precio);
  const [precioTotal, setPrecioTotal] = useState(producto.precio);
  const [cantidad, setCantidad] = useState(1);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [oferta, setOferta] = useState(producto.oferta)
  const [descEspecial, setDescripcionEspecial] = useState("-");
  const [foto, setFoto] = useState(producto.foto)
  const [timer, setTimer] = useState(0);
  const [moneda, setMoneda] = useState("Q");

  useEffect(()=> {
    //Todos los restaurantes  
      setIdUsuario(idusuario)
      setIdProducto(producto.idProducto);
      setNombreProducto(producto.nombreProducto);
      setPrecio(producto.precio);
      setDescripcion(producto.descripcion);
    const id = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    return () => {
      clearInterval(id)
    }
    
  }, [timer])

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const procesarPedido = (event) => {
    event.preventDefault();
    if(cantidad >0){
      console.log("Usuario: "+idUsuario)

      userComponent.getCarrito(idUsuario)
        .then(result => {
          if(result != null){
            let {idCarrito, idLista} = result;
            console.log("idLista: "+idUsuario)
            userComponent.agregarPedido(idLista, idProducto, cantidad, descEspecial)
              .then(resultAdd => {
                if(resultAdd != null){
                  alert(resultAdd.message)
                }else{
                  throw "sin comprobante de agregado"
                }
                window.location.reload()
              })  
              .catch(rejectAdd => {
                alert ("No se pudo agregar el pedido: "+rejectAdd)
              })

          }else{
            throw "no se pudo obtener el carrito"
          }
        })  
        .catch(reject => {
          alert("No se pudo agregar el pedido: "+reject)
        })
    }else{
      alert("La cantidad debe ser mayor a cero")
    }
  }

  const procesarPrecio = async (e) => {
    let data = e.target.value;
    setCantidad(data)
      if(data > 0 ){
        let precioTotal = data * precio;
        precioTotal = precioTotal.toFixed(2)
        setPrecioTotal(precioTotal)  
      }else{
        e.target.value = 1;
      }
      
  }

  const displayContent = () => {
    console.log("Displaying content")
  }

  return (
    <>      
      {display ? (
        <tr key={idProducto} onClick={openModal}>
          <td>{idProducto}</td>
          <td>{nombreProducto}</td>
          <td>{moneda}{precio}</td>    
          <td>{descripcion}</td>
          <td><img className="product-image" src={foto}></img></td>                          
        </tr>  
      ): (        
        <div className='cardMenu-item producto' >
            <img className="image-div" src={foto} onClick={openModal} />
            <div className='div-center'>
                <h5 className='text-center black'>{nombreProducto}</h5>
                {oferta ? (
                    <ModalContent
                      idProducto={idProducto}
                    />
                ): null}
            </div>
        </div>        
      )}
      
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>Atras</button>
        <form className='cardModal' onSubmit={procesarPedido}>
                <div className='cardModal-item'>
                <br></br>
                <br></br>
                <br></br>
                <br></br><br></br>
                
                <h3 className='text-center-modal'>Producto</h3>
                
            </div>
            <div className='cardModal-item'>
                <h3 className='text-center-modal'>Nombre Producto</h3>
                <h5>{nombreProducto}</h5>
            </div>
            <div className='cardModal-item'>
                <h3 className='text-center-modal'>Precio Unitario</h3>
                <h5>Q{precio}</h5>
                <br/><br/>
                <h3 className='text-center-modal'>Precio Total</h3>
                <h5>Q{precioTotal}</h5>
                <br/>
                <InputNumber type="number" name="quantity" 
                    id="quantity" placeholder='1'
                    onChange={(e) => procesarPrecio(e)}></InputNumber>
            </div>
            <div className='cardModal-item'>
                <h3 className='text-center-modal'>Descripcion</h3>
                <h5>{descripcion}</h5>
                <br></br><br></br>
                <h3 className='text-center-modal'>Indicaciones Especiales</h3>
                <InputText type="text" name="desc" id="desc"
                  onChange={(e) => setDescripcionEspecial(e.target.value)}
                ></InputText>
            </div>

            <div className='cardModal-item-deploy'>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
                <ButtonGreen type="submit">Solicitar</ButtonGreen>
                
            </div>
        </form>
      </Modal>
    </>
  );
};

const ButtonGreen = styled.button`
  background-color: green;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const InputNumber = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #0077cc;
  }
`

const InputText = styled.input `
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #0077cc;
  }
  ;
`

export {ModalPopup};