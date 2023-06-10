const connection = require('../Config/db')
const crypto = require('crypto')

exports.registerEmpresa = async(req, res) => {
  const {nombre, estado, descripcion, correo, password, url, departamento, ciudad, direccion} = req.body;
    
  const sql1 = "SELECT * FROM repartidor WHERE correo = ?";
  connection.query(sql1, [correo], (err, result) => {
    const passwordString = password.toString();

    let hash = crypto.createHash('md5').update(passwordString).digest('hex');    
    const sql2 = "INSERT INTO empresa(nombre, estado, descripcion, correo, password, url) VALUES (?,?,?,?,?,?)";

    connection.query(sql2, [nombre, estado, descripcion, correo, hash, url ], (err, result) => {
      const sql3 = "SELECT * FROM empresa WHERE correo = ?";
      connection.query(sql3, [correo], (err, resul) => {
          let idEmpresa = resul[0]['idEmpresa']
          const sql4 =  "INSERT INTO direccionEmpresa(idDepartamento,idCiudad,idEmpresa,direccion) VALUES (?,?,?,?)";
          connection.query(sql4, [departamento, ciudad, idEmpresa, direccion], (err, res) => {
              console.log("empresa registrada correctamente")
          });
          return res.status(200).send({
            message: "Usuario registrado correctamente"
        });
      });  
});
});

}

exports.loginEmpresa = async(req, res) => {
  const {correo, password} = req.body;

  const sql = "SELECT * FROM empresa WHERE correo = ?";
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
              message: result[0]['idEmpresa'],
              data: result[0]
          });
      } else {
          return res.status(401).send({message: "Contraseña invalida"});
      }
  });
}