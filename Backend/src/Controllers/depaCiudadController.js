const connection = require('../Config/db')

exports.getDepartamento = async (req, res) => {
    connection.query(`SELECT * FROM departamento;`, (err, result) => {
    if (err) {
        return res.status(500).send({
        message: "Hubo un error al verificar el departamento"
      });
    }
    res.json(result)

  });
}

exports.getCiudad = async (req, res) => {
  const {departamento} = req.body;
  const sql1 = "SELECT * FROM ciudad WHERE departamento = ?";
  
  connection.query(sql1, [departamento], (err, result) => {
    if (err) {
        return res.status(500).send({
        message: "Hubo un error al verificar la ciudad"
      });
    }
    res.json(result)
});
}