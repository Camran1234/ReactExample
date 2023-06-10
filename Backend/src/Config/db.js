const mysql = require('mysql2')


/*const configure = {
  host: '127.0.0.1',
  user: 'mauricio',
  multipleStatements: true,
  password: 'PAPUpro5462',
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'mydb'
}*/

const configure = {
  host: 'localhost',
  user: 'root',
  multipleStatements: true,
  //password: 'Maldonado2022+',
  password: '',
  database: 'mydb'
}

const connection = mysql.createConnection(configure)

const config = {
  host: "localhost",
  user: "root",
  password: "secret",
  database: "mydb"
}

connection.connect((error) => {
    if (error) {
      console.error('Error de conexión: ' + error.stack)
      return
    }
  
    console.log('Conexión establecida con el ID ' + connection.threadId)
})
 

module.exports = connection, configure;