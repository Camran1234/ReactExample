const connection = require('../Config/db')
const repartidorController = {};
const mysql = require('mysql2');
const { config } = require('../Config/db');

function answerError(mensaje,err, res){
    console.log("message: "+JSON.stringify(err))
    res.status(500).send({
        "message":"Error solicitud "+mensaje,
        "error": err
    })
}

//Repartidor estados
//0 no aceptado
//1 aceptado/disponible
//2 ocupado
//estados de pedidos
//0 Esperando verificacion 
//1 En proceso
//2 En camino
//3 Entregado
//4 Cancelado

repartidorController.check = (req, res) => {
    let {idRepartidor} = req.body;
    console.log("idRepartidor: "+idRepartidor)
    let query = `SELECT estado FROM repartidor WHERE idrepartidor=?`
    try{
        connection.query(query, [idRepartidor], (err, ress) => {
            if(err){
                answerError("Error obteniendo repartidor", err, res)
                return;
            }

            if(ress!= null){
                if(ress.length > 0){
                    res.status(200).send({
                        estado: ress[0].estado,
                    })
                }else{
                    answerError("Error obteniendo repartidor", 'vacio', res);
                    return
                }
            }else{
                answerError("Error obteniendo repartidor", 'nulo', res);
                return
            }
        })
    }catch(error){
        answerError("No se pudo ejecutar check repartidor", error, res)
        return
    }
}

repartidorController.createComision = (req, res) => {
    let idRepartidor = req.body.idRepartidor;
    let querySum = `SELECT SUM(p.precio) as total
                    FROM pedido p 
                    INNER JOIN lista_solicitud_pedido l 
                        ON p.idlista_solicitud_pedido = l.idlista_solicitud_pedido 
                    WHERE l.repartidor_idrepartidor=?`

    let queryComision = 'INSERT INTO comisiones (comision, repartidor_idrepartidor) VALUES(?, ?)'

    let comision = null
    try{
        connection.query(querySum, [idRepartidor], (error, result) => {
            if(error || result === null || result === undefined){
                throw error
            }
            console.error(result)
            if(result.length>0){
                comision = parseFloat(result[0].total)*0.05
                comision = comision.toFixed(2)
                if(comision != null && comision != undefined){
                    console.log(comision)
                    connection.query(queryComision, [comision, idRepartidor], (err, ress) => {
                        if(err || ress === null || ress === undefined){
                            throw err
                        }
        
                        return res.status(200).send({
                            message: "Comision creada del "+comision,
                        })
                    })
                }else{
                    throw "La comision es nula"
                }
            }
        })

        
    }catch(mistake){
        answerError("No se pudo agregar la comision", mistake, res)
    }
    
            
}

repartidorController.getEmpresas = (req, res) => {
    let query = `SELECT idEmpresa, nombre FROM empresa`

    try{
        connection.query(query, [], (error, result) => {
            if (error){
                throw error;
            }
            return res.status(200).send({
                result
            })
        })
    }catch(e){
        answerError("No se pudo entregar la orden", e, res)
    }
    
}

repartidorController.carrito = (req, res) => {
    let idRepartidor = req.body.idRepartidor;
    let queryLista = `SELECT idlista_solicitud_pedido FROM lista_solicitud_pedido WHERE repartidor_idrepartidor=?`
    let queryeliminarCarrito = `UPDATE carrito set idlista_solicitud_pedido=null WHERE idlista_solicitud_pedido=?`

    try{
        connection.query(queryLista, [idRepartidor], (error, result) => {
            if (error){
                answerError("Error queryLista", error, res)
            }
            let idLista = result[0].idlista_solicitud_pedido;
            connection.query(queryeliminarCarrito, [idLista], (errP, resP) => {
                if(errP){
                    answerError("Error queryEliminarCarrito", error, res)
                }
                return res.status(200).send({
                    message: "Orden entregada",
                    result: resP
                })
            })
        })
    }catch(e){
        answerError("No se pudo entregar la orden", e, res)
    }
    
}

