-- =============================================
-- ARCHIVO TEMPORAL: TABLA INGRESOS PROMEDIOS MENSUALES COMPLETA
-- =============================================
-- Este archivo puede ser ejecutado manualmente en la base de datos
-- para crear la tabla y poblarla con datos
-- =============================================

-- Verificar y eliminar tabla si existe (para recrear)
DROP TABLE IF EXISTS ingresos_promedios_mensuales CASCADE;

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
-- CREAR TABLA INGRESOS PROMEDIOS MENSUALES
-- =============================================
CREATE TABLE ingresos_promedios_mensuales (
    id_ingreso INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    estado BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- CREAR ÍNDICE PARA OPTIMIZACIÓN
-- =============================================
CREATE INDEX idx_ingresos_promedios_mensuales_nombre ON ingresos_promedios_mensuales(nombre);

-- =============================================
-- CREAR TRIGGER PARA ACTUALIZACIÓN AUTOMÁTICA
-- =============================================
CREATE TRIGGER update_ingresos_promedios_mensuales_updated_at 
    BEFORE UPDATE ON ingresos_promedios_mensuales
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INSERTAR DATOS DE INGRESOS PROMEDIOS MENSUALES
-- =============================================
INSERT INTO ingresos_promedios_mensuales (id_ingreso, nombre, descripcion, estado) VALUES 
(1, 'Sin ingresos', 'No cuenta con ingresos mensuales', true),
(2, 'Menos de 1 salario mínimo', 'Ingresos inferiores a 1 SMMLV', true),
(3, 'De 1 a menos de 2 SMMLV', 'Ingresos entre 1 y 2 salarios mínimos', true),
(4, 'De 2 a menos de 3 SMMLV', 'Ingresos entre 2 y 3 salarios mínimos', true),
(5, 'De 3 a menos de 5 SMMLV', 'Ingresos entre 3 y 5 salarios mínimos', true),
(6, 'Más de 5 SMMLV', 'Ingresos superiores a 5 salarios mínimos', true);

-- =============================================
-- VERIFICAR LA INSERCIÓN
-- =============================================
SELECT 
    id_ingreso,
    nombre,
    descripcion,
    estado,
    created_at,
    updated_at
FROM ingresos_promedios_mensuales 
ORDER BY id_ingreso;

-- =============================================
-- INFORMACIÓN ADICIONAL
-- =============================================
-- Contar registros insertados
SELECT COUNT(*) AS total_ingresos FROM ingresos_promedios_mensuales WHERE estado = true;

-- Mostrar solo los nombres para verificación rápida
SELECT id_ingreso, nombre FROM ingresos_promedios_mensuales ORDER BY id_ingreso;