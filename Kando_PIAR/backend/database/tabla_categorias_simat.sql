-- =============================================
-- SCRIPT COMPLETO PARA CATEGORÍAS SIMAT
-- =============================================
-- Script temporal para crear tabla e insertar las categorías de discapacidad del SIMAT
-- Incluye creación de tabla, índices, triggers e inserción de datos
-- =============================================

-- Verificar si la tabla ya existe y eliminarla si es necesario
DROP TABLE IF EXISTS categorias_simat CASCADE;

-- =============================================
-- TABLA DE CATEGORÍAS SIMAT
-- =============================================
-- Contiene las categorías de discapacidad del Sistema Integrado de Matrícula (SIMAT)
-- =============================================
CREATE TABLE categorias_simat (
    id_categoria_simat INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    estado BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================================
CREATE INDEX idx_categorias_simat_nombre ON categorias_simat(nombre);

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
CREATE TRIGGER update_categorias_simat_updated_at BEFORE UPDATE ON categorias_simat
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INSERCIÓN DE DATOS
-- =============================================
INSERT INTO categorias_simat (id_categoria_simat, nombre, descripcion, estado) VALUES
(1, 'Discapacidad física', 'Limitaciones en el movimiento del cuerpo, extremidades o capacidad motriz', true),
(2, 'Discapacidad auditiva', 'Limitaciones en la capacidad de escuchar o procesar sonidos', true),
(3, 'Discapacidad visual', 'Limitaciones en la capacidad de ver o procesar información visual', true),
(4, 'Sordoceguera', 'Combinación de limitaciones auditivas y visuales simultáneamente', true),
(5, 'Discapacidad intelectual', 'Limitaciones significativas en el funcionamiento intelectual y adaptativo', true),
(6, 'Discapacidad psicosocial', 'Limitaciones derivadas de trastornos mentales o emocionales', true),
(7, 'Discapacidad múltiple', 'Combinación de dos o más tipos de discapacidad', true);

-- =============================================
-- VERIFICACIÓN DE LA INSERCIÓN
-- =============================================
-- Mostrar todas las categorías insertadas
SELECT 
    id_categoria_simat,
    nombre,
    descripcion,
    estado,
    created_at
FROM categorias_simat 
ORDER BY id_categoria_simat;

-- Contar registros insertados
SELECT COUNT(*) as total_categorias FROM categorias_simat WHERE estado = true;

-- =============================================
-- COMENTARIOS FINALES
-- =============================================
-- Script completado exitosamente
-- Total de categorías SIMAT: 7
-- Tabla lista para usar con APIs y frontend