const supertest = require('supertest')
const {app, stopServer} = require('../src/index.js')
const api = supertest(app)
const db = require('../src/Config/db')
const { serverHandshake } = require('../src/Config/db')

/**
 * Get prueba
 */
describe('Obtiene el endpoint de prueba ', () => {
    test('Metodo GET en /api/prueba', async() => {
        await api
            .get('/api/prueba')
            .expect(Object)
    })
})
/**
 * Get solicitudes
 * Devuelve objeto
 * Posibles estados: 200, 500
 */
describe('Obtiene solicitudes de empresas y repartidores recien registrados Success/Unsuccess', () => {
    test('Metodo GET en /solicitudes', async () => {
        await api
            .get('/api/solicitudes')
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect([200, 500].includes(response.status)).toBe(true)
            })
    })
})
/**
 * PatchRepartidor
 */
describe('Aprueba/Desaprueba un repartidor recien registrado Success/Unsuccess', () => {
    test('Metodo PATCH a /api/solrepartidor/:id con id 1 y body=> {estado: false}', async() => {
        await api
            .patch('/api/solrepartidor/1')
            .send({estado:false})
            .expect(response => {
                expect([200, 500].includes(response.status)).toBe(true)
            })
            .expect('Content-Type', /application\/json/)
    })
})

describe('Aprueba/Desaprueba un repartidor recien registrado Unsuccess', () => {
    test('Metodo PATCH a /api/solrepartidor/:id con id 1 ', async() => {
        await api
            .patch('/api/solrepartidor/1')
            .expect(500)
            .expect('Content-Type', /application\/json/)
    })
})

/**
 * PatchEmpresa
 */
 describe('Aprueba/Desaprueba una empresa recien registrada Success/Unsuccess', () => {
    test('Metodo PATCH a /api/solempresa/:id con id 1 y body => {estado: false} ', async() => {
        await api
            .patch('/api/solempresa/1')
            .send({estado:false})
            .expect(response => {
                expect([200, 500].includes(response.status)).toBe(true)
            })
            .expect('Content-Type', /application\/json/)
    })
})
/**
 * Get Usuarios
 */
 describe('Obtiene todos los usuarios disponibles Success/Unsuccess', () => {
    test('Metodo GET a /api/usuarios', async() => {
        await api
            .get('/api/usuarios')
            .expect(response => {
                expect([200, 500].includes(response.status)).toBe(true)
            })
            .expect('Content-Type', /application\/json/)
    })
})
/**
 * Patch Usuario
 */
 describe('Aprueba/Desaprueba una empresa recien registrada Success', () => {
    test('Metodo PATCH a /api/estadousuario/:id con id 1 y body => {estado: false}', async() => {
        await api
            .patch('/api/solempresa/1')
            .send({estado:false})
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('Aprueba/Desaprueba una empresa recien registrada Unsucess', () => {
    test('Metodo PATCH a /api/estadousuario/:id con id 1 ', async() => {
        await api
            .patch('/api/solempresa/1')
            .expect(500)
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