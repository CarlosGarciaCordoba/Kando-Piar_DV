-- =============================================
-- DATOS DE EJEMPLO PARA LA TABLA COLEGIOS
-- =============================================

-- Insertar datos de ejemplo para colegios
INSERT INTO colegios (codigo_institucion, nombre, estado) VALUES
('001', 'Institución Educativa San José', true),
('002', 'Institución Educativa La Presentación', true),
('003', 'Institución Educativa Técnico Industrial', true),
('004', 'Colegio Nacional de Bachillerato', true),
('005', 'Institución Educativa Rural El Campo', true),
('006', 'Colegio Departamental Mixto', true),
('007', 'Institución Educativa Francisco José de Caldas', true),
('008', 'Colegio Técnico Comercial', true),
('009', 'Institución Educativa Nuestra Señora del Carmen', true),
('010', 'Colegio Agropecuario Municipal', true);

-- Verificar la inserción
SELECT id, codigo_institucion, nombre, estado, created_at
FROM colegios
ORDER BY nombre;