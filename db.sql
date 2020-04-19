-- CREACION BASE DE DATOS
CREATE DATABASE anubis;
USE anubis;

-- CREACION TABLAS
CREATE TABLE persona(
    ID_PERSONA INT(8) UNSIGNED PRIMARY KEY,
    NOMBRE_PERSONA VARCHAR(50) NOT NULL,
    APELLIDO1 VARCHAR(50) NOT NULL,
    FECHA_NACIMIENTO DATE NOT NULL,
    DNI VARCHAR(9) NOT NULL,
    CORREO VARCHAR(200) NOT NULL,
    TELEFONO VARCHAR(9) NOT NULL,
    IMAGEN VARCHAR(300) NOT NULL,
    DIRECCIÓN VARCHAR(130) NOT NULL,
    LOCALIDAD VARCHAR(130) NOT NULL,
    PROVINCIA VARCHAR(100) NOT NULL
);

CREATE TABLE animal(
    ID_ANIMAL INT(8) UNSIGNED PRIMARY KEY,
    NOMBRE_ANIMAL VARCHAR(50) NOT NULL,
    FECHA_NACIMIENTO DATE NOT NULL,
    SEXO ENUM("M","F") DEFAULT "M" NOT NULL,
    PESO DECIMAL(4,2) UNSIGNED NOT NULL,
    LOCALIDAD VARCHAR(130) NOT NULL,
    PROVINCIA VARCHAR(100) NOT NULL,
    IMAGEN VARCHAR(300) NOT NULL,
    ID_DUEÑO INT(8) UNSIGNED,
    CONSTRAINT FK_ANIMAL_DUEÑO FOREIGN KEY (ID_DUEÑO) REFERENCES persona(ID_PERSONA)
);

CREATE TABLE perro(
    ID_PERRO INT(6) UNSIGNED PRIMARY KEY,
    ID_ANIMAL INT(8) UNSIGNED NOT NULL,
    RAZA VARCHAR(100) NOT NULL,
    TIENE_CHIP BOOLEAN NOT NULL,
    PELO ENUM("CORTO","LARGO","SIN PELO") DEFAULT "CORTO" NOT NULL,
    COLOR ENUM("BLANCO","NEGRO","MARRÓN OSCURO","MARRÓN CLARO","GRIS","OTRO") DEFAULT "OTRO" NOT NULL,
    TAMAÑO ENUM("GRANDE","MEDIANO","PEQUEÑO") DEFAULT "MEDIANO" NOT NULL,
    ADIESTRADO BOOLEAN NOT NULL,
    CONSTRAINT FK_PERRO_ANIMAL FOREIGN KEY (ID_ANIMAL) REFERENCES animal(ID_ANIMAL)
);

CREATE TABLE gato(
    ID_GATO INT(6) UNSIGNED PRIMARY KEY,
    ID_ANIMAL INT(8) UNSIGNED NOT NULL,
    COLOR ENUM("BLANCO","NEGRO","MARRÓN OSCURO","MARRÓN CLARO","GRIS","OTRO") DEFAULT "OTRO" NOT NULL,
    PELO ENUM("CORTO","LARGO","SIN PELO") DEFAULT "CORTO" NOT NULL,
    COMUN_EUROPEO BOOLEAN NOT NULL,
    CARACTER ENUM("TRANQUILO","NERVIOSO","SOLITARIO","CARIÑOSO","ACTIVO","VAGO") DEFAULT "TRANQUILO" NOT NULL,
    CONSTRAINT FK_GATO_ANIMAL FOREIGN KEY (ID_ANIMAL) REFERENCES animal(ID_ANIMAL)
);

CREATE TABLE cuidado(
    ID_CUIDADO INT(9) UNSIGNED PRIMARY KEY,
    ID_CUIDADOR INT(8) UNSIGNED NOT NULL,
    ID_ANIMAL INT(8) UNSIGNED NOT NULL,
    TIPO_CUIDADO ENUM("NODRIZA","PASEADOR","ACOGIDA TEMPORAL","RESCATISTA") DEFAULT "ACOGIDA TEMPORAL" NOT NULL,
    FECHA_INICIO DATE NOT NULL,
    FECHA_FIN DATE,
    CONSTRAINT FK_CUIDADOR_CIUDADO FOREIGN KEY (ID_CUIDADOR) REFERENCES persona(ID_PERSONA),
    CONSTRAINT FK_ANIMAL_CUIDADO FOREIGN KEY (ID_ANIMAL) REFERENCES animal(ID_ANIMAL)
);

