const connection = require('../Config/db')
const empresaController = {};

function answerError(mensaje,err, res){
    res.status(500).send({
        "message":"Error solicitud "+mensaje,
        "error": err
    })
}


function handleModifyProducto (req, res, idCategoria) {
    let {idProducto, nombreProducto, categoria, precio, descripcion,
        oferta, productosOferta, foto} = req.body;
    console.log("Modificando: "+JSON.stringify(req.body))
    let queryUpdateProduct = `UPDATE producto SET nombreProducto=?, categoria_idcategoria=?,
                                precio=?, descripcion=?, oferta=?, foto=? WHERE idProducto=?`
    let queryCleanOferta = `DELETE FROM oferta WHERE producto=?`;
    let queryInsertOferta = `INSERT INTO oferta (producto, productoRelacionado) VALUES (?, ?)`

    let dataSet = [nombreProducto, idCategoria, precio, descripcion, oferta, foto, idProducto];
    
    connection.query(queryUpdateProduct, dataSet, (errorModifyProduct, respondModifyProduct) => {
        if(errorModifyProduct){
            console.log("Error Modificando: "+JSON.stringify(errorModifyProduct))
            answerError("Error: ", errorModifyProduct, res)
            return
        }
        console.log("RESPUESTA UPDATE: "+JSON.stringify(respondModifyProduct))
            connection.query(queryCleanOferta, [idProducto], (errorCleanProducto, respondCleanProducto) => {
                if(errorCleanProducto){
                    answerError("Error Clean: ",errorCleanProducto, res)
                    return
                }
    
                if(oferta){
                    console.log("Es oferta")
                    for(let index=0; index<productosOferta.length; index++){
                        console.log("Analizando oferta: "+JSON.stringify(productosOferta[index]));
                        connection.query(queryInsertOferta, [idProducto, productosOferta[index].idProducto], (errorInsertOferta, respondInsertOfert) => {
                            if(errorInsertOferta){
                                answerError("Error: ",errorInsertOferta, res)
                                return
                            }
        
                            if(index == (productosOferta.length -1)){
                                console.log("Terminando ingreso")
                                res.status(200).send({
                                    message: "Producto Ofertado Modificado: "
                                })
                            }
                        })
                    }
                }else{
                    console.log("No es oferta")
                    res.status(200).send({
                        message: "Producto Modificado: "
                    })
                    return
                }
            })   
    });
}

/**
 * body: {
 *  idProducto: 1
 *  nombreProducto: capuchino,
 *  categoria: cafes,
 *  precio: 0.12,
 *  descripcion: "descripcion",
 *  oferta: false,
 *  productosOferta: [
 *      {
 *          idProducto: 1
 *      },
 *      {
 *          idProducto: 2
 *      }
 *  ],
 *  foto: "Link"
 * }
 */
empresaController.modifyProducto = (req, res) => {
    let {idProducto, nombreProducto, categoria, precio, descripcion,
    oferta, productosOferta, foto} = req.body;
    console.log("Insert Producto: ")
    console.log(JSON.stringify(req.body))
    let queryCheckCategory = `SELECT idCategoria FROM categoria WHERE categoria=?`
    let queryInsertCategory = `INSERT INTO categoria (categoria) VALUES (?)`
    try{
        //Verificar primero la categoria
        //Si existe recuperar el id
        //Si no existe crear la categoria y recuperar el id
        //Ingresar primero el producto,
        //Verificar si es oferta
        //Si es oferta ingresar a tabla oferta
        connection.query(queryCheckCategory, [categoria], (errorCategory, respondCategory) => {
            if(errorCategory){
                answerError("Error:"+errorCategory, res);
                return
            }
            console.log("Query checkCategory ejecutada")
            if(respondCategory && respondCategory.length > 0){
                let idCategoria = respondCategory[0].idCategoria;
                handleModifyProducto(req, res, idCategoria)
            }else{
                connection.query(queryInsertCategory, [categoria], (errorInsertCategory, respondInsertCategory) => {
                    console.log("Query insertCategory ejecutada")
                    if(errorInsertCategory){
                        answerError("Error: ", errorInsertCategory, res);
                        return
                    }
                    let idCategoria = respondInsertCategory.insertId;
                    handleModifyProducto(req, res, idCategoria)
                })
            }
        })
    }catch(error){
        answerError("No se pudo ingresar el producto", error, res)
    }
}


