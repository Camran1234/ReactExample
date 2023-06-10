const connection = require('../Config/db')
const usuarioController = {};

function answerError(mensaje,err, res){
    console.log("\n\nERROR: "+mensaje+", "+err)
    res.status(500).send({
        "message":"Error solicitud "+mensaje+", "+err,
        "error": err
    })
}

/**
 * Llamar para obtener el contenido de los productos de un combo
 * @param {*} req 
 * @param {*} res 
 */
usuarioController.getContenidoOfertas = (req, res) => {
    let idProducto = req.body.idProducto;
    const query = `SELECT o.producto, o.productoRelacionado, p.nombreProducto, p.foto
                        FROM oferta o 
                        INNER JOIN producto p 
                            ON o.productoRelacionado=p.idProducto 
                        WHERE o.producto=?`
    try{
        connection.query(query, [idProducto], (errorOferta, respondOferta) => {
            if(errorOferta){
                answerError("Error oferta", errorOferta, res);
                return;
            }
            if(respondOferta && respondOferta.length > 0){
                res.status(200).send({
                    productos: respondOferta
                })
            }
        })
    }catch(error){
        answerError("Error contenido oferta", error, res)
    }
}

/**
 * Llamar para obtener los productos que tienen oferta de una empresa
 * @param {*} req 
 * @param {*} res 
 */
usuarioController.getProductosOfertas = (req, res) => {
    let empresa = req.body.idEmpresa;
    const oferta = 1;
    const query = `SELECT * FROM producto WHERE oferta=? AND empresa_idEmpresa=?`
    try{
        connection.query(query, [oferta, empresa], (errorOferta, respondOferta) => {
            if(errorOferta){
                answerError("Error oferta", errorOferta, res);
                return;
            }
            if(respondOferta && respondOferta.length >0){
                res.status(200).send({
                    productos: respondOferta
                })
            }
        })
    }catch(error){
        answerError("Error productos oferta", error, res)
    }

}

/**
 * Obtener las empresas que tienen ofertas
 * @param {*} req 
 * @param {*} res 
 */
usuarioController.getEmpresasOfertas = (req, res) => {
    const oferta = 1;
    const query = `SELECT e.idEmpresa, e.nombre, p.oferta 
                    FROM empresa e 
                    INNER JOIN producto p 
                        ON e.idEmpresa=p.empresa_idEmpresa 
                    WHERE p.oferta=?`

    try{
        connection.query(query, [oferta], (errorOferta, respondOferta) => {
            if(errorOferta){
                answerError("Error Oferta", errorOferta, res)
                return
            }
            if(respondOferta && respondOferta.length>0){
                res.status(200).send({
                    empresas: respondOferta
                })
            }
        })
    }catch(error){
        answerError("Error Empresas Ofertas", error, res);
    }
}

usuarioController.check = (req, res) => {
    let {idUsuario} = req.body;

    let query = `SELECT estado FROM usuario WHERE idusuario=?`
    try{
        connection.query(query, [idUsuario], (err, ress) => {
            if(err){
                answerError("Error obteniendo usuario", err, res)
            }
            console.log("idUsuario: "+idUsuario)
            if(ress!= null){
                if(ress.length > 0){
                    res.status(200).send({
                        estado: ress[0].estado,
                    })
                }else{
                    console.log(JSON.stringify(ress))
                    answerError("Error obteniendo usuario", 'vacio', res);
                }
            }else{
                answerError("Error obteniendo usuario", 'nulo', res);
            }
        })
    }catch(error){
        answerError("No se pudo ejecutar check", error, res)
    }
}

usuarioController.getComisiones = (req, res) => {
    let {idRepartidor} = req.body;
    console.log("COMISIONES REPARTIDOR: "+idRepartidor)
    let query = `SELECT SUM(comision) as comisiones FROM comisiones WHERE repartidor_idrepartidor=?`
    try{
        connection.query(query, [idRepartidor], (err, ress) =>{
            if(err){
                answerError("ERROR QUERY: ", err, res)
            }
            
            if(ress[0] != undefined){
                console.log("COMISION TOTAL: "+ress[0].comisiones)
                res.status(200).send({
                    comisiones: ress[0].comisiones
                })
            }else{
                res.status(200).send({
                    comisiones: 0
                })
            }
        })
    }catch(err){
        answerError("ERROR ASD", err, res)
    }
}

