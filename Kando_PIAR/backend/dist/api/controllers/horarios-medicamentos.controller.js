"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorariosMedicamentosController = void 0;
const database_1 = __importDefault(require("../../config/database"));
class HorariosMedicamentosController {
    /**
     * Obtiene todos los horarios de medicamentos activos
     */
    async getHorariosMedicamentos(req, res) {
        try {
            const query = `
                SELECT 
                    id_horario_medicamento,
                    nombre,
                    descripcion,
                    estado,
                    created_at,
                    updated_at
                FROM horarios_medicamentos 
                WHERE estado = true 
                ORDER BY id_horario_medicamento ASC
            `;
            const result = await database_1.default.query(query);
            if (result.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'No se encontraron horarios de medicamentos disponibles',
                    data: []
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Horarios de medicamentos obtenidos exitosamente',
                data: result.rows,
                total: result.rows.length
            });
        }
        catch (error) {
            console.error('Error al obtener horarios de medicamentos:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al obtener los horarios de medicamentos',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }
    /**
     * Obtiene un horario de medicamentos específico por ID
     */
    async getHorarioMedicamentosById(req, res) {
        try {
            const { id } = req.params;
            // Validar que el ID sea un número
            if (isNaN(Number(id))) {
                res.status(400).json({
                    success: false,
                    message: 'El ID del horario debe ser un número válido'
                });
                return;
            }
            const query = `
                SELECT 
                    id_horario_medicamento,
                    nombre,
                    descripcion,
                    estado,
                    created_at,
                    updated_at
                FROM horarios_medicamentos 
                WHERE id_horario_medicamento = $1 AND estado = true
            `;
            const result = await database_1.default.query(query, [id]);
            if (result.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    message: `No se encontró el horario de medicamentos con ID ${id}`
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Horario de medicamentos obtenido exitosamente',
                data: result.rows[0]
            });
        }
        catch (error) {
            console.error('Error al obtener horario de medicamentos por ID:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al obtener el horario de medicamentos',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }
}
exports.HorariosMedicamentosController = HorariosMedicamentosController;
