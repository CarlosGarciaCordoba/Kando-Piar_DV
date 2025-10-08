"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpsController = void 0;
const database_1 = __importDefault(require("../../config/database"));
class EpsController {
    /**
     * Obtiene todas las EPS disponibles
     */
    static async getEps(req, res) {
        try {
            const query = `
                SELECT id_eps, nombre, descripcion
                FROM eps 
                WHERE estado = true
                ORDER BY nombre ASC
            `;
            const result = await database_1.default.query(query);
            res.json({
                success: true,
                data: result.rows,
                message: 'EPS obtenidas exitosamente'
            });
        }
        catch (error) {
            console.error('Error al obtener EPS:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al obtener EPS',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }
    /**
     * Obtiene una EPS específica por ID
     */
    static async getEpsById(req, res) {
        try {
            const { id_eps } = req.params;
            const query = `
                SELECT id_eps, nombre, descripcion, estado
                FROM eps 
                WHERE id_eps = $1
            `;
            const result = await database_1.default.query(query, [id_eps]);
            if (result.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'EPS no encontrada'
                });
                return;
            }
            res.json({
                success: true,
                data: result.rows[0],
                message: 'EPS obtenida exitosamente'
            });
        }
        catch (error) {
            console.error('Error al obtener EPS por ID:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al obtener EPS',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }
}
exports.EpsController = EpsController;