usuarioController.getCalificacion = (req, res) => {
    let {idRepartidor} = req.body;
    let query = `SELECT total_puntos FROM calificacion WHERE repartidor_idrepartidor=?`
    try{
        connection.query(query, [idRepartidor], (err, ress) =>{
            if(err){
                answerError("ERROR QUERY: ", err, res)
            }
            if(ress[0] != undefined){
                res.status(200).send({
                    total_puntos: ress[0].total_puntos
                })
            }else{
                res.status(200).send({
                    total_puntos: "Sin calificaciones"
                })
            }
        })
    }catch(err){
        answerError("ERROR ASD", err, res)
    }
}

usuarioController.calificarOrden = (req, res) => {
    let {idPedido,idRepartidor, calificacion} = req.body;
    console.log("Body: "+JSON.stringify(req.body))
    let cant_envios, total_puntos, idcalificacion = 0;
    //Calificar primero
    let query = `UPDATE lista_solicitud_pedido SET calificacion=? WHERE idlista_solicitud_pedido=? AND repartidor_idrepartidor=?`
    //Obtener datos
    let queryGather = `SELECT COUNT(idlista_solicitud_pedido) as cant_envios, AVG(calificacion) as total_puntos
                    FROM lista_solicitud_pedido
                    WHERE repartidor_idrepartidor=?`
    //Comprobar que existe el set de calificacion del repartidor
    let queryCheck = `SELECT idcalificacion FROM calificacion WHERE repartidor_idrepartidor = ?`
    //Actualizar
    let queryUpdate = `UPDATE calificacion SET cant_envios=?, total_puntos=? WHERE idcalificacion=? AND repartidor_idrepartidor = ?`
    //Agregar
    let queryAdd = `INSERT INTO calificacion (cant_envios, total_puntos, repartidor_idrepartidor)
                        VALUES(?, ?, ?)`
    let queryCarrito = `UPDATE carrito SET idlista_solicitud_pedido = null WHERE idlista_solicitud_pedido=?`
    try{
        let querySet = [calificacion, idPedido, idRepartidor]
        let queryGatherSet = [idRepartidor]
        let queryCheckSet = [idRepartidor]
        let queryUpdateSet = [cant_envios, total_puntos, idcalificacion, idRepartidor]
        let queryAddSet = [cant_envios, total_puntos, idRepartidor]
        let carritoSet = [idPedido];
        //Agregando calificacion
        connection.query(query, querySet, (errQ, resQ) => {
            if(errQ){
                throw errQ
            }
            //Gather
            connection.query(queryGather, queryGatherSet, (errG, resG) => {
                if(errG || resG === undefined || resG === null){
                    throw "No se pudo recuperar los datos"
                }
                console.log("RESG: "+JSON.stringify(resG))
                cant_envios = resG[0].cant_envios;
                total_puntos = resG[0].total_puntos;
                console.log("cant_envios: "+cant_envios)
                console.log("total_puntos: "+total_puntos)
                connection.query(queryCheck, queryCheckSet, (errC, resC) => {
                    if(errC){
                        throw errC
                    }
                    console.log("WARN")
                    console.log(resC)
                    if(resC.length > 0 ){
                        //update
                        console.log("resC: "+JSON.stringify(resC))
                        idcalificacion = resC[0].idcalificacion
                        queryUpdateSet = [cant_envios, total_puntos, idcalificacion, idRepartidor]
                        connection.query(queryUpdate, queryUpdateSet, (errU, resU) => {
                            if(errU){
                                throw errU
                            }
                            connection.query(queryCarrito, carritoSet, (errCar, resCar) => {
                                if(errCar){
                                    return errCar
                                }
                                res.status(200).send({
                                    message: "Calificacion actualizada",
                                    result: resU
    
                                })
                            })
                            
                        })
                    }else{
                        //add
                        queryAddSet = [cant_envios, total_puntos, idRepartidor]
                        connection.query(queryAdd, queryAddSet, (errA, resA) => {
                            if(errA){
                                throw errA
                            }
                            connection.query(queryCarrito, carritoSet, (errCar, resCar) => {
                                if(errCar){
                                    return errCar
                                }
                                res.status(200).send({
                                    message: "Calificacion creada",
                                    result: resA
                                })
                            })
                        })
                        
                    }
                })
            })
        })
    }catch(e){
        answerError("No se pudo agregar la calificacion", e, res)
    }
}

