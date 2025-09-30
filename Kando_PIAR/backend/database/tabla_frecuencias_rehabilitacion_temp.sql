-- =============================================
-- ARCHIVO TEMPORAL: FRECUENCIAS DE REHABILITACIÓN
-- =============================================
-- Este archivo contiene el CREATE TABLE y los INSERT para la tabla frecuencias_rehabilitacion
-- Debe ejecutarse manualmente en la base de datos
-- =============================================

-- Crear tabla de frecuencias de rehabilitación
CREATE TABLE frecuencias_rehabilitacion (
    id_frecuencia INTEGER PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    estado BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para optimización
CREATE INDEX idx_frecuencias_rehabilitacion_nombre ON frecuencias_rehabilitacion(nombre);

-- Crear trigger para actualización automática de updated_at
CREATE TRIGGER update_frecuencias_rehabilitacion_updated_at BEFORE UPDATE ON frecuencias_rehabilitacion
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar frecuencias de rehabilitación
INSERT INTO frecuencias_rehabilitacion (id_frecuencia, nombre, descripcion) VALUES 
(1, 'Diaria', 'Todos los días o varias veces al día'),
(2, 'Semanal', '1, 2 o 3 veces por semana'),
(3, 'Quincenal', 'Cada dos semanas'),
(4, 'Mensual', 'Una vez al mes'),
(5, 'Ocasional', 'Solo cuando hay citas, valoraciones o terapias específicas');

-- Verificar inserción
SELECT * FROM frecuencias_rehabilitacion ORDER BY id_frecuencia;