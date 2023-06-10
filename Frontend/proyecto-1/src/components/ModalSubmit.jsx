import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'
import '../styles/Usuario.css'
import {userComponent} from './UserComponent'
// Set up the-modal
Modal.setAppElement('#root'); // Set the root element for accessibility purposes


const ModalSubmit = ({idU, idL}) => {
    const [idUsuario, setIdUsuario] = useState(idU)
    const [idLista, setIdLista] = useState(idL)
    const [isOpen, setIsOpen] = useState(false)
    const [timer, setTimer] = useState(0);
    const [departamentos, setDepartamentos] = useState([])
    const [departamentoS, setDepartamento] = useState(1)
    const [ciudades, setCiudades] = useState([])
    const [ciudadS, setCiudad] = useState(1)
    const [direccion, setDireccion] = useState("-")
    const [descripcion, setDescripcion] = useState("-")

    useEffect(()=> {
        //Todos los restaurantes  
          setIdLista(idL)
          setIdUsuario(idU)
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

  const handleDepartamento = (event) => {
    setDepartamento(event.target.value)
  };

  const handleCiudad = (event) => {
    setCiudad(event.target.value)
  };

  const handleSubmit = () => {

    userComponent.realizarPedido(idLista, descripcion, departamentoS, ciudadS, direccion)
        .then(result => {
            alert("Pedido realizado")
            window.location.reload()
        })
        .catch(err => {
            alert("No se pudo realizar el pedido"+err)
        })
  };

  const showDepartamentos = departamentos.map(element => {
    let {idDepartamento, departamento} = element;
    return (
        <>
            <option value={idDepartamento}>{departamento}</option>
        </>
    )
  })

  const showCiudades = ciudades.map(element => {
    let {idCiudad, ciudad, departamento} = element;

    if(departamento == departamentoS){
        return (
            <>
                <option value={idCiudad}>{ciudad}</option>
            </>
        )
    }

  })

  useEffect(()=> {
    //Todos los restaurantes  
    userComponent.obtenerDirecciones()
        .then(result => {
            let {departamentos, ciudades} = result;
            setDepartamentos(departamentos);
            setCiudades(ciudades);
        })  
        .catch(err => {
            console.error("ERROR DIRECCIONES: "+err)
        })
    const id = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 5000)
    return () => {
      clearInterval(id)
    }
    
  }, [timer])

//let {idLista ,descripcion, departamento, ciudad, direccion} = req.body
  return (
    <>      
      <ButtonGreen
        className="pad-left"
        onClick={openModal}
      >Realizar Pedido</ButtonGreen>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Submit Modal"
      >
        <button onClick={() => closeModal()}>Atras</button>

        <div className='principal'> 
            <div className='conteiner_login'>
                <div className='formularioUD'>
                <form onSubmit={handleSubmit}>
                    <br/><br/><br/><br/>
                    
                    <div className="form-text">
                        <input type="text" required   onChange={(e) => setDireccion(e.target.value)} ></input>
                        <label className="lbl-nombre">
                            <span className="text-nomb">Direccion</span>
                        </label>
                    </div>
                    <div className="form-text">
                        <input type="text" required onChange={(e) => setDescripcion(e.target.value)}></input>
                        <label className="lbl-nombre">
                            <span className="text-nomb">Descripcion</span>
                        </label>
                    </div>
                    <div className="form-text">
                        <label className="lbl-nombre">
                            <span className="text-nomb">Departamento</span>
                        </label>
                        <br/>
                        <br/>
                        <select className='pad-left' value={departamentoS} onChange={handleDepartamento}>
                            {showDepartamentos}
                        </select>                        
                    </div>

                    <div className="form-text">
                        <label className="lbl-nombre">
                            <span className="text-nomb">Ciudades</span>
                        </label>
                        <br/>
                        <br/>
                        <select className='pad-left' value={ciudadS} onChange={handleCiudad}>
                            {showCiudades}
                        </select>                        
                    </div>
                    <button type="submit" className="form-botonUD">Realizar Pedido</button>
                    
                </form> 
                </div>
                
            </div>
        </div> 
      </Modal>
    </>
  );
};

const ButtonGreen = styled.button`
  background-color: green;
  color: white;
  font-size: 20px;
  padding: 5px 40px;
  margin-left: 25%
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

export {ModalSubmit};