function handleInsertProduct (req, res, idCategoria) {
    let {idEmpresa, nombreProducto, categoria, precio, descripcion,
        oferta, productosOferta, foto} = req.body;
    let queryInsertProduct = `INSERT INTO producto (nombreProducto, categoria_idcategoria, precio, empresa_idEmpresa,
        descripcion, oferta, foto)
        VALUES (?, ?, ?, ?, ?, ?, ?)`
    let queryInsertOferta = `INSERT INTO oferta (producto, productoRelacionado) VALUES (?, ?)`

    let dataSet = [nombreProducto, idCategoria, precio, idEmpresa, descripcion, oferta, foto];
    console.log("Pre handleInsertProduct")
    connection.query(queryInsertProduct, dataSet, (errorInsertProduct, respondInsertProduct) => {
        if(errorInsertProduct){
            answerError("Error: ", errorInsertProduct, res)
        }
        console.log("Query InsertProducto ejecutada")
        let idProducto = respondInsertProduct.insertId;
        if(oferta){
            console.log("Es oferta")
            for(let index=0; index<productosOferta.length; index++){
                connection.query(queryInsertOferta, [idProducto, productosOferta[index].idProducto], (errorInsertOferta, respondInsertOfert) => {
                    if(errorInsertOferta){
                        answerError("Error: ",errorInsertOferta, res)
                    }

                    if(index == (productosOferta.length -1)){
                        res.status(200).send({
                            message: "Producto Ofertado Ingresado: "+idProducto
                        })
                    }
                })
            }
        }else{
            console.log("No es oferta")
            res.status(200).send({
                message: "Producto Ingresado: "+idProducto
            })
        }
    });
}

/**
 * body: {
 *  idEmpresa: 1
 *  nombreProducto: capuchino,
 *  categoria: cafes,
 *  precio: 0.12,
 *  descripcion: "descripcion",
 *  oferta: false,
 *  productosOferta: [
 *      {
 *          idProducto: 1
 *      },
 *      {
 *          idProducto: 2
 *      }
 *  ],
 *  foto: "Link"
 * }
 */
empresaController.insertProducto = (req, res) => {
    let {idEmpresa, nombreProducto, categoria, precio, descripcion,
    oferta, productosOferta, foto} = req.body;
    console.log("Insert Producto")
    console.log(JSON.stringify(req.body))
    let queryCheckCategory = `SELECT idCategoria FROM categoria WHERE categoria=?`
    let queryInsertCategory = `INSERT INTO categoria (categoria) VALUES (?)`
    try{
        //Verificar primero la categoria
        //Si existe recuperar el id
        //Si no existe crear la categoria y recuperar el id
        //Ingresar primero el producto,
        //Verificar si es oferta
        //Si es oferta ingresar a tabla oferta
        connection.query(queryCheckCategory, [categoria], (errorCategory, respondCategory) => {
            if(errorCategory){
                answerError("Error:"+errorCategory, res);
            }
            console.log("Query checkCategory ejecutada")
            if(respondCategory && respondCategory.length > 0){
                let idCategoria = respondCategory[0].idCategoria;
                handleInsertProduct(req, res, idCategoria)
            }else{
                connection.query(queryInsertCategory, [categoria], (errorInsertCategory, respondInsertCategory) => {
                    console.log("Query insertCategory ejecutada")
                    if(errorInsertCategory){
                        answerError("Error: ", errorInsertCategory, res);
                    }
                    let idCategoria = respondInsertCategory.insertId;
                    handleInsertProduct(req, res, idCategoria)
                })
            }
        })
    }catch(error){
        answerError("No se pudo ingresar el producto", error, res)
    }
}

