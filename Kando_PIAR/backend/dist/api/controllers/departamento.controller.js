"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartamentoController = void 0;
const database_1 = __importDefault(require("../../config/database"));
class DepartamentoController {
    /**
     * Obtiene todos los departamentos disponibles
     */
    static async getDepartamentos(req, res) {
        try {
            const query = `
                SELECT id_departamento, descripcion
                FROM departamentos 
                WHERE estado = true
                ORDER BY descripcion ASC
            `;
            const result = await database_1.default.query(query);
            res.json({
                success: true,
                data: result.rows,
                message: 'Departamentos obtenidos exitosamente'
            });
        }
        catch (error) {
            console.error('Error al obtener departamentos:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al obtener departamentos',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }
    /**
     * Obtiene los municipios de un departamento específico
     */
    static async getMunicipiosByDepartamento(req, res) {
        try {
            const { id_departamento } = req.params;
            const query = `
                SELECT id_municipio, descripcion
                FROM municipios 
                WHERE id_departamento = $1 AND estado = true
                ORDER BY descripcion ASC
            `;
            const result = await database_1.default.query(query, [id_departamento]);
            res.json({
                success: true,
                data: result.rows,
                message: 'Municipios obtenidos exitosamente'
            });
        }
        catch (error) {
            console.error('Error al obtener municipios:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al obtener municipios',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }
}
exports.DepartamentoController = DepartamentoController;
