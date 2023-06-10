import ruta from '../../pages/Ruta'
import styled from 'styled-components'


const crudInject = {};

crudInject.deleteProducto = async (idProducto) => {
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/deleteProducto", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

crudInject.insertProduct = async (producto) => {
    try {
        let data = producto
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/insertProducto", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

crudInject.modifyProducto = async (producto) => {
    try {
        let data = producto
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/modifyProducto", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

crudInject.getOferta = async (idProducto) => {
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/getOferta", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

crudInject.getCategoriaName = async (categoria) => {
    try {
        let data = {
            idCategoria: categoria
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/empresa/getCategoria", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        
        return response.categoria;
    } catch (error) {
        console.log(error);
    }
}

export const InputLarge = styled.input`
  padding: 10px 10vh;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #0077cc;
  }
`;

export const InputSmall = styled.input`
  padding: 10px 1vh;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #0077cc;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const ButtonGreen = styled.button`
  background-color: green;
  color: white;
  font-size: 15px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 25px 10px;
  text-align:center;
  cursor: pointer;
`;

export const ButtonYellow = styled.button`
  background-color: yellow;
  color: black;
  font-size: 15px;
  padding: 10px 30px;
  border-radius: 5px;
  margin: 25px 10px;
  text-align:center;
  cursor: pointer;
`;

export const ButtonRed = styled.button`
  background-color: red;
  color: white;
  font-size: 15px;
  padding: 10px 30px;
  border-radius: 5px;
  margin: 25px 10px;
  text-align:center;
  cursor: pointer;
`;

export default crudInject;
