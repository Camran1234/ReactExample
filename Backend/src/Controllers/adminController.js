const connection = require('../Config/db')
const adminController = {}

adminController.GetPrueba = (req, res) => {
    res.send("Endpoint de prueba funcionando.")
}

adminController.GetSolicitudes = (req, res) => {
    try {
        connection.query(`select rp.idrepartidor, rp.nombre, rp.apellido, rp.correo, rp.celular, c.ciudad, d.departamento, rp.nit, rp.cv, rp.estado 
                        from repartidor rp
                        inner join ciudad c on rp.ciudad = c.idCiudad
                        inner join departamento d on d.idDepartamento = rp.departamento
                        where rp.estado = ?;`, 
        [0],
        (error, repartidores, fields) => {
            if(error) {
                res.status(500).send({ 
                    error: error,
                    message: "Error al obtener las solicitudes." })
            } else {
                connection.query(`select de.idDepartamento, de.idCiudad, de.idEmpresa, de.direccion, em.nombre, dp.departamento, cd.ciudad from direccionEmpresa de
                inner join empresa em on de.idEmpresa = em.idEmpresa 
                inner join departamento dp on de.idDepartamento = dp.idDepartamento
                inner join ciudad cd on de.idCiudad = cd.idCiudad
                where em.estado = ?;`,
                [0],
                (error, empresas, fields) => {
                    if(error) {
                        res.status(500).send({ 
                            error: error,
                            message: "Error al obtener las solicitudes." })
                    }else {
                        res.status(200).send({
                            repartidores: repartidores,
                            empresas: empresas
                        })
                    }

                })
            }
            
        })
    } catch (error) {
        res.status(500).send({
            error: error,
            message: "Internal Server Error."
        })
    }
}

adminController.PatchRepartidor = (req, res) => {
    const id = req.params.id;
    const estado = req.body.estado;
    
    connection.query("UPDATE repartidor SET estado = ? WHERE idrepartidor = ?;",
    [estado, id],
    (error, result, fields) => {
        if(error){
            res.status(500).send({
                error: error,
                message: "Error al actualizar el estado del repartidor."
            })
        }else {
            if(estado == 1){
                res.status(200).send({
                    message: "Repartidor aprobado."
                })
            }else{
                res.status(200).send({
                    message: "Repartidor rechazado."
                })
            }
        }
    });
};

adminController.PatchEmpresa = (req, res) => {
    const id = req.params.id;
    const estado = req.body.estado;

    connection.query("UPDATE empresa SET estado = ? WHERE idEmpresa = ?;",
    [estado, id],
    (error, result, fields) => {
        if(error){
            res.status(500).send({
                error: error,
                message: "Error al actualizar el estado de la empresa."
            })
        }else {
            if(estado == 1){
                res.status(200).send({
                    message: "Empresa aprobada."
                })
            }else{
                res.status(200).send({
                    message: "Empresa rechazada."
                })
            }
        }
    });
};

adminController.GetUsuarios = (req, res) => {
    try {
        connection.query(`select u.idusuario, u.nombre, u.apellido, u.correo, u.tarjeta, u.celular, u.direccion, u.estado, c.ciudad, d.departamento 
                            from usuario u
                            inner join ciudad c on c.idCiudad = u.ciudad
                            inner join departamento d on d.idDepartamento = u.departamento;`,
        (error, usuarios, fields) => {
            if(error) {
                res.status(500).send({ 
                    error: error,
                    message: "Error al obtener los usuarios." })
            } else {
                res.status(200).send({
                    usuarios: usuarios
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            error: error,
            message: "Internal Server Error."
        })
    }
}

adminController.PatchUsuario = (req, res) => {
    try {
        const id = req.params.id;
        const estado = req.body.estado;
        
        connection.query('UPDATE usuario SET estado = ? WHERE idusuario = ?;',
        [estado, id],
        (error, result, fields) => {
            if(error){
                res.status(500).send({
                    error: error,
                    message: "Error al actualizar el estado del usuario."
                })
            }else{
                let message = estado == 1 ? "Usuario desactivado." : "Usuario activado.";
                res.status(200).send({
                    message: message,
                    hola: 2
                })
            }
        }
        )
    } catch (error) {
        res.status(500).send({
            error: error,
            message: "Internal Server Error."
        })
    }
}

module.exports = adminController