/*
    pedido: {
        idProducto:
        cantidad:
        precio:
        descripcion:
    }
*/ 

usuarioController.getCarrito = (req, res) => {
    let idUsuario = req.body.idUsuario;
    let idLista, idCarrito = 0;
    const currentDate = new Date();
    const dateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const queryCarrito = `SELECT idcarrito, idlista_solicitud_pedido FROM carrito WHERE idusuario = ?`
    const queryAddLista = `INSERT INTO lista_solicitud_pedido (fecha, usuario) VALUES (?, ?)`
    const queryUpdateCarrito = `UPDATE carrito SET idlista_solicitud_pedido = ? WHERE idcarrito=?`
    const queryAddCarrito = `INSERT INTO carrito (idlista_solicitud_pedido, idusuario) VALUES (?, ?)`

    try{
        let dataSet = [idUsuario];
        let dataSetLista = [dateTime, idUsuario]
        let dataSetCarrito = [idLista, idUsuario]
        let dataUpdate = []
        connection.query(queryCarrito, [dataSet], (err, respond) => {
            if(err){
                throw err;
            }
            console.log(respond)
            console.log("SOLICITUD CARRITO: "+JSON.stringify(respond))
            if(respond.length > 0){
                //return
                idCarrito = respond[0].idcarrito;
                idLista = respond[0].idlista_solicitud_pedido;
                if(idLista === null || idLista === undefined){
                    console.log("idLista nula o undefined")
                    connection.query(queryAddLista, dataSetLista, (errL, resL) => {
                        if(errL){
                            throw errL;
                        }
                        idLista = resL.insertId;
                        dataUpdate = [idLista, idCarrito]
                        connection.query(queryUpdateCarrito, dataUpdate, (errUp, resUp) => {
                            if(errUp){
                                answerError("ERROR QueryUpdate: ", errUp, res)
                            }
                            res.status(200).send({
                                "idCarrito": idCarrito,
                                "idLista": idLista
                            })
                        })
                    })
                }else{
                    console.log("no se crea nada")
                    res.status(200).send({
                        "idCarrito": idCarrito,
                        "idLista": idLista
                    });
                }
            }else{
                console.log("RESPOND NULO parametros insertados: "+ JSON.stringify(dataSet))
                //create lista, carrito and return carrito
                connection.query(queryAddLista, dataSetLista, (errAL, resAL) => {
                    if(errAL){
                        throw errAL
                    }
                    console.log(resAL)
                    idLista = resAL.insertId;
                    if(idLista != 0){
                        dataSetCarrito = [idLista, idUsuario];
                        connection.query(queryAddCarrito, dataSetCarrito, (errAC, resAC) =>{
                            if(errAC){
                                throw errAC
                            }
                            idCarrito = resAC.insertId;
                            res.status(200).send({
                                "idCarrito": idCarrito,
                                "idLista": idLista
                            })
                        })
                    }
                })

            }
        })
    }catch(e){
        console.log("ERROR OBTENIENDO CARRITO: "+e)
        answerError("No se pudo obtener el carrito", e, res)
    }

}

/*
    Ejemplo de lo que traeria la variable producto abajo
    producto: {
        idProducto: 1,
        cantidad: 2,
        descripcion: 'ASDASD',
    }
*/

usuarioController.realizarPedido = (req, res) => {
    let {idLista ,descripcion, departamento, ciudad, direccion} = req.body
    const estado = "Esperando verificacion"
    let queryRealizar = `UPDATE lista_solicitud_pedido SET descripcion = ?, departamento = ?, ciudad = ?, direccion = ?, estado = ?
                        WHERE idlista_solicitud_pedido = ?`
    let dataSet = [descripcion, departamento, ciudad, direccion, estado, idLista]

    try{
        connection.query(queryRealizar, dataSet, (err, ress) => {
            if(err){
                throw err
            }
            res.status(200).send({
                message: "Pedido realizado",
                result: ress
            })
        })
    }catch(error){
        answerError("No se pudo realizar el pedido", error, res)
    }
}

usuarioController.obtenerEstado = (req, res) => {
    let {idLista} = req.body
    let queryRealizar = `SELECT estado, repartidor_idrepartidor FROM lista_solicitud_pedido WHERE idlista_solicitud_pedido=?`

    try{
        connection.query(queryRealizar, idLista, (err, ress) => {
            if(err){
                throw err
            }
            res.status(200).send({
                result: ress[0]
            })
        })
    }catch(error){
        answerError("No se pudo realizar el pedido", error, res)
    }
}

