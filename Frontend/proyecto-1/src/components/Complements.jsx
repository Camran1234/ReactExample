//npm install styled-components
import styled from 'styled-components'
import { renderMatches, useNavigate } from 'react-router-dom';
import { updateRepartidorStatus, getEstadoRepartidor, createComision, deliverOrder, cancelOrder, carrito} from "../components/RepartidorComplement"
import { userComponent } from './UserComponent';
import { useEffect } from 'react';
import { useState } from 'react';
import ruta from '../pages/Ruta'

const checkUser = async(repartidor) => {
  try{
    let data = {
        idRepartidor: repartidor
    }
    let config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET',
            'Access-Control-Request-Method': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
        body: JSON.stringify(data)
    }

    let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/check", config);
    let response = await request.json();
    if (response === undefined){
        alert("Error: servidor no disponible");
        return;
    }
    
    return response.estado;
}catch(error){
    console.log(error)
}
}

const MenuNav = () => {
  const navigate = useNavigate();
  const [calificacion, setCalificacion] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('repartidor');
    localStorage.removeItem('idrepartidor');
    navigate("/")
  };


  useEffect(() => {
      let usuarioRepartidor = localStorage.getItem('idrepartidor');
      if(usuarioRepartidor != undefined){
          checkUser(usuarioRepartidor)
            .then(result => {
              const estado = result;
              if(estado == 0){
                alert("Servicio bloqueado al repartidor, contactar al administrador")
                handleLogout()
              }
            })
            .catch(error => {
              alert(JSON.stringify(error))
            })

        userComponent.getCalificacion(usuarioRepartidor)
                .then(result => {
                    setCalificacion(result)
                })
                .catch(err => {
                    alert(err)
                })
      }
  }, [])


  return(
    <div className="w1-col m5">
                    <ul className="horizontal">
                        <li className="horizontal"><a  href="/repartidor/verPedidos">Pedidos</a></li>
                        <li className="horizontal"><a href="/repartidor/comisionGenerada">Comisiones Generadas</a></li>
                        <li className="horizontal"><a href="">Historial de Pedidos</a></li>
                        <li className="horizontal"><a href="">Mi Perfil</a></li>
                        <li className="horizontal" ><a className="active_right"> Calificacion: {calificacion}</a></li>
                        <li className="horizontalInv"><a className="right" href="/menuRepartidor">Regresar</a></li>
                    </ul>
      </div>
  )
}

const ButtonDelivery = ( {repartidor, message} ) => {
  const refresh = () => {
    window.location.reload()
  }

  const handleClick = () => {
    createComision(repartidor)
      .then( result => {
        deliverOrder(repartidor)
          .then( result1 => {
            alert("Orden entregada: "+result)
                refresh()
          })
          .catch(err => {
            alert("No se pudo entregar la orden: "+err)
          })
      })
      .catch( error => {
        alert("No se pudo generar la comision: "+error)
      })
  }

  return (
    <AcceptButton onClick={handleClick}>{message}</AcceptButton>
  )
}

const ButtonCancel = ( {repartidor, message}) => {
  const navigate = useNavigate();
  const refresh = () => {
    window.location.reload();
  }

  const handleClick = () => {
    const descripcionCancelacion = prompt('Ingrese la razon de la cancelacion')
    cancelOrder(repartidor, descripcionCancelacion)
      .then( result => {
        refresh()
      })
      .catch( error => {
        alert("No se pudo cancelar la orden "+error)
      })
  }

  return (
    <CancelButton onClick={handleClick}>{message}</CancelButton>
  )
}

const ButtonAccept = ( {disabledOption, repartidor, pedido, message}) => {
  const navigate = useNavigate();
  const refresh = () =>{
    //navigate('/repartidor/verPedidos/')
    window.location.reload()
}

  const handleClick = () => {
    let idRepartidor = repartidor;
    let idPedido = pedido;
    getEstadoRepartidor(idRepartidor)
            .then(result => {
                updateRepartidorStatus(idRepartidor, idPedido, result)
                    .then( result => {
                        alert("Estas siguiendo una nueva orden")
                        //localStorage.setItem("idRepartidor", idRepartidor);
                        refresh()
                    })
                    .catch( error => {
                        alert ("No se pudo seguir la orden, Error: "+error)
                    })
            })
            .catch( error => {
                alert (error.toString())
            })
  }

  return (
    <AcceptButton disabled={disabledOption}  
          onClick={handleClick}>{message}</AcceptButton>
  )

}



const AcceptButton = styled.button`
  background-color: green;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

const CancelButton = styled.button`
  background-color: red;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  text-align: center;
`

export {ButtonAccept, ButtonCancel, ButtonDelivery, ButtonGroup, MenuNav}