import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavFact } from '../../components/UserComponent';
import { ofertaSqlConfigure, ButtonRed } from '../../components/usuario/OfertaComponents';
import "../../styles/Usuario.css"
import { useState } from "react";
import { ModalPopup } from "../../components/ModalPopup";

const MenuProductos = () => {
    const navigate = useNavigate();
    const {idEmpresa, empresa} = useParams();
    const [idUsuario, setUsuario] = useState(0);
    const [idLista, setLista] = useState(0);
    const [productos, setProductos] = useState([]);
    const [productosOferta, setProductosOferta] = useState([]);
    const [oferta, setOferta] = useState(false);


    const handleDisplay = (idProducto, nombreProducto) => {
        console.log("Function no soported, params: "+idProducto)
    }

    useEffect(() => {
        if(localStorage.getItem("idusuario") === null || localStorage.getItem("idusuario") === undefined
        || localStorage.getItem("token") === null || localStorage.getItem("token") === undefined ){
          navigate('/')
        }else{
          if(localStorage.getItem('token') == false){
            navigate('/')
          }else{
            setUsuario(localStorage.getItem("idusuario"));
          }
        }

        ofertaSqlConfigure.getProductos(idEmpresa)
            .then(result => {
                console.warn(JSON.stringify(result))
                if(result && result.length>0){
                    setProductos(result)
                }
            })
            .catch(error => {
                console.error(error)
            })

        ofertaSqlConfigure.getProductosOfertas(idEmpresa)
            .then(result => {
                if(result && result.length >0){
                    setOferta(true)
                    setProductosOferta(result)
                }
            })
            .catch(error => {
                console.error(error)
            })


    }, [])


    const displayProductosOferta = productosOferta.map((element) => {
        return(
            <>
                <ModalPopup 
                    producto = {element}
                    idusuario={localStorage.getItem("idusuario")}
                    display = {false}
                />
            </>
        )
    })

    const displayProductos = productos.map((element) => {
        return(
            <>
                <ModalPopup 
                    producto = {element}
                    idusuario={localStorage.getItem("idusuario")}
                    display = {false}
                />
            </>
        )
    })

    const showProductosOferta = () => {
        
        return(
            <>
                {oferta && (
                    <>
                    <h3 className='text-left black'>Ofertas</h3>
                    <div className='cardMenu-container horizontal'>
                        {displayProductosOferta}
                    </div>
                    </>
                )}
            </>
        )
        
    }

    return (
        <div className='cardMenu'>
            <NavFact />
            <div className='cardMenu-container'>
                <h1 className='text-center black'>{empresa}</h1>
                    {showProductosOferta()}
                <h3 className='text-left black'>Productos</h3>
                <div className='cardMenu-container horizontal'>
                    {displayProductos}
                </div>
            </div>
            
        </div>
    );

}

export default MenuProductos;