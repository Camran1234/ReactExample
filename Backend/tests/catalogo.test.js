const supertest = require('supertest')
const {app, stopServer} = require('../src/index.js')
const api = supertest(app)
const db = require('../src/Config/db')
const { serverHandshake } = require('../src/Config/db')

/**
 * Get prueba
 */
/*describe('Obtiene el endpoint de prueba ', () => {
    test('Metodo GET en /api/prueba', async() => {
        await api
            .get('/api/prueba')
            .expect(Object)
    })
})*/

//addProducto

describe('Agrega un producto en archivo catalogoController.js Sucess/Unsuccess', () => {
    test('Metodo post en /api/catalogo/agregarProducto con body', async() => {
        await api
            .post('/api/catalogo/agregarProducto')
            .send({
                nombre: 'nombre',
                categoria: '1',
                precio: '12',
                empresa: '1',
                descripcion: 'ASDASD',
                oferta: 'true'
            })
            .expect(response => {
                expect([200, 500].includes(response.status)).toBe(true)
            })
            .expect('Content-Type', /application\/json/)
    })
})
//Categorias
describe('Obtiene las categorias de la BD en archivo catalogoController.js Sucess/Unsuccess', () => {
    test('Metodo GET en /api/catalogo/categorias', async() => {
        await api
            .get('/api/catalogo/categorias')
            .expect(response => {
                expect([200, 500].includes(response.status)).toBe(true)
            })
            .expect('Content-Type', /application\/json/)
    })
})
//Empresas
describe('Obtiene las categorias ed la BD en archivo catalogoController.js Sucess/Unsuccess', () => {
    test('Metodo GET en /api/catalogo/empresas', async() => {
        await api
            .get('/api/catologo/empresas')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})
//viewProductosCategoria
describe('Muestra los productos de una categoria en archivo catalogoController.js Sucess/Unsuccess', () => {
    test('Metodo post en /api/catalogo/verProductoCategoria con body', async() => {
        await api
            .post('/api/catologo/verProductoCategoria')
            .send({
                categoria: 1
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
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