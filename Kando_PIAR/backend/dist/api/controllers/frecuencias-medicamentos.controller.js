"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrecuenciasMedicamentosController = void 0;
const database_1 = __importDefault(require("../../config/database"));
class FrecuenciasMedicamentosController {
    /**
     * Obtiene todas las frecuencias de medicamentos activas
     */
    async getFrecuenciasMedicamentos(req, res) {
        try {
            const query = `
                SELECT 
                    id_frecuencia_medicamento,
                    nombre,
                    descripcion,
                    estado,
                    created_at,
                    updated_at
                FROM frecuencias_medicamentos 
                WHERE estado = true 
                ORDER BY id_frecuencia_medicamento ASC
            `;
            const result = await database_1.default.query(query);
            if (result.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'No se encontraron frecuencias de medicamentos disponibles',
                    data: []
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Frecuencias de medicamentos obtenidas exitosamente',
                data: result.rows,
                total: result.rows.length
            });
        }
        catch (error) {
            console.error('Error al obtener frecuencias de medicamentos:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al obtener las frecuencias de medicamentos',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }
    /**
     * Obtiene una frecuencia de medicamentos específica por ID
     */
    async getFrecuenciaMedicamentosById(req, res) {
        try {
            const { id } = req.params;
            // Validar que el ID sea un número
            if (isNaN(Number(id))) {
                res.status(400).json({
                    success: false,
                    message: 'El ID de la frecuencia debe ser un número válido'
                });
                return;
            }
            const query = `
                SELECT 
                    id_frecuencia_medicamento,
                    nombre,
                    descripcion,
                    estado,
                    created_at,
                    updated_at
                FROM frecuencias_medicamentos 
                WHERE id_frecuencia_medicamento = $1 AND estado = true
            `;
            const result = await database_1.default.query(query, [id]);
            if (result.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    message: `No se encontró la frecuencia de medicamentos con ID ${id}`
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Frecuencia de medicamentos obtenida exitosamente',
                data: result.rows[0]
            });
        }
        catch (error) {
            console.error('Error al obtener frecuencia de medicamentos por ID:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al obtener la frecuencia de medicamentos',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }
}
exports.FrecuenciasMedicamentosController = FrecuenciasMedicamentosController;
