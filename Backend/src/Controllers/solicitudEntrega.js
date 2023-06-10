const mysql = require('mysql2')
const conn = require('../Config/db')

exports.getSolicitudEngrega = async (req, res) => {
    const c = mysql.createConnection(conn.config)
    c.connect(function (err) {
        if (err) {
            res.json({ "message": "Error en solicitud de pedidos" })
            c.end()
            return
        }
        c.query(`select A.direccion, A.estado, C.nombreProducto, D.nombre, D.apellido from lista_solicitud_pedido A 
                inner join pedido B
                on A.idlista_solicitud_pedido = B.idlista_solicitud_pedido
                inner join producto C
                on B.idProducto = C.idProducto
                inner join usuario D
                on A.usuario = D.idusuario
                where A.estado =0;`,
                    function (err, ress) {
            if (err) {
                res.json({ "message": "Error en solicitud de pedidos" })
                c.end()
                return
            }
            res.json(ress)
            c.end()
        })
    })
}