repartidorController.deliverOrder = (req, res) => {
    let idRepartidor = req.body.idRepartidor;
    const estado = "Entregado";
    let queryRepartidor = `UPDATE repartidor SET estado = 1 WHERE idrepartidor=?`
    let queryPedido = `UPDATE lista_solicitud_pedido 
                        SET estado= ?
                        WHERE repartidor_idrepartidor=?`

    try{
        connection.query(queryRepartidor, [idRepartidor], (error, result) => {
            if (error){
                throw error;
            }
            connection.query(queryPedido, [estado, idRepartidor], (errP, resP) => {
                if(errP){
                    throw errP
                }
                return res.status(200).send({
                    message: "Orden entregada"
                })
            })
        })
    }catch(e){
        answerError("No se pudo entregar la orden", e, res)
    }
    
}

repartidorController.cancelOrder = (req, res) => {
    let {idRepartidor, descripcionCancelacion} = req.body;
    let estado = "Cancelado";
    console.error(JSON.stringify(req.body))

    let queryCancel = `UPDATE lista_solicitud_pedido SET estado=? , descripcion_cancelado=?, repartidor_idrepartidor=null
                        WHERE repartidor_idrepartidor=?`;
    let queryStablish = `UPDATE repartidor SET estado=1 WHERE idrepartidor=?`;
    

    try{
        let insert = [estado, descripcionCancelacion, idRepartidor]
        connection.query(queryCancel, [estado, descripcionCancelacion, idRepartidor, idRepartidor], (err, result) => {
            if(err){
                throw err
            }
            let data = {};
            connection.query(queryStablish, idRepartidor, (error, resultado) => {
                if(error){
                    throw error
                }
                data = {
                    message:"pedido cancelado"
                }
                res.status(200).send({
                    data
                })
            })
        })
    }catch(e){
        answerError("No se pudo cancelar la orden", e, res)
    }
}

repartidorController.getActualOrder = (req, res) => {
    let idRepartidor = req.body.idRepartidor;    
    console.log("idRepartidor: "+idRepartidor)
    let query = `SELECT l.idlista_solicitud_pedido 
                    FROM repartidor r 
                        INNER JOIN lista_solicitud_pedido l 
                            ON r.idrepartidor=l.repartidor_idrepartidor 
                    WHERE r.idrepartidor=${idRepartidor}`;
    const c = mysql.createConnection(config)
    try{
        c.connect(function(err) {
            if(err){
                throw err
            }
            let data = {};

            c.query(query, function(error, respond) {
                if(error || respond === undefined){
                    throw error
                }
                if(respond.length > 0){
                    res.status(200).send({
                        body: respond[0]
                    })
                }
                
                c.end()
            })

        })

    }catch(error){
        answerError("No se pudo actualizar el estado", error, res)
        c.end()
    }
    return
}

repartidorController.followOrder = (req, res) => {
    let {idRepartidor, idPeticion, estadoRepartidor} = req.body;
    console.warn(JSON.stringify(req.body))
    
    let queryFollow = `UPDATE lista_solicitud_pedido SET repartidor_idrepartidor=${idRepartidor}, estado=\"En Camino\" WHERE idlista_solicitud_pedido=${idPeticion}`;
    let queryCambio = `UPDATE repartidor SET estado=2 WHERE idrepartidor=${idRepartidor}`;
    const c = mysql.createConnection(config)
    try{
        if(estadoRepartidor == 2){
            throw "No se puede seguir una orden cuando ya se tiene en seguimiento una"
        }
        c.connect(function(err) {
            if(err){
                throw err
            }
            let data = {};

            

            c.query(queryFollow, function(err, ress) {
                if(err || ress === undefined){
                    throw err
                }else{
                    data = {
                        message:"pedido en seguimiento",
                        estado: estadoRepartidor,
                    }                    
                }
            })
            c.query(queryCambio, function(err, ress) {
                if(err || ress === undefined){
                    throw err
                }else{
                    data = {
                        message:"pedido en seguimiento",
                        estado: estadoRepartidor,
                    }
                }
            })
            res.status(200).send({
                body: data,
            })
            c.end()

        })

    }catch(error){
        answerError("No se pudo actualizar el estado", error, res)
        c.end()
    }
    return
}

