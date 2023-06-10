import { NavFact } from '../../components/UserComponent';
import "../../styles/Usuario.css"
import { ofertaSqlConfigure } from '../../components/usuario/OfertaComponents';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MenuRestaurantes = () => {
    const navigate = useNavigate();
    const [oferta, setOferta] = useState(false);
    const [empresasOferta, setEmpresasOferta] = useState([]);
    const [empresas, setEmpresas] = useState([]);


    const handleDisplay = (idEmpresa, empresa) => {
        navigate(`/usuario/empresa/${idEmpresa}/${empresa}`)
    }

    useEffect(() => {
        if(localStorage.getItem("idusuario") === null || localStorage.getItem("idusuario") === undefined
        || localStorage.getItem("token") === null || localStorage.getItem("token") === undefined ){
          navigate('/')
        }else{
          if(localStorage.getItem('token') == false){
            navigate('/')
          }else{
            //setIdUsuario(localStorage.getItem('idusuario'));
          }
        }

        ofertaSqlConfigure.getEmpresas()
            .then(result => {
                if(result){
                    setEmpresas(result);
                }
            })
            .catch(error => {
                console.error(error)
            })
        ofertaSqlConfigure.getEmpresasOfertas()
            .then(result => {
                if(result && result.length>0){
                    setOferta(true);
                    setEmpresasOferta(result);
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    const displayEmpresaOfertas = empresasOferta.map((element) => {
        return(
            <>
                <div className='cardMenu-item' onClick={() => handleDisplay(element.idEmpresa, element.nombre)}>
                    <h2 className='text-center black'>{element.nombre}</h2>
                </div>
            </>
        )
    });

    const showEmpresaOferta = () => {
        
        return(
            <>
                {oferta && (
                    <>
                    <h3 className='text-left black'>Ofertas</h3>
                    <div className='cardMenu-container horizontal'>
                        {displayEmpresaOfertas}
                    </div>
                    </>
                )}
            </>
        )
        
    }

    const showEmpresas = empresas.map((element) => {
        return(
            <>
                <div className='cardMenu-item' onClick={() => handleDisplay(element.idEmpresa, element.nombre)}>
                    <h2 className='text-center black'>{element.nombre}</h2>
                </div>
            </>
        )
    })

    return (
        <div className='cardMenu'>
            <NavFact />
            <div className='cardMenu-container'>
                <h1 className='text-center black'>Empresas</h1>

                {showEmpresaOferta()}

                <h3 className='text-left black'>Restaurantes</h3>
                <div className='cardMenu-container horizontal'>
                    {showEmpresas}
                </div>
            </div>
            
        </div>
    );

}

export default MenuRestaurantes;