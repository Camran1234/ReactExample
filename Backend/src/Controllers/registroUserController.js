const connection = require('../Config/db')
const crypto = require('crypto')
/*
****************** Al momento que levante la base de datos 
agregar este campo a usuario
************************************
ALTER TABLE mydb.usuario
ADD password VARCHAR(300);

*/
exports.registerUser = async(req, res) => {

    const {nombre, apellido, correo, tarjeta ,celular,departamento, ciudad, direccion, estado, password} = req.body;
    const sql1 = "SELECT * FROM usuario WHERE correo = ?";
    connection.query(sql1, [correo], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Hubo un error al verificar la existencia del usuario"
      });
    }

    if (result.length > 0) {
      return res.status(400).send({
        message: "El usuario ya existe"
      });
    }
    // Verificar si password es null o undefined
    if (password == null) {
        return res.status(400).send({
            message: "La contraseña no puede estar vacía"
        });
    }

    // Convertir password a cadena si no lo es
    

    const passwordString = password.toString();

    let hash = crypto.createHash('md5').update(passwordString).digest('hex');
    
    const sql2 = "INSERT INTO usuario(nombre, apellido, correo, tarjeta, celular, departamento, ciudad, direccion, estado, password) VALUES (?,?,?,?,?,?,?,?,?,?)";
    
    connection.query(sql2, [nombre, apellido, correo, tarjeta, celular, departamento, ciudad, direccion, estado, hash], (err, result) => {
        
        if (err) {
            return res.status(400).send({
                message: err
            });
        }

        return res.status(200).send({
            message: "Usuario registrado correctamente"
        });
    });

  });
}
exports.login = async(req, res) => {
    const {correo, password} = req.body;

    const sql = "SELECT * FROM usuario WHERE correo = ?";
    connection.query(sql, [correo], (err, result) => {

        if (err) {
            console.log(err)
        }

        if (!result.length) {
            return res.status(401).send({
                message: "Usuario o contraseña incorrecta"
            });
        }
        let hash = crypto.createHash('md5').update(password).digest('hex');

        if (hash == result[0]['password']) {
            console.log("IngresadoCorrectamente")
            return res.status(200).send({
                message: result[0]['idusuario'],
                data: result[0]
            });
        } else {
            return res.status(401).send({message: "Contraseña invalida"});
        }
    });
}