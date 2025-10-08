-- =============================================
-- ARCHIVO TEMPORAL: TABLA NIVELES EDUCATIVOS COMPLETA
-- =============================================
-- Este archivo puede ser ejecutado manualmente en la base de datos
-- para crear la tabla y poblarla con datos
-- =============================================

-- Verificar y eliminar tabla si existe (para recrear)
DROP TABLE IF EXISTS niveles_educativos CASCADE;

-- =============================================
-- CREAR FUNCIÓN PARA ACTUALIZAR TIMESTAMP (si no existe)
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- =============================================
-- CREAR TABLA NIVELES EDUCATIVOS
-- =============================================
CREATE TABLE niveles_educativos (
    id_nivel_educativo INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    estado BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- CREAR ÍNDICE PARA OPTIMIZACIÓN
-- =============================================
CREATE INDEX idx_niveles_educativos_nombre ON niveles_educativos(nombre);

-- =============================================
-- CREAR TRIGGER PARA ACTUALIZACIÓN AUTOMÁTICA
-- =============================================
CREATE TRIGGER update_niveles_educativos_updated_at 
    BEFORE UPDATE ON niveles_educativos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INSERTAR DATOS DE NIVELES EDUCATIVOS
-- =============================================
INSERT INTO niveles_educativos (id_nivel_educativo, nombre, descripcion, estado) VALUES 
(1, 'Preescolar', 'Educación preescolar', true),
(2, 'Básica Primaria', 'Educación básica primaria (1° a 5°)', true),
(3, 'Básica Secundaria', 'Educación básica secundaria (6° a 9°)', true),
(4, 'Media Académica', 'Educación media académica (10° a 11°)', true),
(5, 'Técnico Laboral', 'Educación técnica laboral', true),
(6, 'Tecnólogo', 'Educación tecnológica', true),
(7, 'Educación Superior - Pregrado / Profesional', 'Educación universitaria de pregrado', true),
(8, 'Especialización', 'Educación de posgrado - especialización', true),
(9, 'Maestría', 'Educación de posgrado - maestría', true),
(10, 'Doctorado', 'Educación de posgrado - doctorado', true),
(11, 'Posdoctorado', 'Educación de posgrado - posdoctorado', true),
(12, 'Ninguno', 'Sin educación formal', true);

-- =============================================
-- VERIFICAR LA INSERCIÓN
-- =============================================
SELECT 
    id_nivel_educativo,
    nombre,
    descripcion,
    estado,
    created_at,
    updated_at
FROM niveles_educativos 
ORDER BY id_nivel_educativo;

-- =============================================
-- INFORMACIÓN ADICIONAL
-- =============================================
-- Contar registros insertados
SELECT COUNT(*) AS total_niveles_educativos FROM niveles_educativos WHERE estado = true;

-- Mostrar solo los nombres para verificación rápida
SELECT id_nivel_educativo, nombre FROM niveles_educativos ORDER BY id_nivel_educativo;