import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {NavFactory} from "../../components/RestaurantComplements"
import { userComponent } from '../../components/UserComponent';
import '../../styles/Empresa.css'

import  handlerCrud  from '../../components/empresa/CrudInject'
import { ButtonYellow, ButtonRed } from "../../components/empresa/CrudInject";
import { ModalCrudInsert } from "../../components/empresa/ModalCrudInsert";
import { ModalCrudModify } from "../../components/empresa/ModalCrudModify";


const CrudView = () => {
    const navigate = useNavigate();
    const [idEmpresa, setIdEmpresa] = useState(0)
    const [productos, setProductos] = useState([])
    
    const handleEliminate = (idProducto) =>{
      handlerCrud.deleteProducto(idProducto)
        .then(result => {
          alert("Producto Eliminado: "+result.message)
          window.location.reload();
        })
        .catch(error => {
          console.error(error)
        })
    }

    const showProductos= productos.map(element => {
      let isOfert = "no";
      if(element.oferta == 1){
        isOfert = "si";
      }
      return(
        <>
          <tr key={element.idProducto}>
            <td>{element.idProducto}</td>
            <td>{element.nombreProducto}</td>
            <td>{element.categoria}</td>
            <td>Q{element.precio}</td>
            <td>{element.descripcion}</td>
            <td>{isOfert}</td>
            <td><img className="product-image" src={element.foto}></img></td>
            <td>
              
              <ModalCrudModify
                producto={element}  
                empresa = {idEmpresa}
              />
            </td>
            <td>
              <ButtonRed onClick={() => handleEliminate(element.idProducto)}>Eliminar</ButtonRed>
            </td>
          </tr>
        </>
      )
      
      
    });


    useEffect(() => {
        if(localStorage.getItem("idEmpresa") === null || localStorage.getItem("idEmpresa") === undefined
        || localStorage.getItem("empresa") === null || localStorage.getItem("empresa") === undefined ){
          navigate('/')
        }else{
          if(localStorage.getItem('empresa') == false){
            navigate('/')
          }else{
            setIdEmpresa(localStorage.getItem('idEmpresa'));
          }
        }

        userComponent.productoEmpresa(localStorage.getItem('idEmpresa'))
          .then(result => {            
            let productos = [];
            if(result != undefined && result != null){
              productos = result;
            }
            for(let index=0; index<productos.length; index++){
              handlerCrud.getCategoriaName(productos[index].categoria_idcategoria)
              .then(categoria => {
                  productos[index].categoria=categoria;                

                  if(index == productos.length-1){
                    setProductos(productos)
                  }   
              })
              .catch(error => {
                alert("Error: "+ error)
              })
            }
          })
          .catch((err)=>{
            console.err(err)
          })

        

    }, [])

    return (
      <div>
        <div className="cardE">
          <NavFactory />
        <div className="cardE-table">
          <ModalCrudInsert 
            empresa = {idEmpresa}
          />
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>    
                <th>CATEGORIA</th>    
                <th>PRECIO</th>    
                <th>DESCRIPCION</th>
                <th>OFERTA</th>
                <th>IMAGEN</th>
                <th>MODIFICAR</th>
                <th>ELIMINAR</th>
              </tr>
            </thead>
            <tbody>                 
              {showProductos}
            </tbody>
          </table>
        </div>
        </div>     
        
     </div> 
    )
}



export default CrudView;