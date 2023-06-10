const connection = require('../Config/db')
const informeRepartidor = {}

informeRepartidor.GetReporte = (req, res) => {
    try {
        slq = `select r.idrepartidor, r.nombre, r.apellido, r.correo, c.cant_envios, c.total_puntos, cm.comision
                from calificacion c
                inner join repartidor r on r.idrepartidor = c.repartidor_idrepartidor
                inner join comisiones cm on cm.repartidor_idrepartidor = r.idrepartidor ;`
        connection.query(slq, (error, reporte, fields) => {
            if (error) {
                res.status(500).send({
                    error: error,
                    message: "Error al obtener el reporte."
                })
            }
            res.status(200).send({
                reporte: reporte
            })
        })
    } catch (error) {
        res.status(500).send({
            error: error,
            message: "Internal Server Error."
        })
    }
}

module.exports = informeRepartidor;