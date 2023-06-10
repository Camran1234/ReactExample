const connection = require('../Config/db')
const crypto = require('crypto')


exports.registerRepartidor = async(req, res) => {

    const {nombre,apellido,correo,departamento,ciudad,nit,cv,estado,celular,password,propietario,numLicencia,licencia} = req.body;
    
    const sql1 = "SELECT * FROM repartidor WHERE correo = ?";
    connection.query(sql1, [correo], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Hubo un error al verificar la existencia del repartidor"
      });
    }
    if (result.length > 0) {
        return res.status(400).send({
          message: "El usuario ya existe"
        });
      }
      const passwordString = password.toString();

      let hash = crypto.createHash('md5').update(passwordString).digest('hex');
      
      const sql2 = "INSERT INTO repartidor(nombre, apellido, correo, departamento, ciudad, nit, cv, estado,celular,password) VALUES (?,?,?,?,?,?,?,?,?,?)";
      connection.query(sql2, [nombre, apellido, correo, departamento, ciudad, nit, cv, estado, celular, hash], (err, result) => {
        const sql3 = "SELECT * FROM repartidor WHERE correo = ?";
        connection.query(sql3, [correo], (err, resul) => {
            let idRepartidor = resul[0]['idrepartidor']
            const sql4 =  "INSERT INTO transporte(propietario,num_licencia,tipo_licencia,repartidor_idrepartidor) VALUES (?,?,?,?)";
            connection.query(sql4, [propietario, numLicencia, licencia, idRepartidor], (err, res) => {
                console.log("repartidor registrado correctamente")
            });
            return res.status(200).send({
              message: "Usuario registrado correctamente"
          });
        });  
  });
});
  
}
exports.loginRepartidor = async(req, res) => {
  const {correo, password} = req.body;
  const sql = "SELECT * FROM repartidor WHERE correo = ?";
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
          return res.status(200).send({
              message: result[0]['idrepartidor'],
              data: result[0]
          });
      } else {
          return res.status(401).send({message: "Contraseña invalida"});
      }
  });
}