empresaController.deleteProducto = (req, res) => {
    let {idProducto} = req.body;
    let query = `DELETE FROM producto WHERE idProducto=?`
    try{
        connection.query(query, [idProducto], (errorProducto, respondProducto) => {
            if(errorProducto){
                answerError("Error: ", errorProducto, res);
            }
            res.status(200).send({
                message: "Producto eliminado"
            })
        })
    }catch(error){
        answerError("Error Fatal: ",error, res)
    }
}

empresaController.getOferta = (req, res) => {
    let {idProducto} = req.body;
    let query = `SELECT o.productoRelacionado, p.nombreProducto 
                    FROM oferta o INNER JOIN producto p ON o.productoRelacionado = p.idProducto 
                    WHERE producto=?`
    try{
        connection.query(query, [idProducto], (errorOferta, respondOferta) => {
            if(errorOferta){
                answerError("Error: ", errorOferta, res)
            }
            if(respondOferta && respondOferta.length>0){
                res.status(200).send({
                    respondOferta
                })
            }else{
                console.log("error oferta; vacio nulo :"+JSON.stringify(respondOferta))
                answerError("Error oferta: ", "Vacio o Nulo", res);
            }
        })
    }catch(error){
        console.log("Error fatal getOferta")
        answerError("Error Fatal: ", error, res)
    }
}


empresaController.getCategoria = (req, res) => {
    let {idCategoria} = req.body;

    let query = `SELECT * FROM categoria WHERE idCategoria = ?`

    try{
        connection.query(query, [idCategoria], (err, respond) => {
            if(err){
                answerError("Error: ", err, res)
            }
            if(respond != null && respond != undefined){
                if(respond.length > 0){
                    res.status(200).send({
                        categoria: respond[0].categoria,
                    })
                }else{
                    answerError("Error: categoria vacia", "", res)
                }
            }else{
                answerError("Error: categoria nula", error, res)
            }
        })
    }catch(error) {
        answerError("Error: no se pudo ejecutar la query getCategoria", error, res)
    }
}