repartidorController.setStatusOrder = (req, res) => {
    let idPeticion = req.body.idPeticion;
    let estado = req.body.estado;
    let query = `UPDATE lista_solicitud_pedido
                SET estado = ${estado}
                WHERE idlista_solicitud_pedido=${idPeticion}`;
    const c = mysql.createConnection(config)
    try{
        c.connect(function(err) {
            if(err){
                throw err
            }
            let data = {};
            c.query(query, function(err, ress) {
                if(err || ress === undefined){
                    throw err
                }
                res.status(200).send({body: "pedido actualizada"})
                c.end()
            })
        })
    }catch(error){
        answerError("No se pudo actualizar el estado", error, res)
        c.end()
    }
    return
}

repartidorController.getStatusOrder = (req, res) => {
    let idPeticion = req.body.idPeticion;
    let query = `SELECT estado FROM lista_solicitud_pedido WHERE idlista_solicitud_pedido=${idPeticion}`;
    const c = mysql.createConnection(config)
    try{
        c.connect(function(err) {
            if(err){
                throw err
            }
            let data = {};
            c.query(query, function(err, ress) {
                if(err || ress === undefined){
                    throw err
                }
                res.status(200).send({body: ress[0]})
                c.end()
            })
        })
    }catch(error){
        answerError("No se pudo leer el estado", error, res)
        c.end()
    }
    return
}

repartidorController.getRepartidorStatus = (req, res) => {
    let idRepartidor = req.body.idRepartidor
    let queryEstado = `SELECT estado FROM repartidor WHERE idrepartidor=${idRepartidor}`;
    const c =mysql.createConnection(config);
    try {
        c.connect(function(err) {
            if(err){
                throw err;
            }

            c.query(queryEstado, function(err, ress) {
                if(err || ress === undefined){
                    throw err;
                }
                if(ress.length!=0){
                    let estado = ress[0].estado;
                    res.status(200).send({
                        body: JSON.stringify(estado),
                    })
                    c.end();
                }
    
            })
        })
        
    } catch (error) {
        answerError("No se pudo recuperar el estado del repartidor", error, res)
        c.end();
    }   
    return;
}

repartidorController.pedidoCompleto = (idPedido, ress) => {
    let queryPedidos = `SELECT p.idProducto, p.cantidad, p.precio, pr.nombreProducto, pr.descripcion 
                            FROM pedido p 
                            LEFT JOIN producto pr ON p.idProducto=pr.idProducto 
                            WHERE p.idlista_solicitud_pedido=${idPedido}`;
    let queryTotal = `SELECT SUM(precio) as total FROM pedido WHERE idlista_solicitud_pedido=${idPedido}`;
    const c = mysql.createConnection(config);
    let data = {
        detalles: [],
        total: 0,
    }
    try {
        c.connect(function(e) {
            if(e){
                throw e;
            }
            c.query(queryPedidos, function(err, res) {
                if(err || res === undefined){
                    answerError("No se pudo recuperar los detalles de "+idPedido,err, ress);
                    c.end();
                    return;
                }
                if(res.length !=0){
                    data.detalles = res;
                }
            });
            c.query(queryTotal, function(err, res) {
                if(err || res === undefined){
                    answerError("No se pudo obtener el total del pedido",err, ress)
                    c.end();
                    return;
                }
                if(res.length !=0 ){
                    data.total = res[0].total;
                }
            })
            c.end()
        })
    } catch (error) {
        answerError("no se pudo recuperar detalles del pedido "+idPedido,error, ress);
        c.end();
    }
    return data;
}

