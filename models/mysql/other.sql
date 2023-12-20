-- Para crear estas tablas en MySQL, puedes utilizar la siguiente sintaxis de SQL.
-- Asegúrate de ajustar las claves primarias, los tipos de datos y las restricciones según tus necesidades específicas:

-- 1. Tabla Administrador

CREATE TABLE Administrador (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    email VARCHAR(255),
    contrasena VARCHAR(255)
);

-- 2. Tabla Item

CREATE TABLE Item (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    SKU VARCHAR(255),
    categoria VARCHAR(255),
    nombre VARCHAR(255),
    licencia VARCHAR(255),
    descripcion TEXT,
    precio DECIMAL(10, 2),
    stock INT,
    descuento DECIMAL(10, 2),
    cuotas_max INT,
    id_admin_agrego INT,
    FOREIGN KEY (id_admin_agrego) REFERENCES Administrador(id_admin)
);

-- 3. Tabla Carrito

CREATE TABLE Carrito (
    id_carrito INT AUTO_INCREMENT PRIMARY KEY,
    id_item INT,
    cantidad INT,
    FOREIGN KEY (id_item) REFERENCES Item(id_item)
);

-- Estos comandos de SQL crean las tablas 'Administrador', 'Item' y 'Carrito'
-- con las columnas y restricciones especificadas en tu descripción.
-- Asegúrate de ajustar los tipos de datos y las restricciones según tus necesidades específicas y las reglas de tu sistema.
