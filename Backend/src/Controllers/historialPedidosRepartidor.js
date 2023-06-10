const mysql = require('mysql2')
const conn = require('../Config/db')

exports.getHistorialPedisdosRepartidor = async (req, res) => {
    const c = mysql.createConnection(conn.config)
    c.connect(function (err) {
        if (err) {
            res.json({ "message": "Error en historial pedidos de repartidor" })
            c.end()
            return
        }
        c.query(`SELECT B.nombre, B.apellido, A.descripcion, A.direccion, A.estado, A.calificacion, date_format(A.fecha, "%d-%m-%Y") as fecha, A.estado, C.descripcion, D.nombreproducto FROM lista_solicitud_pedido A
                INNER JOIN repartidor B
                ON A.repartidor_idrepartidor = B.idrepartidor
                INNER JOIN pedido C 
                ON A.idlista_solicitud_pedido = C.idlista_solicitud_pedido
                INNER JOIN producto D
                ON C.idproducto = D.idproducto;`,
                    function (err, ress) {
            if (err) {
                res.json({ "message": "Error en historial pedidos de repartidor" })
                c.end()
                return
            }
            res.json(ress)
            c.end()
        })
    })
}

exports.getComisionesRepartidor = async (req, res) => {
    const c = mysql.createConnection(conn.config)
    c.connect(function (err) {
        if (err) {
            res.json({ "message": "Error en comisiones de Repartidor" })
            c.end()
            return
        }
        c.query(`SELECT A.nombre, A.apellido, A.correo, A.nit, B.comision FROM repartidor A
                INNER JOIN comisiones B
                ON A.idrepartidor = B.repartidor_idrepartidor;`,
                    function (err, ress) {
            if (err) {
                res.json({ "message": "Error en comisiones de Repartidor" })
                c.end()
                return
            }
            res.json(ress)
            c.end()
        })
    })
}