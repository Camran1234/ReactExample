import ruta from '../../pages/Ruta'
import styled from 'styled-components'


export const ofertaSqlConfigure = {};

ofertaSqlConfigure.getProductos = async (idEmpresa) => {
    try {
        let data = {
            idEmpresa: idEmpresa
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
            mode: 'cors',
            body: JSON.stringify(data)
        }
    
        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/ProductoEmpresa", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

ofertaSqlConfigure.getEmpresas = async () => {
    try {
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
            mode: 'cors',
        }
    
        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/GetEmpresas", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response.result;
    } catch (error) {
        console.log(error);
    }
}

ofertaSqlConfigure.getEmpresasOfertas = async () => {
    try {
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
            mode: 'cors',
        }
    
        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/getEmpresasOfertas", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response.empresas;
    } catch (error) {
        console.log(error);
    }
}

ofertaSqlConfigure.getProductosOfertas = async (idEmpresa) => {
    try {
        let data = {
            idEmpresa: idEmpresa
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
            mode: 'cors',
            body: JSON.stringify(data),        
        }
        
    
        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/getProductosOfertas", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        return response.productos;
    } catch (error) {
        console.log(error);
    }
}

ofertaSqlConfigure.getContenidoOfertas = async (idProducto) => {
    try {
        let data = {
            idProducto: idProducto
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
            mode: 'cors',
            body: JSON.stringify(data),        
        }
        
    
        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/usuario/getContenidoOfertas", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        return response.productos;
    } catch (error) {
        console.log(error);
    }
}


export const ButtonRed = styled.button`
  background-color: red;
  color: white;
  font-size: 10px;
  font-weight: bolder;
  padding: 10px 15px;
  border-radius: 5px;
  text-align:center;
  cursor: pointer;
`;

