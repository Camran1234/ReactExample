const connection = require('../Config/db')
const informeUsuaurio = {}

informeUsuaurio.GetReporte = (req, res) => {
    try{
        sql1 = "SELECT COUNT(*) as total_usuarios FROM usuario;"
        connection.query(sql1, (error, total_usuarios, fields) => {
            if(error){
                res.status(500).send({
                    error: error,
                    message: "Error al obtener el reporte."
                })
            }
            sql2 = "SELECT COUNT(*) as usuarios_activos FROM usuario where estado = 0;"
            connection.query(sql2, (error, usuarios_activos, fields) => {
                if(error){
                    res.status(500).send({
                        error: error,
                        message: "Error al obtener el reporte."
                    })
                }
                sql3 = `SELECT u.nombre, u.apellido, COUNT(*) AS num_pedidos, u.correo
                        FROM usuario u
                        JOIN lista_solicitud_pedido lsp ON u.idusuario = lsp.usuario
                        WHERE lsp.fecha >= DATE_SUB(NOW(), INTERVAL 5 DAY)
                        GROUP BY u.idusuario
                        HAVING COUNT(*) > 0
                        ORDER BY num_pedidos DESC;`
                connection.query(sql3, (error, usuarios_pedidos, fields) => {
                    if(error){
                        res.status(500).send({
                            error: error,
                            message: "Error al obtener el reporte."
                        })
                    }
                    res.status(200).send({
                        total_usuarios: total_usuarios[0].total_usuarios,
                        usuarios_activos: usuarios_activos[0].usuarios_activos,
                        usuarios_pedidos: usuarios_pedidos
                    })
                })
                
            })
        })

    }catch(error){
        res.status(500).send({
            error: error,
            message: "Internal Server Error."
        })
    }
}

module.exports = informeUsuaurio;
