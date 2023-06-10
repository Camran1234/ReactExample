-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `mydb`;
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`departamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`departamento` (
  `idDepartamento` INT NOT NULL AUTO_INCREMENT,
  `departamento` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idDepartamento`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`ciudad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ciudad` (
  `idCiudad` INT NOT NULL AUTO_INCREMENT,
  `ciudad` VARCHAR(100) NOT NULL,
  `departamento` INT NULL,
  PRIMARY KEY (`idCiudad`),
  INDEX `fk_repartidor_departamento_departamento_idx` (`departamento` ASC) VISIBLE,
  CONSTRAINT `fk_ciudad_departamento_departamento`
    FOREIGN KEY (`departamento`)
    REFERENCES `mydb`.`departamento` (`idDepartamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`repartidor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`repartidor` (
  `idrepartidor` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(75) NOT NULL,
  `apellido` VARCHAR(75) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `celular` VARCHAR(8) NOT NULL,
  `departamento` INT NOT NULL,
  `ciudad` INT NOT NULL,
  `nit` VARCHAR(13) NOT NULL,
  `cv` TEXT NOT NULL,
  `estado` INT NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`idrepartidor`), 
  INDEX `fk_repartidor_departamento_departamento_idx` (`departamento` ASC) VISIBLE,
  CONSTRAINT `fk_repartidor_departamento_departamento`
    FOREIGN KEY (`departamento`)
    REFERENCES `mydb`.`departamento` (`idDepartamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_repartidor_ciudad_ciudad_idx` (`ciudad` ASC) VISIBLE,
  CONSTRAINT `fk_repartidor_ciudad_ciudad`
    FOREIGN KEY (`ciudad`)
    REFERENCES `mydb`.`ciudad` (`idCiudad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`trasporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`transporte` (
  `idtrasporte` INT NOT NULL AUTO_INCREMENT,
  `propietario` INT NOT NULL, 
  `num_licencia` VARCHAR(15) NOT NULL,
  `tipo_licencia` VARCHAR(1) CHARACTER SET 'ascii' NOT NULL,
  `repartidor_idrepartidor` INT NOT NULL,
  PRIMARY KEY (`idtrasporte`),
  INDEX `fk_trasporte_repartidor1_idx` (`repartidor_idrepartidor` ASC) VISIBLE,
  CONSTRAINT `fk_trasporte_repartidor`
    FOREIGN KEY (`repartidor_idrepartidor`)
    REFERENCES `mydb`.`repartidor` (`idrepartidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`lista_solicitud_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`lista_solicitud_pedido` (
  `idlista_solicitud_pedido` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NULL,
  `departamento` INT NULL,
  `ciudad` INT NULL,
  `direccion` VARCHAR(450) NULL,
  `estado` VARCHAR(45) NULL,
  `calificacion` INT NULL,
  `fecha` DATE NOT NULL,
  `repartidor_idrepartidor` INT NULL,
  `descripcion_cancelado` VARCHAR(300) NULL,
  `empresa` INT NULL,
  `usuario` INT NOT NULL,
  PRIMARY KEY (`idlista_solicitud_pedido`),
  INDEX `fk_lista_solicitud_pedido_usuario_idusuario_idx` (`usuario` ASC) VISIBLE,
  CONSTRAINT `fk_lista_solicitud_pedido_usuario_idusuario`
    FOREIGN KEY (`usuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_lista_solicitud_pedido_repartidor1_idx` (`repartidor_idrepartidor` ASC) VISIBLE,
  CONSTRAINT `fk_lista_solicitud_pedido_repartidor1`
    FOREIGN KEY (`repartidor_idrepartidor`)
    REFERENCES `mydb`.`repartidor` (`idrepartidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_lista_solicitud_pedido_departamento_departamento_idx` (`departamento` ASC) VISIBLE,
  CONSTRAINT `fk_lista_solicitud_pedido_departamento_departamento`
    FOREIGN KEY (`departamento`)
    REFERENCES `mydb`.`departamento` (`idDepartamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_lista_solicitud_pedido_ciudad_ciudad_idx` (`ciudad` ASC) VISIBLE,
  CONSTRAINT `fk_lista_solicitud_pedido_ciudad_ciudad`
    FOREIGN KEY (`ciudad`)
    REFERENCES `mydb`.`ciudad` (`idCiudad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_lista_solicitud_pedido_empresa_empresa_idx` (`empresa` ASC) VISIBLE,
  CONSTRAINT `fk_lista_solicitud_pedido_empresa_empresa`
    FOREIGN KEY (`empresa`)
    REFERENCES `mydb`.`empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pedido` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `idlista_solicitud_pedido` INT NOT NULL,
  `idProducto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,   
  `descripcion` VARCHAR(250) NULL,
  PRIMARY KEY (`idPedido` ,`idlista_solicitud_pedido`),
  INDEX `fk_pedido_lista_solicitud_pedido_idx` (`idlista_solicitud_pedido` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_lista_solicitud_pedido`
    FOREIGN KEY (`idlista_solicitud_pedido`)
    REFERENCES `mydb`.`lista_solicitud_pedido` (`idlista_solicitud_pedido`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  INDEX `fk_pedido_producto_idx` (`idProducto` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_producto`
    FOREIGN KEY (`idProducto`)
    REFERENCES `mydb`.`producto` (`idProducto`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(250) NOT NULL,
  `tarjeta` VARCHAR(20) NOT NULL,
  `celular` VARCHAR(8) NOT NULL,
  `departamento` INT NOT NULL,
  `ciudad` INT NOT NULL,
  `direccion` VARCHAR(100) NOT NULL,
  `estado` INT NOT NULL,
  `password` VARCHAR(300), 
  PRIMARY KEY (`idusuario` ),
  INDEX `fk_usuario_departamento_departamento_idx` (`departamento` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_departamento_departamento`
    FOREIGN KEY (`departamento`)
    REFERENCES `mydb`.`departamento` (`idDepartamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_usuario_ciudad_ciudad_idx` (`ciudad` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_ciudad_ciudad`
    FOREIGN KEY (`ciudad`)
    REFERENCES `mydb`.`ciudad` (`idCiudad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`calificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`calificacion` (
  `idcalificacion` INT NOT NULL AUTO_INCREMENT,
  `cant_envios` INT NULL,
  `total_puntos` INT NULL,
  `repartidor_idrepartidor` INT NOT NULL,
  PRIMARY KEY (`idcalificacion`),
  INDEX `fk_calificacion_repartidor1_idx` (`repartidor_idrepartidor` ASC) VISIBLE,
  CONSTRAINT `fk_calificacion_repartidor1`
    FOREIGN KEY (`repartidor_idrepartidor`)
    REFERENCES `mydb`.`repartidor` (`idrepartidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`comisiones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`comisiones` (
  `idcomisiones` INT NOT NULL AUTO_INCREMENT,
  `comision` DECIMAL(10,2) NOT NULL,
  `repartidor_idrepartidor` INT NOT NULL,
  PRIMARY KEY (`idcomisiones`),
  INDEX `fk_comisiones_repartidor1_idx` (`repartidor_idrepartidor` ASC) VISIBLE,
  CONSTRAINT `fk_comisiones_repartidor1`
    FOREIGN KEY (`repartidor_idrepartidor`)
    REFERENCES `mydb`.`repartidor` (`idrepartidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`preferencia_tarjetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`preferencia_tarjetas` (
  `idtarjetas` INT NOT NULL AUTO_INCREMENT,
  `tarjeta` VARCHAR(15) NOT NULL,
  `usuario_idusuario` INT NOT NULL,
  PRIMARY KEY (`idtarjetas`),
  INDEX `fk_tarjetas_usuario1_idx` (`usuario_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_tarjetas_usuario1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`preferencia_direcciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`preferencia_direcciones` (
  `idpreferencia_direcciones` INT NOT NULL AUTO_INCREMENT,
  `direccion` VARCHAR(450) NULL,
  `usuario_idusuario` INT NOT NULL,
  PRIMARY KEY (`idpreferencia_direcciones`, `usuario_idusuario`),
  INDEX `fk_preferencia_direcciones_usuario1_idx` (`usuario_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_preferencia_direcciones_usuario1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`carrito` (
  `idcarrito` INT NOT NULL AUTO_INCREMENT,
  `idlista_solicitud_pedido` INT NULL,
  `idusuario` INT NOT NULL,
  PRIMARY KEY (`idcarrito`),
  INDEX `fk_carrito_lista_solicitud_pedido1_idx` (`idlista_solicitud_pedido` ASC) VISIBLE,
  CONSTRAINT `fk_carrito_lista_solicitud_pedido1`
    FOREIGN KEY (`idlista_solicitud_pedido`)
    REFERENCES `mydb`.`lista_solicitud_pedido` (`idlista_solicitud_pedido`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  INDEX `fk_carrito_usuario_idusuario_idx` (`idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_carrito_usuario_idusuario`
    FOREIGN KEY (`idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`farmacia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`direccionEmpresa` (
  `idDireccion` INT NOT NULL AUTO_INCREMENT,
  `idEmpresa` INT NOT NULL,
  `idDepartamento` INT NOT NULL,
  `idCiudad` INT NOT NULL,
  `direccion` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`idDireccion`, `idEmpresa`),
  INDEX `fk_direccionEmpresa_departamento_departamento_idx` (`idDepartamento` ASC) VISIBLE,
  CONSTRAINT `fk_direccionEmpresa_departamento_departamento`
    FOREIGN KEY (`idDepartamento`)
    REFERENCES `mydb`.`departamento` (`idDepartamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_direccionEmpresa_ciudad_ciudad_idx` (`idCiudad` ASC) VISIBLE,
  CONSTRAINT `fk_direccionEmpresa_ciudad_ciudad`
    FOREIGN KEY (`idCiudad`)
    REFERENCES `mydb`.`ciudad` (`idCiudad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_direccionEmpresa_empresa_empresa_idx` (`idEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_direccionEmpresa_empresa_empresa`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `mydb`.`empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`farmacia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(125) NOT NULL,
  `estado` INT NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  `correo` VARCHAR(100) NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  `url` TEXT NULL,
  PRIMARY KEY (`idEmpresa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`producto` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `nombreProducto` VARCHAR(45) NULL,
  `categoria_idcategoria` INT NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `empresa_idEmpresa` INT NOT NULL,
  `descripcion` VARCHAR(450) NOT NULL,
  `foto` TEXT NULL,
  `oferta` BOOLEAN NOT NULL,
  PRIMARY KEY (`idProducto`),
  INDEX `fk_producto_empresa_idx` (`empresa_idEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_producto_empresa`
    FOREIGN KEY (`empresa_idEmpresa`)
    REFERENCES `mydb`.`empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_producto_categoria_categoria_idx` (`categoria_idcategoria` ASC) VISIBLE,
  CONSTRAINT `fk_producto_categoria_categoria`
    FOREIGN KEY (`categoria_idcategoria`)
    REFERENCES `mydb`.`categoria` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`oferta` (
  `idOferta` INT NOT NULL AUTO_INCREMENT,
  `producto` INT NOT NULL,
  `productoRelacionado` INT NOT NULL,  
  PRIMARY KEY (`idOferta`),
  INDEX `fk_oferta_idProducto_producto_idx` (`producto` ASC) VISIBLE,
  CONSTRAINT `fk_oferta_idProducto_producto`
    FOREIGN KEY (`producto`)
    REFERENCES `mydb`.`producto` (`idProducto`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  INDEX `fk_oferta_productoOferta_producto_idx` (`productoRelacionado` ASC) VISIBLE,
  CONSTRAINT `fk_oferta_productoOferta_producto`
    FOREIGN KEY (`productoRelacionado`)
    REFERENCES `mydb`.`producto` (`idProducto`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -------INSERTS departamento y ciudades------
INSERT INTO departamento 
  (departamento) VALUES ('Guatemala');
  
INSERT INTO departamento 
  (departamento) VALUES ('Alta Verapaz');

INSERT INTO ciudad
  (ciudad, departamento) VALUES ('Villa Nueva', 1);

INSERT INTO ciudad
  (ciudad, departamento) VALUES ('Coban', 2);

-- -----INSERTS REPARTIDORES----------

INSERT INTO repartidor 
  (nombre, apellido, correo, celular, departamento, ciudad,
  nit, cv, estado, password)
  VALUES ('John', 'Cena', 'JohnCena@gmail.com', '77618578',
  1, 1, '1234567890123',
  'PDF aqui', '1', '21232f297a57a5a743894a0e4a801fc3');

INSERT INTO repartidor 
  (nombre, apellido, correo, celular, departamento, ciudad,
  nit, cv, estado, password)
  VALUES ('Carlos', 'Santana', 'CarlosSantana@gmail.com', '74879899',
  2, 2, '9876543210123',
  'PDF aqui', '1', '21232f297a57a5a743894a0e4a801fc3');

-- ------INSERTS transporte----------
INSERT INTO transporte
  (propietario, num_licencia, tipo_licencia, repartidor_idrepartidor)
  VALUES (1, "987564879254879", 'A', 1);

INSERT INTO transporte
  (propietario, num_licencia, tipo_licencia, repartidor_idrepartidor)
  VALUES (2, "215487963258796", 'B', 2);

-- -------INSERTS usuario------------
-- -LA PASSWORD ES admin PARA AMBOS USUARIOS
INSERT INTO usuario
  (nombre, apellido, correo, tarjeta, celular, departamento, ciudad, direccion, estado, password)
  VALUES ('Luis', 'Dante', 'LuisDante@gmail.com', '123456789', '58987465', 1, 1, "zona 4 diagonal 3 Villa nueva", 0,"21232f297a57a5a743894a0e4a801fc3");

INSERT INTO usuario
  (nombre, apellido, correo, tarjeta, celular, departamento, ciudad, direccion, estado, password)
  VALUES ('Maria', 'Aguilar', 'MariaAguilar@gmail.com','123456789' ,'57259855', 2 , 1, "Zona 7 los trigales", 0, "21232f297a57a5a743894a0e4a801fc3");

-- ---------INSERTS categoria-------------
INSERT INTO categoria
  (categoria) VALUES ('tacos');
INSERT INTO categoria
  (categoria) VALUES ('hamburguesas');
INSERT INTO categoria
  (categoria) VALUES ('cafes');
INSERT INTO categoria
  (categoria) VALUES ('medicina estomacal');
INSERT INTO categoria
  (categoria) VALUES ('antibiotico');
-- ------INSERTS restaurante---------
INSERT INTO empresa
  (nombre, estado, correo, password)
  VALUES ('Don Camaron', 1,  'DonCamaron@hotmial.com', '21232f297a57a5a743894a0e4a801fc3');

INSERT INTO empresa
  (nombre, estado, correo, password)
  VALUES ('Farmacia Cruz Verde', 1, 'FarmaciaCruzVerde@hotmail.com', '21232f297a57a5a743894a0e4a801fc3');

-- -----INSERTS DIRECCION EMPRESA------------  
INSERT INTO direccionEmpresa
  (idDepartamento, idCiudad, idEmpresa, direccion)
  VALUES(1, 1, 1, "Zona 1 Calle Don Camaron");

INSERT INTO direccionEmpresa
  (idDepartamento, idCiudad, idEmpresa, direccion)
  VALUES(1, 1, 1, "Zona 4 Calle Donde odian el camaron");

INSERT INTO direccionEmpresa
  (idDepartamento, idCiudad, idEmpresa, direccion)
  VALUES(2, 2, 2, "Zona 7 Calle Farmacia Cruz Verde");

-- -----INSERTS PRODUCTO------------
INSERT INTO producto 
  (nombreProducto, categoria_idcategoria, precio,
  empresa_idEmpresa, descripcion, oferta, foto)
  VALUES ('Hamburguesa de camaron', 2, 126.40, 1, "Hamburguesa con torta a base de camaron", false,
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.cocinadelirante.com%2Fsites%2Fdefault%2Ffiles%2Fimages%2F2018%2F04%2Fcomo-hacer-hamburguesas-de-camaron-facil.jpg&f=1&nofb=1&ipt=c71eb4d3eaedddabbc749deec428891b3503a75450f851da2a156d8e927e1ecc&ipo=images');

INSERT INTO producto 
  (nombreProducto, categoria_idcategoria, precio,
  empresa_idEmpresa, descripcion, oferta, foto)
  VALUES ('Tacos de camaron', 1, 249.65, 1, "Unos tacos de camaron exquisitos", false,
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Felespecial.com%2Fwp-content%2Fuploads%2F2016%2F10%2Fdreamstime_l_73436968.jpg&f=1&nofb=1&ipt=d6171557ef909461334f98107dec7d3b6748880b3a41d931cf04cebce47e67be&ipo=images');

INSERT INTO producto 
  (nombreProducto, categoria_idcategoria, precio,
  empresa_idEmpresa, descripcion, oferta, foto)
  VALUES ('Enterovid', 4, 25.64, 2, "Medicina para el estomago para todo uso", false,
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcruzverde.com.gt%2Fpedidos%2Fwp-content%2Fuploads%2Fsites%2F2%2F2021%2F05%2FP001824.jpg&f=1&nofb=1&ipt=f71a7467a4f0a3a535279179b2d3235d743b5b6d3346192a5a0e09d51bd3a109&ipo=images');

INSERT INTO producto 
  (nombreProducto, categoria_idcategoria, precio,
  empresa_idEmpresa, descripcion, oferta, foto)
  VALUES ('Penicilina', 5, 58, 2, "Antibiotico de 4 unidades", false,
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffortisrl.com.ar%2Fuploads%2Fproducts%2Flarge%2Fpenicilina.jpg&f=1&nofb=1&ipt=26376c5ade231efaf7575e1e68297d5b1aaf62029120cf466551f460d2f5fb89&ipo=images');

-- -----INSERTS lista_solicitud_pedido------------
INSERT INTO lista_solicitud_pedido
  (descripcion, departamento, ciudad, direccion, estado,
  calificacion, fecha, empresa, usuario)
  VALUES ("Llamar cuando este cerca", 1, 1, "Zona 1 Peten 4ta. Calle", "Esperando verificacion",
  0, '2023-4-19', 1, 1);

-- -----INSERTS pedido-----------
INSERT INTO pedido
  (idlista_solicitud_pedido, idProducto, cantidad, precio, descripcion)
  VALUES(1, 1, 4, 505.6, "Sin camarones");

INSERT INTO pedido
  (idlista_solicitud_pedido, idProducto, cantidad, precio, descripcion)
  VALUES(1, 2, 7, 1747.55, "Con camarones pero un poquito");



