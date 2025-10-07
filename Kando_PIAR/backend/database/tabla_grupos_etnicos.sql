-- =============================================
-- SCRIPT COMPLETO PARA GRUPOS ÉTNICOS
-- =============================================
-- Script temporal para crear tabla e insertar los grupos étnicos reconocidos en Colombia
-- Incluye creación de tabla, índices, triggers e inserción de datos
-- =============================================

-- Verificar si la tabla ya existe y eliminarla si es necesario
DROP TABLE IF EXISTS grupos_etnicos CASCADE;

-- =============================================
-- TABLA DE GRUPOS ÉTNICOS
-- =============================================
-- Contiene los grupos étnicos reconocidos en Colombia
-- =============================================
CREATE TABLE grupos_etnicos (
    id_grupo_etnico INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    estado BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================================
CREATE INDEX idx_grupos_etnicos_nombre ON grupos_etnicos(nombre);

-- =============================================
-- FUNCIÓN PARA TRIGGERS UPDATED_AT (si no existe)
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =============================================
-- TRIGGER PARA UPDATED_AT
-- =============================================
CREATE TRIGGER update_grupos_etnicos_updated_at BEFORE UPDATE ON grupos_etnicos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INSERCIÓN DE DATOS
-- =============================================
INSERT INTO grupos_etnicos (id_grupo_etnico, nombre, descripcion, estado) VALUES
(1, 'Indígena', 'Pueblos originarios con identidad cultural propia', true),
(2, 'Negro, Mulato, Afrocolombiano o Afrodescendiente', 'Población de ascendencia africana', true),
(3, 'Raizal del Archipiélago de San Andrés, Providencia y Santa Catalina', 'Población nativa del archipiélago de San Andrés', true),
(4, 'Palenquero de San Basilio', 'Descendientes del primer pueblo libre de América', true),
(5, 'Rrom o Gitano', 'Pueblo de tradición nómada con cultura propia', true),
(6, 'Ninguno de los anteriores', 'No pertenece a ningún grupo étnico específico', true),
(7, 'Otro', 'Otro grupo étnico no especificado en las opciones anteriores', true);

-- =============================================
-- VERIFICACIÓN DE LA INSERCIÓN
-- =============================================
-- Mostrar todos los grupos étnicos insertados
SELECT 
    id_grupo_etnico,
    nombre,
    descripcion,
    estado,
    created_at
FROM grupos_etnicos 
ORDER BY id_grupo_etnico;

-- Contar registros insertados
SELECT COUNT(*) as total_grupos_etnicos FROM grupos_etnicos WHERE estado = true;

-- =============================================
-- COMENTARIOS FINALES
-- =============================================
-- Script completado exitosamente
-- Total de grupos étnicos: 7
-- Tabla lista para usar con APIs y frontend