repartidorController.detallesPedido = (req, res) => {
    let idPeticion = req.body.idPeticion;
    console.log("Detalles pedido: "+JSON.stringify(idPeticion))
    let queryUbicacion = `SELECT departamento, ciudad FROM lista_solicitud_pedido WHERE idlista_solicitud_pedido=${idPeticion}`
    let queryUsuario = `SELECT u.nombre, u.apellido, u.direccion FROM lista_solicitud_pedido l 
                        LEFT JOIN usuario u ON l.usuario=u.idusuario 
                        WHERE l.idlista_solicitud_pedido=${idPeticion};`
    let detallesPedido = repartidorController.pedidoCompleto(idPeticion, res);
    const c = mysql.createConnection(config);
    try{
        c.connect(function(e) {
            if(e){
                throw e;
            }
            c.query(queryUbicacion, function (errUbicacion, resUbicacion) {
                if(errUbicacion || resUbicacion === undefined){
                    answerError("No se pudo identificar la ubicacion",errUbicacion, res);
                    c.end();
                    return;
                }
                if(resUbicacion.length != 0){
                    var departamento = resUbicacion[0].departamento;
                    var ciudad = resUbicacion[0].ciudad;
                    console.log("departamento: "+departamento+" ciudad: "+ciudad+" idPeticion: "+idPeticion)
                    //Obteniendo datos empresa
                    c.query(`SELECT l.idlista_solicitud_pedido,l.descripcion,  e.nombre, d.direccion FROM lista_solicitud_pedido l 
                                LEFT JOIN empresa e ON l.empresa=e.idEmpresa 
                                LEFT JOIN direccionEmpresa d ON e.idEmpresa=d.idEmpresa 
                                WHERE l.idlista_solicitud_pedido=${idPeticion}
                                    AND d.idDepartamento=${departamento}
                                    AND d.idCiudad=${ciudad}`, function(errEmpresa, resEmpresa) {
                        if(errEmpresa || resEmpresa === undefined){
                            console.log("ERROR EMPRESA: "+errEmpresa)
                            console.log("ERROR RES: "+resEmpresa)
                            answerError("No se pudo recuperar los datos de empresa",errEmpresa, res);
                            c.end();
                            return;
                        }
                        if(resEmpresa.length!=0){
                            var direccion = [];
                            var descripcionPedido = resEmpresa[0].descripcion
                            var nombreEmpresa = resEmpresa[0].nombre;
                            resEmpresa.forEach( element => {
                                direccion.push(element.direccion);
                            });
                            
                            c.query(queryUsuario, function(errUsuario, resUsuario) {
                                if(errUsuario || resUsuario ===undefined){
                                    answerError("No se pudo recuperar informacion del usuario",errUsuario, res)
                                    c.end()
                                    return
                                }
                                if(resUsuario.length!=0){
                                    var direccionUsuario = resUsuario[0].direccion;
                                    var nombreUsuario = resUsuario[0].nombre+" "+resUsuario[0].apellido;
                                    let data={
                                        nombreEmpresa:nombreEmpresa,
                                        direccionEmpresa:direccion,
                                        nombreUsuario:nombreUsuario,
                                        direccionUsuario:direccionUsuario,
                                        detalles:detallesPedido.detalles,
                                        descripcion: descripcionPedido,
                                        total:detallesPedido.total,
                                    }
                                    res.status(200).send({
                                        body: data
                                    })
                                    c.end()
                                }
                            })
                        }
                    })
                }
                
            })
        })
    }catch(error){
        console.log(error);
        answerError("No se pudo realizar la peticion", error, res)
        c.end();
    }
    return;
}

