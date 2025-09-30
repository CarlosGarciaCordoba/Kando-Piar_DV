-- =============================================
-- TABLA DE GÉNEROS
-- Contiene los diferentes géneros disponibles en el sistema PIAR
-- =============================================

-- Crear tabla de géneros
CREATE TABLE generos (
    id_genero INTEGER PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL UNIQUE,
    estado BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar los géneros disponibles
INSERT INTO generos (id_genero, descripcion) VALUES 
(1, 'MASCULINO'),
(2, 'FEMENINO'),
(3, 'TRANS'),
(4, 'PREFIERO NO DECIRLO');

-- Crear índice para optimización
CREATE INDEX idx_generos_descripcion ON generos(descripcion);

-- Trigger para updated_at (si no existe ya)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger a la tabla generos
CREATE TRIGGER update_generos_updated_at 
    BEFORE UPDATE ON generos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Verificar que los datos se insertaron correctamente
SELECT * FROM generos ORDER BY id_genero;