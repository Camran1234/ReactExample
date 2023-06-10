import ruta from "../pages/Ruta";


export async function carrito(idRepartidor ){
    try {
        let data = {
            "idRepartidor": idRepartidor
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/carrito", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        //Entregara el numero de orden
        return response.message;
    } catch (error) {
        console.log(error);
    }
}

export async function cancelOrder(idRepartidor, descripcionCancelacion ){
    try {
        let data = {
            "idRepartidor": idRepartidor,
            "descripcionCancelacion": descripcionCancelacion
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/cancelOrder", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        //Entregara el numero de orden
        return response.message;
    } catch (error) {
        console.log(error);
    }
}

export async function createComision(idRepartidor){
    try {
        let data = {
            "idRepartidor": idRepartidor,
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/createComision", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        //Entregara el numero de orden
        return response.message;
    } catch (error) {
        console.log(error);
    }
}

export async function deliverOrder(idRepartidor){
    try {
        let data = {
            "idRepartidor": idRepartidor,
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/deliverOrder", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }

        //Entregara el numero de orden
        return response.body;
    } catch (error) {
        console.log(error);
    }
}

export async function getActualOrder(idRepartidor){
    try {
        let data = {
            "idRepartidor": idRepartidor.toString(),
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/getActualOrder", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        //Entregara el numero de orden
        return response.body.idlista_solicitud_pedido;
    } catch (error) {
        console.log(error);
    }
}

export async function getEstadoRepartidor(idRepartidor){
    try {
        let data = {
            "idRepartidor": idRepartidor.toString(),
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/getEstadoRepartidor", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        return parseInt(response.body);
    } catch (error) {
        console.log(error);
    }
}

export async function updateRepartidorStatus(idRepartidor, idlista_solicitud_pedido, estadoRepartidor){
    try {
        let data = {
            "idRepartidor": idRepartidor.toString(),
            "idPeticion": idlista_solicitud_pedido.toString(),
            "estadoRepartidor" : estadoRepartidor,
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

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/repartidor/followOrder", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if (response.length == 0){
            alert("Error: error en servidor");
            return;
        }
        return response.body;
    } catch (error) {
        console.log(error);
    }
}


