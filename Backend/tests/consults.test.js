const supertest = require('supertest')
const {app, stopServer} = require('../src/index.js')
const api = supertest(app)
const db = require('../src/Config/db')

/**
 * /api/GetCategorias
 */
 describe('Obtiene las categorias existentes consultas.js Sucess/Unsuccess', () => {
    test('Metodo get en /api/GetCategorias', async() => {
        await api
            .get('/api/GetCategorias')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .expect(Object)
    })
})

/**
 * Close Connection
 */
 describe('Cierra la conexion', () => {
    test('Ejecuta la funcion end() de la conexion', async () => {
        stopServer();
        db.end();        
    })
})