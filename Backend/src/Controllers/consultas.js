const mysql = require('mysql')
const config = {
    host: "localhost",
    user: "root",
    //password: "Maldonado2022+",
    password: "",
    database: "mydb"
}

// ************************************************* PELICULAS *****************************
exports.getCategorias = async(req, res) => {
    const c = mysql.createConnection(config)
    c.connect(function(err) {
        if (err) {
            res.json({ "message": "Error al ver categorias" , "error":err})
            c.end()
            return
        }
        c.query(`SELECT * FROM categoria;`, function(err, ress) {
            if (err) {
                res.json({ "message": "Error al ver categorias" })
                c.end()
                return
            }
            res.json(ress)
            c.end()
        })
    })
}


exports.buscarProductoEmpresa = async(req, res) => {
    let nombre =  req.params.nombre;    
    const c = mysql.createConnection(config)
    c.connect(function(err) {
        if (err) {
            res.json({ "message": "Error al buscar" })
            c.end()
            return
        }
       
       c.query(`select * from producto where empresa_idEmpresa = (select idEmpresa from empresa where nombre ="${nombre}");`,
        function(err, ress) {     
        if (err) {
                res.json({ "message": "Error al buscar" })
                c.end()
                return
            }
            if (ress.length == 0) {
                res.json({ "message": "Error al buscar" })
                c.end()
                return
            }
            //res.json(ress[0])
            res.json(ress)
            c.end()
        })
    })
}



