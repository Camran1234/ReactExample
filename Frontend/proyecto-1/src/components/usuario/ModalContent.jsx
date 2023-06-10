import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {ButtonRed, ofertaSqlConfigure} from './OfertaComponents'
import '../../styles/Usuario.css'
import {ButtonGreen, ButtonWrapper} from '../empresa/CrudInject'
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

const ModalContent = ({idProducto}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [productos, setProductos] = useState([]);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        ofertaSqlConfigure.getContenidoOfertas(idProducto)
            .then(result => {
                if(result && result.length > 0){
                    setProductos(result)
                }
            })
            .catch(error => {
                console.error("Modal Content Error: "+JSON.stringify(error``))
            })
    }, [])

    const openModal = () => {
        setIsOpen(true);
      };
    
      const closeModal = () => {
        setIsOpen(false);
      };

    const displayProductos = productos.map((element) => {
        return(
            <div className='form-modal item'>
                <h3 className='text-left-black'>{element.nombreProducto}</h3>
                <img className='image-display' src={element.foto}/>
            </div>
        )
    })

    return(
    <>
        <ButtonRed type="button" onClick={openModal}>Ver</ButtonRed>
        {isOpen && (
            <>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                    style={customStyles}
                >
                    <div className='form-modal'>
                        {displayProductos}
                        <ButtonWrapper>
                                <ButtonGreen onClick={closeModal}>Regresar</ButtonGreen>
                        </ButtonWrapper> 
                    </div>
                </Modal>
            </>
        )}
    </>
    
    )
}

export {ModalContent}