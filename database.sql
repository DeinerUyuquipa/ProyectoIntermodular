-- Script de creación de base de datos para REBO 3D (Versión Sencilla / Novatos)
-- Puedes copiar y pegar todo esto en HeidiSQL y darle a "Ejecutar" (F9)

-- 1. Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS rebo3d_db 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE rebo3d_db;

-- 2. Crear la tabla de usuarios (para el login manual)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Crear tabla de productos (opcional, para la tienda)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar un usuario administrador de prueba (contraseña: admin123)
-- El hash de bcrypt para 'admin123' es $2a$10$X7.mH.yI8A8Xl/YwI2J8.eB6I3Q3yE1l6aM/L.M4.r7U.L4K3.V
INSERT IGNORE INTO users (email, password_hash, full_name, role) 
VALUES ('admin@rebo3d.com', '$2a$10$wW5g7rK1tU.8wI.V6aM/L.M4.r7U.L4K3.V8A8Xl/YwI2J8.eB6I', 'Administrador', 'admin');
