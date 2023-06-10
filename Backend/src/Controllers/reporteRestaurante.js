const conn = require('../Config/db')

exports.viewReportsDate = async (req, res) => {

    const {fecha, idEmpresa} = req.body;

    const sql = `select e.nombre as empresa, SUM(p2.cantidad) as num_pedidos, SUM(p2.cantidad * p.precio) as ventas,
                lsp.calificacion,
                (SELECT p.nombreProducto ORDER BY MAX(p2.cantidad)) AS producto,
                (SELECT MAX(p2.cantidad)) AS cantidad
                from producto p
                inner join pedido p2 on p.idProducto = p2.idProducto
                inner join empresa e on p.empresa_idEmpresa = e.idEmpresa
                inner join lista_solicitud_pedido lsp on p2.idlista_solicitud_pedido = lsp.idlista_solicitud_pedido
                WHERE lsp.fecha = '${fecha}' AND e.idEmpresa = ${parseInt(idEmpresa)}`;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send({
                result: 'Error al ver reporte de restaurante'
            })
        }
        return res.status(200).json({
            result: result
        })
    })
}

exports.viewReportsProduct = async (req, res) => {
    const {idProducto, idEmpresa} = req.body;

    const sql = `select e.nombre as empresa, SUM(p2.cantidad) as num_pedidos, SUM(p2.cantidad * p.precio) as ventas,
                lsp.calificacion,
                (SELECT p.nombreProducto ORDER BY MAX(p2.cantidad)) AS producto,
                (SELECT MAX(p2.cantidad)) AS cantidad
                from producto p
                inner join pedido p2 on p.idProducto = p2.idProducto
                inner join empresa e on p.empresa_idEmpresa = e.idEmpresa
                inner join lista_solicitud_pedido lsp on p2.idlista_solicitud_pedido = lsp.idlista_solicitud_pedido
                WHERE p.idProducto = ${parseInt(idProducto)} AND e.idEmpresa = ${parseInt(idEmpresa)}`;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send({
                result: 'Error al ver reporte de restaurante'
            })
        }
        return res.status(200).json({
            result: result
        })
    })
}

exports.viewProducts = async (req, res) => {
    const sql = `select p.idProducto, p.nombreProducto from producto p`
    conn.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send({
                result: 'Error al ver productos'
            })
        }
        return res.status(200).json({
            result: result
        })
    })
}

exports.viewVentas = async (req, res) => {

    const {fecha, idEmpresa} = req.body;

    const sql = `select e.nombre as empresa, p2.cantidad as num_pedidos, p.nombreProducto, p2.cantidad * p.precio as ventas
                from producto p
                inner join pedido p2 on p.idProducto = p2.idProducto
                inner join empresa e on p.empresa_idEmpresa = e.idEmpresa
                inner join lista_solicitud_pedido lsp on p2.idlista_solicitud_pedido = lsp.idlista_solicitud_pedido
                where e.idEmpresa = ${parseInt(idEmpresa)} and lsp.fecha = '${fecha}'
                ORDER BY num_pedidos DESC`;
    
    conn.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send({
                result: 'Error al ver reporte de restaurante'
            })
        }
        return res.status(200).json({
            result: result
        })
    })
}