CREATE TABLE metodo_pago(
    ID_METODO_PAGO INT(8) UNSIGNED PRIMARY KEY,
    TIPO ENUM("TARJETA","PAYPAL","TRANSFERENCIA") DEFAULT "TARJETA" NOT NULL,
    INFORMACION VARCHAR(100) NOT NULL,
    ID_PERSONA INT(8) UNSIGNED NOT NULL,
    CONSTRAINT FK_PERSONA_PAGO FOREIGN KEY (ID_PERSONA) REFERENCES persona(ID_PERSONA)
);

CREATE TABLE donacion(
    ID_DONACION SMALLINT(4) UNSIGNED PRIMARY KEY,
    CANTIDAD DECIMAL(6,2) UNSIGNED NOT NULL,
    ID_DONANTE INT(8) UNSIGNED NOT NULL,
    ID_METODO_PAGO INT(8) UNSIGNED,
    CONSTRAINT FK_DONANTE_DONACION FOREIGN KEY (ID_DONANTE) REFERENCES persona(ID_PERSONA),
    CONSTRAINT FK_METODOPAGO_DONACION FOREIGN KEY (ID_METODO_PAGO) REFERENCES metodo_pago(ID_METODO_PAGO)
);

CREATE TABLE producto(
    ID_PRODUCTO SMALLINT(5) UNSIGNED PRIMARY KEY,
    NOMBRE_PRODUCTO VARCHAR(150) NOT NULL,
    CATEGORIA ENUM("PIENSO","COMIDA HÚMEDA","SNACKS Y HUESOS","HIGIENE","JUGUETES","CAMAS Y MANTAS","ROPA","OTROS") DEFAULT "OTROS" NOT NULL,
    PRECIO DECIMAL(5,2) UNSIGNED NOT NULL,
    STOCK SMALLINT(3) UNSIGNED NOT NULL,
    DESCRIPCION TEXT NOT NULL,
    IMAGEN VARCHAR(300) NOT NULL,
    TIPO ENUM("PERRO","GATO","AMBOS") DEFAULT "AMBOS" NOT NULL
);

CREATE TABLE pedido(
    ID_PEDIDO INT(8) UNSIGNED PRIMARY KEY,
    ID_REALIZADOR INT(8) UNSIGNED NOT NULL,
    FECHA_REALIZACION DATE NOT NULL,
    CONSTRAINT FK_PEDIDO_PERSONA FOREIGN KEY (ID_REALIZADOR) REFERENCES persona(ID_PERSONA)
);

CREATE TABLE productoxpedido(
    ID_REL_PP INT(8) UNSIGNED PRIMARY KEY,
    ID_PRODUCTO SMALLINT(5) UNSIGNED NOT NULL,
    ID_PEDIDO INT(8) UNSIGNED NOT NULL,
    CANTIDAD SMALLINT(3) UNSIGNED NOT NULL,
    CONSTRAINT FK_PRODUCTO_RELPEDIDO FOREIGN KEY (ID_PRODUCTO) REFERENCES producto(ID_PRODUCTO),
    CONSTRAINT FK_PEDIDO_RELPRODUCTO FOREIGN KEY (ID_PEDIDO) REFERENCES pedido(ID_PEDIDO)
);

CREATE TABLE factura(
    ID_FACTURA VARCHAR(15) PRIMARY KEY,
    ID_PEDIDO INT(8) UNSIGNED NOT NULL,
    PRECIO_TOTAL DECIMAL(6,2) NOT NULL,
    ID_METODO_PAGO INT(8) UNSIGNED,
    CONSTRAINT FK_PEDIDO_FACTURA FOREIGN KEY (ID_PEDIDO) REFERENCES pedido(ID_PEDIDO),
    CONSTRAINT FK_METODOPAGO_FACTURA FOREIGN KEY (ID_METODO_PAGO) REFERENCES metodo_pago(ID_METODO_PAGO)
);

-- INSERCIÓN DE DATOS