repartidorController.pedidosCercanos = (req, res) => {
    //let idRepartidor = req.params.idRepartidor;
    let idRepartidor = req.body.idRepartidor;
    const c = mysql.createConnection(config);
    console.log("0, "+idRepartidor+" :")
    try {
        c.connect(function(e){
            if(e){
                throw e;
            }
            c.query(`SELECT departamento, ciudad FROM repartidor WHERE idrepartidor =${idRepartidor}`, function (err, ress) {
                console.log("Query ejecutada")
                console.log(ress)
                if(err || ress === undefined){
                    let mensaje= "incapaz de ejecutar query"
                    answerError(mensaje, err, res)
                    c.end();
                    return;
                }
                if(ress.length != 0){
                    ress = ress[0]
                    let departamento = ress.departamento;
                    let ciudad = ress.ciudad;
                    let estado = "En proceso"
                    console.log("3, dep: "+departamento+", ciudad: "+ciudad);
                    c.query(`SELECT l.idlista_solicitud_pedido, u.nombre, u.apellido, l.direccion, l.descripcion, l.empresa, e.nombre as empresa 
                    FROM lista_solicitud_pedido l 
                    LEFT JOIN usuario u ON l.usuario=u.idusuario 
                    LEFT JOIN empresa e ON l.empresa = e.idEmpresa
                    WHERE l.departamento =${departamento} AND l.ciudad =${ciudad}
                    AND l.estado=\"${estado}\"`, function (err2, ress2) {
                        console.log(ress2)
                        if(err2 || ress2 == undefined || ress2 == null){
                            console.log("LOG")
                            let mensaje= "incapaz de encontrar pedidos"
                            answerError(mensaje, err2, res)            
                            c.end();            
                            return;
                        }
                        if(ress2.length != 0){
                            res.status(200).send({
                                body: ress2
                            });
                            c.end();
                            return
                        }
        
                    })
                }
            });    
        })
        
    } catch (error) {
        console.error(error)
        res.json({
            "message":"error encontrando pedidos",
            "error":error
        })
        c.end();
        return;
    }    
}

// **************************************** juan carlos

repartidorController.postProductoEmpresa = (req, res) => {
    let idEmpresa = req.body.idEmpresa;
    let query = `select * from producto where empresa_idEmpresa = ${idEmpresa}`;
    const c = mysql.createConnection(config)
    try{
        c.connect(function(err) {
            if(err){
                throw err
            }
            let data = {};
            c.query(query, function(err, ress) {
                if(err || ress === undefined){
                    throw err
                }
                //res.status(200).send({body: ress[0]})
                res.json(ress)
                c.end()
            })
        })
    }catch(error){
        answerError("No se pudo leer el estado", error, res)
        c.end()
    }
    return
}



repartidorController.postCategoriaEmpresa = (req, res) => {
    let idCategoria = req.body.idCategoria;
    console.log("Entrando postCategoriaEmpresa")
    let query = `SELECT e.idEmpresa ,e.nombre , p.categoria_idcategoria 
    FROM empresa e INNER JOIN producto p ON e.idEmpresa=p.empresa_idEmpresa 
    WHERE p.categoria_idcategoria =  ${idCategoria}  GROUP BY e.idEmpresa;`;

    const c = mysql.createConnection(config)
    try{
        c.connect(function(err) {
            if(err){
                throw err
            }
            let data = {};
            console.log("Generando conexion")
            c.query(query, function(err, ress) {
                console.log("Query ejecutada")
                if(err || ress === undefined){
                    throw err
                }
                console.log("RESULTADO: "+JSON.stringify(ress))                
                res.json(ress)
                c.end()
            })
        })
    }catch(error){
        answerError("No se pudo leer el estado", error, res)
        c.end()
    }
    return
}


repartidorController.postBuscarProductoEmpresa = (req, res) => {
    let idEmpresa = req.body.idEmpresa;
    console.log("idEmpresa:"+idEmpresa)
    let query = `select * from producto where empresa_idEmpresa = ${idEmpresa};`;

    const c = mysql.createConnection(config)
    try{
        c.connect(function(err) {
            if(err){
                throw err
            }
            let data = {};
            c.query(query, function(err, ress) {
                if(err || ress === undefined){
                    answerError("No se pudo obtener los productos", err, res)
                }                
                res.json(ress)
                c.end()
            })
        })
    }catch(error){
        answerError("No se pudo leer los productos de la empresa.", error, res)
        c.end()
    }
    return
}
// *******************************************

module.exports = repartidorController;