empresaController.check = (req, res) => {
    let {idEmpresa} = req.body;

    let query = `SELECT estado FROM empresa WHERE idEmpresa=?`
    try{
        connection.query(query, [idEmpresa], (err, ress) => {
            if(err){
                answerError("Error obteniendo usuario", err, res)
            }

            if(ress!= null){
                if(ress.length > 0){
                    res.status(200).send({
                        estado: ress[0].estado,
                    })
                }else{
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


//estados de pedidos
//0 Esperando verificacion 
//1 En proceso
//2 En camino
//3 Entregado
//4 Cancelado

//cambia un pedido del restaurante de Esperando verificacio a En proceso, una vez en proceso les aparecera a los repartidores
empresaController.aceptarPedido = (req, res) => {    
    let idPedido = req.body.idPedido;
    let estado = "En proceso"
    let query = `UPDATE lista_solicitud_pedido l SET estado = ? WHERE l.idlista_solicitud_pedido = ?`
    try{
        let insertedData = [estado, idPedido]
        connection.query(query, insertedData, (err, respond) => {
            if(err || respond === undefined || respond === null){
                throw err
            }
            res.status(200).send({
                message: "Orden "+idPedido+" en proceso"
            })
        })
    }catch(exception){
        answerError("Error aceptando el pedido", exception, res)
    }
    
}

empresaController.negarPedido = (req, res) => {
    
    let {idPedido, descripcionCancelado} = req.body;
    let estado = "Cancelado"
    let query = `UPDATE lista_solicitud_pedido l SET estado = ?, descripcion_cancelado=? WHERE l.idlista_solicitud_pedido = ?`
    try{
        let insertedData = [estado, descripcionCancelado, idPedido]
        connection.query(query, insertedData, (err, respond) => {
            if(err || respond === undefined || respond === null){
                throw err
            }
            res.status(200).send({
                message: "Orden "+idPedido+" negada"
            })
        })
    }catch(exception){
        answerError("Error aceptando el pedido", exception, res)
    }
    
}

empresaController.getDepartamentoName = (req, res) => {
    let idDepartamento = req.body.idDepartamento;
    let query = `SELECT departamento FROM departamento WHERE idDepartamento=?`
    try{
        connection.query(query, [idDepartamento], (err, respond) => {
            if(err || respond === undefined || respond === null){
                throw err
            }
            if(respond.length >0 ){
                let departamento = respond[0]
                res.status(200).send({
                    departamento
                })
            }
        })
    }catch(error){
        answerError("No se pudo recuperar el nombre del departamento", error, res)
    }
}

empresaController.getCiudadName = (req, res) => {
    let {idDepartamento, idCiudad} = req.body;
    let query = `SELECT ciudad FROM ciudad WHERE idCiudad=? AND departamento=?`
    try{
        let insertData = [idDepartamento, idCiudad]
        connection.query(query, insertData, (err, respond) => {
            if(err || respond === undefined || respond === null){
                throw err
            }
            if(respond.length >0 ){
                let ciudad = respond[0]
                res.status(200).send({
                    ciudad
                })
            }
        })
    }catch(error){
        answerError("No se pudo recuperar el nombre del departamento", error, res)
    }
}

empresaController.detallarPedido = (req, res) => {
    let {idPedido, departamento, ciudad} = req.body;
    let queryDetallePedidos = `SELECT pr.nombreProducto ,p.cantidad, p.descripcion, pr.oferta 
                                    FROM pedido p 
                                        INNER JOIN producto pr 
                                        ON p.idProducto=pr.idProducto 
                                WHERE idlista_solicitud_pedido=?`
    try{
        console.log("Entry First foreach with idPedido= "+idPedido)
        let pedidos = [];
        connection.query(queryDetallePedidos, [idPedido], (err, ress) => {
            if(err || ress === undefined || ress === null){
                throw err
            }
            console.log("Second query executed with result: "+JSON.stringify(ress))
            if(ress.length > 0){
                ress.forEach(node => {
                    console.log("Entring second loop")
                    /*
                        {
                            nombreProducto: '',
                            cantidad: 0,
                            descripcion: "" or null,
                            oferta: 0/1
                        }
                    */ 
                    pedidos.push(node)
                })
                console.log("Printing data")
                res.status(200).send({
                    idPedido: idPedido,
                    departamento: departamento,
                    ciudad: ciudad,
                    pedidos: pedidos,
                })
            }                
        })   
    }catch(e){
        answerError("No se pudo detallar el pedido ", e, res)
    }
}

empresaController.deployPedidos = (req, res) => {
    //estado: "Esperando verificacion" "En proceso"
    let {idEmpresa, estado} = req.body
    let query = `SELECT l.idlista_solicitud_pedido as idPedido, l.departamento, l.ciudad
                    FROM lista_solicitud_pedido l 
                    WHERE l.empresa = ?
                        AND l.estado = ?
                        AND (l.departamento, l.ciudad) 
                            IN (SELECT d.idDepartamento as departamento, d.idCiudad as ciudad 
                                    FROM direccionEmpresa d 
                                    WHERE d.idEmpresa = ?
                                )`
    console.log("Prepared for action")
    try{
        let data = [idEmpresa, estado, idEmpresa]
        console.log("Starting to executing first query with params: "+JSON.stringify(data))
        connection.query(query, data, (error, result) => {
            console.log("Checking for query errors")
            if(error || result === undefined || result === null){
                throw error
            }
            console.log("Results first query: "+JSON.stringify(result))
            if(result.length > 0){
                console.log("First query completed: "+JSON.stringify(result));
                res.status(200).send({
                    result
                })
            }            
        })
    }catch(e){
        answerError("No se pudo desplegar pedidos del restaurante", e, res)
    }
    return;
}

module.exports = empresaController;