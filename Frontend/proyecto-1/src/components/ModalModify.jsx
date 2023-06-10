import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'
import '../styles/Usuario.css'
import {userComponent} from './UserComponent'
import {ButtonModify, ButtonEliminate} from './UserComponent'
// Set up the-modal
Modal.setAppElement('#root'); // Set the root element for accessibility purposes

/*
{
    pedido: {
        idPedido: 1
        precioTotal: 123
        cantidad: 1
        descEspecial: ASD
    }
    producto: {
        idProducto: 1
        nombreProducto: ASD
        precio: 123
        descripcion: desc
    }
}

*/

const ModalModify = ({idU, pedido, producto}) => {
  const [idUsuario, setIdUsuario] = useState(idU)
  const [isOpen, setIsOpen] = useState(false);
  const [idProducto, setIdProducto] = useState(producto.idProducto);
  const [nombreProducto, setNombreProducto] = useState(producto.nombreProducto);
  const [precio, setPrecio] = useState(producto.precio);
  const [descripcion, setDescripcion] = useState(producto.descripcionProducto);
  
  const [idPedido, setIdPedido] = useState(pedido.idPedido);  
  const [precioTotal, setPrecioTotal] = useState(pedido.precioTotal);
  const [cantidad, setCantidad] = useState(pedido.cantidad);
  const [descEspecial, setDescripcionEspecial] = useState(pedido.descEspecial);

  const [timer, setTimer] = useState(0);

  useEffect(()=> {
    //Todos los restaurantes  
      

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
      userComponent.getCarrito(idUsuario)
        .then(result => {
          if(result != null){
            let {idCarrito, idLista} = result;
            userComponent.modificarPedido(idPedido, cantidad, descEspecial)
                .then(result=>{
                    alert(result.message)
                    window.location.reload()
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

  return (
    <>      
      <tr key={idPedido}>
                            <td>{nombreProducto}</td>
                            <td>{cantidad}</td>  
                            <td>{precioTotal}</td>  
                            <td>{descEspecial}</td>  
                            <td onClick={openModal}>
                            <ButtonModify
                                message="Modificar"
                            />
                            </td>  
                            <td>
                            <ButtonEliminate
                                idPedido={idPedido}
                                message="Eliminar"
                            />
                            </td>  
                        </tr> 
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modify Modal"
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
                    id="quantity" placeholder={cantidad}
                    onChange={(e) => procesarPrecio(e)}></InputNumber>
            </div>
            <div className='cardModal-item'>
                <h3 className='text-center-modal'>Descripcion</h3>
                <h5>{descripcion}</h5>
                <br></br><br></br>
                <h3 className='text-center-modal'>Indicaciones Especiales</h3>
                <InputText type="text" name="desc" id="desc" value={descEspecial}
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

export {ModalModify};