usuarioController.obtenerDirecciones = (req, res) => {
    let queryDepartamentos = `SELECT * FROM departamento`;
    let queryCiudades = `SELECT * FROM ciudad`

    try{
        connection.query(queryDepartamentos, [], (err, resultD) => {
            if(err){
                answerError("No se pudo obtener direcciones", err, res)        
            }
            connection.query(queryCiudades, [], (err, resultC) => {
                if(err){
                    answerError("No se pudo obtener direcciones", err, res)        
                }
                res.status(200).send({
                    departamentos: resultD,
                    ciudades: resultC
                })
            })  
        })        
    }catch(error){
        answerError("No se pudo obtener direcciones", error, res)
    }
}

usuarioController.realizarPedido = (req, res) => {
    let {idLista ,descripcion, departamento, ciudad, direccion} = req.body
    console.log("BODY: "+JSON.stringify(req.body))
    let estado = "Esperando verificacion"
    let calificacion = 0
    let queryRealizar = `UPDATE lista_solicitud_pedido SET descripcion = ?, departamento = ?, ciudad = ?, direccion = ?, estado = ?, calificacion=?
                        WHERE idlista_solicitud_pedido = ?`
    let dataSet = [descripcion, departamento, ciudad, direccion, estado, calificacion, idLista]

    try{
        connection.query(queryRealizar, dataSet, (err, ress) => {
            if(err){
                throw err
            }
            
            res.status(200).send({
                message: "Pedido realizado",
                result: ress
            })
        })
    }catch(error){
        answerError("No se pudo realizar el pedido", error, res)
    }
}

usuarioController.getPedidos = (req, res) => {
    let {idLista} = req.body

    let query = `SELECT * FROM pedido WHERE idlista_solicitud_pedido=?`
    let query2 = `SELECT estado FROM lista_solicitud_pedido WHERE idlista_solicitud_pedido=?`
    try{
        connection.query(query2, [idLista], (err, ress) => {
            if(err){
                throw err
            }
            if(ress[0].estado == null || ress[0].estado === undefined){
                connection.query(query, [idLista], (err, ress) => {
                    if(err){
                        throw err
                    }
                    res.status(200).send({
                        pedidos: ress
                    })
                })
            }else{
                res.status(200).send({});
            }
        })

    }catch(error){
        answerError("No se pudieron obtener los pedidos", error, res)
    }
}

usuarioController.getProducto = (req, res) => {
    let {idProducto} = req.body

    let query = `SELECT nombreProducto, precio, descripcion FROM producto WHERE idProducto=?`
    try{
        connection.query(query, [idProducto], (err, ress) => {
            if(err){
                throw err
            }
            if(ress.length > 0){
                res.status(200).send({
                    nombreProducto: ress[0].nombreProducto,
                    precioProducto: ress[0].precio,
                    descripcionProducto: ress[0].descripcion,
                })
            }else{
                answerError("No se pudo obtener el nombre del producto", "Quien sabe", res)
            }
        })
    }catch(error){
        answerError("No se pudo realizar la query", error, res)
    }
}

