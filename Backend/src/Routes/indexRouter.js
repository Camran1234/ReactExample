const express = require('express')
const router = express.Router()
const repartidorController = require('../Controllers/repartidorController');
const registerUserController = require('../Controllers/registroUserController')
const adminController = require('../Controllers/adminController')
const empresaController = require('../Controllers/empresaController')
const solicitudes = require('../Controllers/solicitudEntrega')//SF
const pedidos = require('../Controllers/pedidosAsignados')//SF
const depaCiudadController = require('../Controllers/depaCiudadController')
const registerRepartidor = require('../Controllers/registroRepartidorController')
const registerEmpresa = require('../Controllers/registroEmpresaController')
const catalogo = require('../Controllers/catalogoController')
const historialRepartidor = require('../Controllers/historialPedidosRepartidor')//SF
const reportesRestaurante = require('../Controllers/reporteRestaurante')
const informeusuarios = require('../Controllers/informeUsuario')
const informeRepartidor = require('../Controllers/informeRepartidor')
const informeVentas = require('../Controllers/informeVentas')
/***Recupera los valores de la base de datos para ciudad y Departamento */
router.get("/departamento", depaCiudadController.getDepartamento)
router.post("/ciudad", depaCiudadController.getCiudad)
/*************************************************************************/
const usuarioController = require('../Controllers/usuarioController')

const consultas = require('../Controllers/consultas');

/************************** Registro Empresa *************************/
router.post("/registroEmpresa", registerEmpresa.registerEmpresa)
router.post("/loginRepartidor", registerRepartidor.loginRepartidor)
/************************** Registro Repartidor *************************/
router.post("/registroRepartidor", registerRepartidor.registerRepartidor)
router.post("/loginEmpresa", registerEmpresa.loginEmpresa)
/************************** Registro Usuario *************************/
router.post("/registro", registerUserController.registerUser)
router.post("/login", registerUserController.login)

router.get("/prueba", adminController.GetPrueba)
router.get("/solicitudes", adminController.GetSolicitudes)
router.patch("/solrepartidor/:id", adminController.PatchRepartidor)
router.patch("/solempresa/:id", adminController.PatchEmpresa)
router.get("/solicitudEntrega",solicitudes.getSolicitudEngrega)//SF
router.get("/pedidosAsignados",pedidos.getPedidosAsignados)//SF
router.get("/usuarios", adminController.GetUsuarios)
router.patch("/estadousuario/:id", adminController.PatchUsuario)
router.get("/informeusuarios", informeusuarios.GetReporte)
router.get("/informerepartidor", informeRepartidor.GetReporte)
router.get("/informeventas", informeVentas.GetReporte)
// Agregar sus endpoints aqui
//Repartidor 
router.post("/repartidor/pedidosCercanos", repartidorController.pedidosCercanos);
router.post("/repartidor/detallesPedido", repartidorController.detallesPedido);
router.post("/repartidor/getEstadoRepartidor", repartidorController.getRepartidorStatus);
router.post("/repartidor/followOrder", repartidorController.followOrder);
router.post("/repartidor/cancelOrder", repartidorController.cancelOrder);
router.post("/repartidor/getStatusOrder", repartidorController.getStatusOrder);
router.post("/repartidor/setStatusOrder", repartidorController.setStatusOrder);
router.get("/repartidor/historialRepartidor", historialRepartidor.getHistorialPedisdosRepartidor);//SF
router.get("/repartidor/comisionesRepartidor", historialRepartidor.getComisionesRepartidor);//SF
// ***************** JUAN CARLOS
router.get("/GetCategorias", consultas.getCategorias)
router.post("/ProductoEmpresa", repartidorController.postBuscarProductoEmpresa)
router.post("/CategoriaEmpresa", repartidorController.postCategoriaEmpresa)
router.post("/GetEmpresas", repartidorController.getEmpresas)

// *********************************

module.exports = router
router.post("/repartidor/getActualOrder", repartidorController.getActualOrder);
router.post("/repartidor/createComision", repartidorController.createComision);
router.post("/repartidor/deliverOrder", repartidorController.deliverOrder);
router.post("/repartidor/cancelOrder", repartidorController.cancelOrder);
router.post("/repartidor/carrito", repartidorController.carrito);
router.post("/repartidor/check", repartidorController.check)
router.post("/repartidor/getComisiones", usuarioController.getComisiones);

//Usuario
router.post("/usuario/calificarOrden", usuarioController.calificarOrden);
router.post("/usuario/getCarrito", usuarioController.getCarrito);
router.post("/usuario/agregarPedido", usuarioController.agregarPedido);
router.post("/usuario/modifyPedido", usuarioController.modifyPedido);
router.post("/usuario/getPedidos", usuarioController.getPedidos);
router.post("/usuario/eliminarPedido", usuarioController.eliminarPedido);
router.post("/usuario/eliminarLista", usuarioController.eliminarLista);
router.post("/usuario/getProducto", usuarioController.getProducto);
router.post("/usuario/obtenerDirecciones", usuarioController.obtenerDirecciones);
router.post("/usuario/realizarPedido", usuarioController.realizarPedido);
router.post("/usuario/obtenerEstado", usuarioController.obtenerEstado);
router.post("/usuario/getCalificacion", usuarioController.getCalificacion);
router.post("/usuario/check", usuarioController.check);

//Ofertas y combos
router.post("/usuario/getEmpresasOfertas", usuarioController.getEmpresasOfertas);
router.post("/usuario/getProductosOfertas", usuarioController.getProductosOfertas);
router.post("/usuario/getContenidoOfertas", usuarioController.getContenidoOfertas);


//Empresa
router.post("/empresa/deployPedidos", empresaController.deployPedidos);
router.post("/empresa/getDepartamentoName", empresaController.getDepartamentoName);
router.post("/empresa/getCiudadName", empresaController.getCiudadName);
router.post("/empresa/negarPedido", empresaController.negarPedido);
router.post("/empresa/aceptarPedido", empresaController.aceptarPedido);
router.post("/empresa/detallarPedido", empresaController.detallarPedido);
router.post("/empresa/check", empresaController.check);
router.post("/empresa/getCategoria", empresaController.getCategoria);
router.post("/empresa/insertProducto", empresaController.insertProducto);
router.post("/empresa/modifyProducto", empresaController.modifyProducto);
router.post("/empresa/deleteProducto", empresaController.deleteProducto);
router.post("/empresa/getOferta", empresaController.getOferta);


router.post("/catalogo/agregarProducto", catalogo.addProduct);
router.get("/catalogo/categorias", catalogo.Categorias);
router.get("/catologo/empresas", catalogo.Empresas);
router.post("/catologo/verProductoCategoria", catalogo.viewProductosCategoria)

//Reportes Restaurantes
router.post("/reportes/restauranteDate", reportesRestaurante.viewReportsDate);
router.post("/reportes/restauranteProduct", reportesRestaurante.viewReportsProduct);
router.post("/reportes/restauranteVentas", reportesRestaurante.viewVentas);

//Lista de productos
router.get("/obtenerProductos", reportesRestaurante.viewProducts);