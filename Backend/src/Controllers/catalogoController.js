const conn = require('../Config/db')

exports.addProduct = async (req, res) => {
    console.log("Llego")
    const {nombre, categoria, precio, empresa, descripcion, oferta} = req.body;
    console.log(nombre)
    console.log(categoria)
    console.log(precio)
    console.log(empresa)
    console.log(descripcion)
    console.log(oferta)

    const sql = `INSERT INTO producto(nombreProducto, categoria_idcategoria, precio, empresa_idEmpresa, descripcion, oferta)
    VALUES(?,?,?,?,?,?)`;
    conn.query(sql, [nombre, parseInt(categoria), parseFloat(precio), parseInt(empresa), descripcion, parseInt(oferta)], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: "Error al insetar producto"
            })
        }
        return res.status(200).json({
            message: "Producto agregado correctamente"
        })
    })
}

exports.Categorias = async (req, res) => {
    const sql = `SELECT * FROM categoria`;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: err
            })
        }
        return res.status(200).json({
            result: result
        })
    })
}

exports.Empresas = async (req, res) => {
    const sql = `SELECT * FROM empresa`;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: err
            })
        }
        return res.status(200).json({
            result: result
        })
    })
}

exports.viewProductosCategoria = async (req, res) => {
    const {categoria} = req.body;
    const sql = `SELECT c.categoria, p.nombreProducto as nombre, p.precio, e.nombre as empresa, p.descripcion,
                (CASE WHEN p.oferta = 0 THEN 'No'
                    WHEN p.oferta = 1 THEN 'Si' END) AS oferta
                FROM categoria c
                INNER JOIN producto p on c.idCategoria = p.categoria_idcategoria
                INNER JOIN empresa e on p.empresa_idEmpresa = e.idEmpresa
                WHERE c.idCategoria = ?;`;
        conn.query(sql, [parseInt(categoria)], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            }
            return res.status(200).json({
                result: result
            })
        })
}