usuarioController.agregarPedido = (req, res) => {
    let {idLista, producto} = req.body;
    let {idProducto, cantidad, descripcion} = producto;
    let idEmpresa, precio = 0;
    let query = 'SELECT empresa_idEmpresa, precio FROM producto WHERE idProducto = ?';

    let queryCheck = `SELECT empresa FROM lista_solicitud_pedido WHERE idlista_solicitud_pedido=?`
    let queryUpdate = `UPDATE lista_solicitud_pedido SET empresa =? WHERE idlista_solicitud_pedido=?`
    let queryAgregarPedido = `INSERT INTO pedido (idlista_solicitud_pedido, idProducto, cantidad, precio, descripcion)
                                VALUES(?, ?, ?, ?, ?)`;

    try{
        let firstSet = [idProducto];
        let secondSet = []
        let thirdSet = [];
        connection.query(query, firstSet, (errQ, resQ) => {
            if(errQ){
                throw errQ;
            }
            console.log("resQ: "+JSON.stringify(resQ))
            if(resQ.length > 0){
                idEmpresa = resQ[0].empresa_idEmpresa;
                precio = resQ[0].precio;
                secondSet = [idEmpresa, idLista];
                connection.query(queryCheck, [idLista], (e, r) => {
                    console.log(JSON.stringify(r))
                    if(r.length > 0){
                        if(r[0].empresa == null){
                            connection.query(queryUpdate, secondSet, (errU, resU) => {
                                if(errU){
                                    throw errU
                                }
                                console.log("\n\n\n RESU: "+JSON.stringify(resU)+"\n\n")
                                if(resU != undefined || resU != null){
                                    precio = precio * cantidad;
                                    precio = precio.toFixed(2);
                                    thirdSet = [idLista, idProducto, cantidad, precio, descripcion];
                                    connection.query(queryAgregarPedido, thirdSet, (errA, resA) => {
                                        console.log("Agregando pedido")
                                        if(errA){
                                            console.log("ERROR: "+errA)
                                            throw errA
                                        }
                                        console.log("SE AGREGO EL PEDIDO")
                                        res.status(200).send({
                                            message: "Se agrego correctamente el pedido",
                                            idPedido: resA.insertId,
                                            result: resA
                                        })
                                    })
                                }
                            })
                        }else{
                            let empresa = r[0].empresa
                            console.log("EMPRESA: "+empresa+ ", idEmpresa: "+idEmpresa)
                            if(empresa == idEmpresa){
                                precio = precio * cantidad;
                                precio = precio.toFixed(2);
                                thirdSet = [idLista, idProducto, cantidad, precio, descripcion];
                                connection.query(queryAgregarPedido, thirdSet, (errA, resA) => {
                                    console.log("Agregando pedido")
                                    if(errA){
                                        console.log("ERROR: "+errA)
                                        throw errA
                                    }
                                    console.log("SE AGREGO EL PEDIDO")
                                    res.status(200).send({
                                        message: "Se agrego correctamente el pedido",
                                        idPedido: resA.insertId,
                                        result: resA
                                    })
                                })
                            }else{
                                answerError("No se pudo agregar al carrito", "producto de lugar diferente", res)
                            }
                        }
                        
                    }
                    
                })
            }else{
                answerError("No se pudo agregar al carrito", "No se encontro el producto", res)
            }
        })
    }catch(e){
        answerError("No se pudo agregar al carrito", e, res)
    }
}

usuarioController.modifyPedido = (req, res) => {
    let {idPedido, cantidad, descripcion} = req.body;
    let precio = 0;
    let queryPrecioProducto = `SELECT p.precio FROM producto p INNER JOIN pedido pe ON p.idProducto=pe.idProducto WHERE pe.idPedido=?`
    let queryModify = `UPDATE pedido SET cantidad=?, precio=?, descripcion=? WHERE idPedido=?`
    try{
        let firstDataSet = [idPedido]
        let secondDataSet = []
        connection.query(queryPrecioProducto, firstDataSet, (errP, resP) => {
            if(errP){
                throw new Error(errP)
            }
            console.log("resP: "+JSON.stringify(resP))
            if(resP.length>0){
                precio = resP[0].precio;
                precio *= cantidad;
                precio = precio.toFixed(2);
                secondDataSet = [cantidad, precio, descripcion, idPedido]
                connection.query(queryModify, secondDataSet, (errM, resM) => {
                    if(errM){
                        throw errM
                    }
                    res.status(200).send({
                        message:"pedido modificado",
                        result: resM
                    })
                })
            }else{
                throw "No se encontraron pedidos"
            }

        })
    }catch(error){
        answerError("No se pudo modificar el pedido", error, res)
    }

}

usuarioController.eliminarPedido = (req, res) => {
    let {idPedido} = req.body

    let query = `DELETE FROM pedido WHERE idPedido=?`
    try{
        connection.query(query, [idPedido], (err, ress) => {
            if(err){
                throw err
            }
            res.status(200).send({
                message: "pedido eliminado",
                result: ress
            })
        })
    }catch(error){
        answerError("No se pudieron obtener los pedidos", error, res)
    }
}

usuarioController.eliminarLista = (req, res) => {
    let {idLista} = req.body

    let query = `DELETE FROM lista_solicitud_pedido WHERE idlista_solicitud_pedido=?`
    try{
        connection.query(query, [idLista], (err, ress) => {
            if(err){
                throw err
            }
            res.status(200).send({
                message: "pedido cancelado",
                result: ress
            })
        })
    }catch(error){
        answerError("No se pudieron obtener los pedidos", error, res)
    }
}

module.exports = usuarioController;