INSERT INTO persona (
    ID_PERSONA,
    NOMBRE_PERSONA,
    APELLIDO1,
    FECHA_NACIMIENTO,
    DNI,
    CORREO,
    TELEFONO,
    IMAGEN,
    DIRECCIÓN,
    LOCALIDAD,
    PROVINCIA
) VALUES
(1,"Manuel","López","1996-10-28","12345678A","mlopez@gmail.com","695406153","https://i.imgur.com/cSxQYSO.jpg","Calle Lepanto n8 Bajo A","Arcos de la Frontera","Cádiz"),
(2,"Iñigo","De la Fuente","1990-07-15","71349023G","idelafuente@gmail.com","666777111","https://i.imgur.com/dsVUw7E.png","Avenida Nendo 1","Jerez de la Frontera","Cádiz"),
(3,"Juan","Serrano","1986-03-20","75616972A","jserrano@gmail.com","612345789","https://i.imgur.com/r83aMOv.png","Calle Cervantes n4 4D","Vejer de la Frontera","Cádiz"),
(4,"Raquel","Robles","1994-11-13","54123098D","rrobles@gmail.com","666333444","https://i.imgur.com/F17xEUN.png","Urbanización Vía Láctea 5","Conil de la Frontera","Cádiz");

INSERT INTO animal (
    ID_ANIMAL,
    NOMBRE_ANIMAL,
    FECHA_NACIMIENTO,
    SEXO,
    PESO,
    LOCALIDAD,
    PROVINCIA,
    IMAGEN,
    ID_DUEÑO
) VALUES
(1,"Bobby","2019-03-05","M",11,"Arcos de la Frontera","Cádiz","https://i.imgur.com/IxyWMd1.jpg",1),
(2,"Balbo","2014-06-11","M",23,"Sevilla","Sevilla","https://i.imgur.com/0SqxDJk.jpg",NULL),
(3,"Mimi","2016-11-06","F",8,"Motril","Granada","https://i.imgur.com/C0yHL41.jpg",NULL),
(4,"Maya","2009-10-28","F",32,"Campanillas","Málaga","https://i.imgur.com/xrstuFu.jpg",NULL),
(5,"Dante","2018-02-21","M",16,"Jerez de la Frontera","Cádiz","https://i.imgur.com/H7QsZXR.jpg",NULL),
(6,"Bimbo","2015-03-01","M",4,"Jerez de la Frontera","Cádiz","https://i.imgur.com/JMi0VEP.jpg",NULL),
(7,"Zazi","2014-01-12","F",3.5,"Guadix","Granada","https://i.imgur.com/RmDoGvA.jpg",NULL),
(8,"Momo","2017-02-14","M",4.1,"Cádiz","Cádiz","https://i.imgur.com/G6mq0hg.jpg",NULL),
(9,"Luna","2019-10-18","F",2,"Coín","Málaga","https://i.imgur.com/hmlrB1m.jpg",NULL);

INSERT INTO perro (
    ID_PERRO,
    ID_ANIMAL,
    RAZA,
    TIENE_CHIP,
    PELO,
    COLOR,
    TAMAÑO,
    ADIESTRADO
) VALUES
(1,1,"Border Terrier",True,"CORTO","MARRÓN CLARO","MEDIANO",False),
(2,2,"San Humberto",True,"CORTO","MARRÓN OSCURO","GRANDE",True),
(3,3,"Cavalier King Charles Spaniel",True,"LARGO","BLANCO","PEQUEÑO",False),
(4,4,"Alaskan Malamute",True,"LARGO","BLANCO","GRANDE",True),
(5,5,"Weimaraner",True,"CORTO","GRIS","MEDIANO",False);

INSERT INTO gato (
    ID_GATO,
    ID_ANIMAL,
    COLOR,
    PELO,
    COMUN_EUROPEO,
    CARACTER
) VALUES
(1,6,"MARRÓN OSCURO","CORTO",True,"SOLITARIO"),
(2,7,"GRIS","CORTO",True,"ACTIVO"),
(3,8,"BLANCO","CORTO",True,"VAGO"),
(4,9,"OTRO","SIN PELO",False,"CARIÑOSO");

INSERT INTO cuidado (
    ID_CUIDADO,
    ID_CUIDADOR,
    ID_ANIMAL,
    TIPO_CUIDADO,
    FECHA_INICIO,
    FECHA_FIN
) VALUES
(1,1,5,"NODRIZA","2018-02-26","2018-08-29"),
(2,2,7,"ACOGIDA TEMPORAL","2019-01-15","2020-01-15"),
(3,3,4,"RESCATISTA","2009-12-04",NULL),
(4,3,9,"RESCATISTA","2019-11-01",NULL),
(5,4,3,"NODRIZA","2016-11-09","2017-02-14"),
(6,4,9,"NODRIZA","2019-10-18","2020-01-11");

INSERT INTO metodo_pago (
    ID_METODO_PAGO,
    TIPO,
    INFORMACION,
    ID_PERSONA
) VALUES
(1,"PAYPAL","w.mlc32@gmail.com",1),
(2,"TARJETA","idelafuente@gmail.com",2);

