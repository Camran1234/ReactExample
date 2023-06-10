const connection = require('../Config/db')
const informeVentas = {}

informeVentas.GetReporte = (req, res) => {
    try {
        sql1 = "SELECT COUNT(*) AS total_pedidos FROM pedido;"
        connection.query(sql1, (error, total_pedidos, fields) => {
            if (error) {
                res.status(500).send({
                    error: error,
                    message: "Error al obtener el reporte."
                })
            }
            sql2 = `SELECT e.nombre AS empresa, COUNT(*) AS cantidad_pedidos, sum(p.precio) as precio_total
                    FROM pedido p 
                    INNER JOIN lista_solicitud_pedido l ON p.idlista_solicitud_pedido = l.idlista_solicitud_pedido 
                    INNER JOIN empresa e ON l.empresa = e.idEmpresa 
                    GROUP BY e.idEmpresa;`;
            connection.query(sql2, (error, pedidos_empresa, fields) => {
                if (error) {
                    res.status(500).send({
                        error: error,
                        message: "Error al obtener el reporte."
                    })
                }
                sql3 = `SELECT p.idProducto, p.nombreProducto, SUM(pe.cantidad) as cantidad_vendida
                        FROM producto p
                        INNER JOIN pedido pe ON pe.idProducto = p.idProducto
                        GROUP BY p.idProducto
                        ORDER BY cantidad_vendida DESC;`;
                connection.query(sql3, (error, productos_mas_vendidos, fields) => {
                    if (error) {
                        res.status(500).send({
                            error: error,
                            message: "Error al obtener el reporte."
                        })
                    }

                    sql4 = `SELECT e.nombre, COUNT(*) as total_pedidos
                            FROM empresa e
                            INNER JOIN producto p ON e.idEmpresa = p.empresa_idEmpresa
                            INNER JOIN pedido pd ON p.idProducto = pd.idProducto
                            GROUP BY e.idEmpresa
                            ORDER BY total_pedidos DESC;`;
                    connection.query(sql4, (error, empresas_mas_pedidos, fields) => {
                        if (error) {
                            res.status(500).send({
                                error: error,
                                message: "Error al obtener el reporte."
                            })
                        }
                        res.status(200).send({
                            total_pedidos: total_pedidos[0].total_pedidos,
                            pedidos_empresa: pedidos_empresa,
                            productos_mas_vendidos: productos_mas_vendidos,
                            empresas_mas_pedidos: empresas_mas_pedidos
                        })
                    })

                })
            })
        })
    } catch (error) {
        res.status(500).send({
            error: error,
            message: "Internal Server Error."
        })
    }
}

module.exports = informeVentas;