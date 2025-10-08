"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMunicipalities = exports.getMunicipalitiesByDepartment = exports.getDepartments = void 0;
const database_1 = __importDefault(require("../../config/database"));
// Controlador para obtener todos los departamentos
const getDepartments = async (req, res) => {
    try {
        console.log('🔍 Intentando obtener departamentos...');
        // Primero verificar qué columnas existen en la tabla
        const columnsResult = await database_1.default.query(`SELECT column_name, data_type FROM information_schema.columns 
             WHERE table_name = 'departamentos' AND table_schema = 'public' 
             ORDER BY ordinal_position`);
        console.log('📋 Columnas en tabla departamentos:', columnsResult.rows);
        // Intentar diferentes estructuras de tabla comunes
        let result;
        let query = '';
        const columns = columnsResult.rows.map(row => row.column_name);
        if (columns.includes('id_departamento') && columns.includes('descripcion')) {
            // Estructura con id_departamento y descripcion
            query = columns.includes('estado') ?
                'SELECT id_departamento as codigo_dane, descripcion as nombre FROM departamentos WHERE estado = true ORDER BY descripcion ASC' :
                'SELECT id_departamento as codigo_dane, descripcion as nombre FROM departamentos ORDER BY descripcion ASC';
        }
        else if (columns.includes('codigo_dane') && columns.includes('nombre')) {
            // Estructura con codigo_dane y nombre
            query = columns.includes('estado') ?
                'SELECT codigo_dane, nombre FROM departamentos WHERE estado = true ORDER BY nombre ASC' :
                'SELECT codigo_dane, nombre FROM departamentos ORDER BY nombre ASC';
        }
        else if (columns.includes('id') && columns.includes('nombre')) {
            // Estructura básica con id y nombre
            query = columns.includes('activo') ?
                'SELECT id as codigo_dane, nombre FROM departamentos WHERE activo = true ORDER BY nombre ASC' :
                'SELECT id as codigo_dane, nombre FROM departamentos ORDER BY nombre ASC';
        }
        else {
            // Usar las primeras dos columnas disponibles
            const firstCol = columns[0] || 'id';
            const secondCol = columns.find(col => col.toLowerCase().includes('nombre') || col.toLowerCase().includes('descripcion')) || columns[1] || 'nombre';
            query = `SELECT ${firstCol} as codigo_dane, ${secondCol} as nombre FROM departamentos ORDER BY ${secondCol} ASC LIMIT 50`;
        }
        console.log('🔍 Query a ejecutar:', query);
        result = await database_1.default.query(query);
        console.log('✅ Departamentos obtenidos:', result.rows.length);
        res.status(200).json({
            success: true,
            data: result.rows,
            debug: {
                columns: columns,
                query: query,
                count: result.rows.length
            }
        });
    }
    catch (error) {
        console.error('❌ Error al obtener departamentos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al obtener departamentos',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.getDepartments = getDepartments;
// Controlador para obtener municipios por departamento
const getMunicipalitiesByDepartment = async (req, res) => {
    try {
        const { departmentCode } = req.params;
        if (!departmentCode) {
            return res.status(400).json({
                success: false,
                message: 'El código del departamento es requerido'
            });
        }
        console.log('🔍 Buscando municipios para departamento:', departmentCode);
        // Verificar columnas en tabla municipios
        const columnsResult = await database_1.default.query(`SELECT column_name FROM information_schema.columns 
             WHERE table_name = 'municipios' AND table_schema = 'public'`);
        const columns = columnsResult.rows.map(row => row.column_name);
        console.log('📋 Columnas en tabla municipios:', columns);
        let query = '';
        if (columns.includes('id_municipio') && columns.includes('descripcion') && columns.includes('id_departamento')) {
            query = columns.includes('estado') ?
                'SELECT id_municipio as codigo_dane, descripcion as nombre FROM municipios WHERE id_departamento = $1 AND estado = true ORDER BY descripcion ASC' :
                'SELECT id_municipio as codigo_dane, descripcion as nombre FROM municipios WHERE id_departamento = $1 ORDER BY descripcion ASC';
        }
        else if (columns.includes('codigo_dane') && columns.includes('nombre') && columns.includes('codigo_departamento')) {
            query = columns.includes('estado') ?
                'SELECT codigo_dane, nombre FROM municipios WHERE codigo_departamento = $1 AND estado = true ORDER BY nombre ASC' :
                'SELECT codigo_dane, nombre FROM municipios WHERE codigo_departamento = $1 ORDER BY nombre ASC';
        }
        else {
            // Estructura genérica
            const idCol = columns.find(col => col.includes('id')) || columns[0];
            const nameCol = columns.find(col => col.toLowerCase().includes('nombre') || col.toLowerCase().includes('descripcion')) || columns[1];
            const deptCol = columns.find(col => col.toLowerCase().includes('departamento')) || columns[2];
            query = `SELECT ${idCol} as codigo_dane, ${nameCol} as nombre FROM municipios WHERE ${deptCol} = $1 ORDER BY ${nameCol} ASC LIMIT 100`;
        }
        console.log('🔍 Query municipios:', query);
        const result = await database_1.default.query(query, [departmentCode]);
        console.log('✅ Municipios obtenidos:', result.rows.length);
        res.status(200).json({
            success: true,
            data: result.rows,
            debug: {
                departmentCode: departmentCode,
                columns: columns,
                query: query,
                count: result.rows.length
            }
        });
    }
    catch (error) {
        console.error('❌ Error al obtener municipios:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al obtener municipios',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.getMunicipalitiesByDepartment = getMunicipalitiesByDepartment;
// Controlador para obtener todos los municipios (opcional, para casos especiales)
const getAllMunicipalities = async (req, res) => {
    try {
        const result = await database_1.default.query(`SELECT m.id as codigo_dane, m.nombre, d.nombre as departamento_nombre 
             FROM municipios m 
             LEFT JOIN departamentos d ON m.id_departamento = d.id 
             ORDER BY d.nombre, m.nombre ASC LIMIT 1000`);
        res.status(200).json({
            success: true,
            data: result.rows
        });
    }
    catch (error) {
        console.error('❌ Error al obtener todos los municipios:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al obtener todos los municipios',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.getAllMunicipalities = getAllMunicipalities;