INSERT INTO donacion (
    ID_DONACION,
    CANTIDAD,
    ID_DONANTE,
    ID_METODO_PAGO
) VALUES
(1,345.13,1,1),
(2,266.77,2,2);

INSERT INTO producto (
    ID_PRODUCTO,
    NOMBRE_PRODUCTO,
    CATEGORIA,
    PRECIO,
    STOCK,
    DESCRIPCION,
    IMAGEN,
    TIPO
) VALUES 
(1,"Pienso Affinity Advance Medium 3kg","PIENSO",14.39,300,"Pienso para perros de raza media (10 a 30kg). Sabor pollo y arroz.","https://i.imgur.com/xNUXZtX.jpg","PERRO"),
(2,"Pienso Royal Canin Cachorros Mini 2kg","PIENSO",9.50,300,"Pienso para cachorros de raza pequeña (hasta 10kg). Sabor pollo.","https://i.imgur.com/T1yMbSu.jpg","PERRO"),
(3,"Paté Ultima Affinity Cachorros Mini 100g","COMIDA HÚMEDA",0.60,150,"Paté para cachorros de raza pequeña (hasta 10kg). Sabor pollo, arroz y leche.","https://i.imgur.com/sIp3kUK.jpg","PERRO"),
(4,"Pienso Ultima Affinity Junior 1,5kg","PIENSO",8.00,300,"Pienso para gatos jóvenes (hasta 3 años) sabor pollo. Apto para gatos esterilizados.","https://i.imgur.com/HDW564a.jpg","GATO"),
(5,"Paté Royal Canin Babycat 195g","COMIDA HÚMEDA",12.95,300,"Paté para gatos bebés y madres que hayan dado a luz recientamente. Cereales y pollo muy nutritivos.","https://i.imgur.com/01FQ8Y9.jpg","GATO"),
(6,"Snacks Bacon Compy","SNACKS Y HUESOS",2.75,300,"Snacks sabor bacon para perros. Apto a partir de seis meses.","https://i.imgur.com/7sSAd4u.jpg","PERRO"),
(7,"Snacks rellenos DeliTime","SNACKS Y HUESOS",2.75,300,"Snacks rellenos para gatos. Sabor pescado. Efecto anti-bolas de pelo.","https://i.imgur.com/HArJGos.jpg","GATO"),
(8,"Champú HOME Pelo corto 500ml.","HIGIENE",3.15,300,"Champú para perros de pelo corto. Suavidad maxima.","https://i.imgur.com/lvJSJsL.jpg","PERRO"),
(9,"Champú TRIXIE Pelo Largo 500ml","HIGIENE",3.85,300,"Champú para perros de pelo largo. Facilita el cepillado.","https://i.imgur.com/B3NJSPv.jpg","PERRO"),
(10,"Peine pelo largo","HIGIENE",2.50,50,"Peine de plástico y acero para el pelo largo de las mascotas. Apto para todo tipo de animales.","https://i.imgur.com/msUKaWt.jpg","AMBOS"),
(11,"Pelota de tenis KIPSTA","JUGUETES",1.00,100,"Pelota de tenis blanda perfecta para jugar con cualquier tipo de mascota.","https://i.imgur.com/1r0IF98.jpg","AMBOS"),
(12,"Cama pequeña de terciopelo.","CAMAS Y MANTAS",25.95,30,"Cama pequeña de terciopelo con cojin en forma de corazón. Apto para todo tipo de mascotas..","https://i.imgur.com/jsJt9jh.jpg","AMBOS"),
(13,"Abrigo algodón gatos","ROPA",12.75,70,"Abrigo de algodón para gatos. Tamaño único de adultos. Varios colores disponibles.","https://i.imgur.com/6OoSwoN.jpg","GATO");

INSERT INTO pedido (
    ID_PEDIDO,
    ID_REALIZADOR,
    FECHA_REALIZACION
) VALUES
(1,1,"2019-10-14"),
(2,2,"2019-03-29");

INSERT INTO productoxpedido (
    ID_REL_PP,
    ID_PRODUCTO,
    ID_PEDIDO,
    CANTIDAD   
) VALUES 
(1,1,1,2),
(2,11,1,1),
(3,7,2,5),
(4,13,2,1);

INSERT INTO factura (
    ID_FACTURA,
    ID_PEDIDO,
    PRECIO_TOTAL,
    ID_METODO_PAGO
) VALUES
("20191014-1",1,"30.75",1),
("20190329-1",2,"15.50",2);

