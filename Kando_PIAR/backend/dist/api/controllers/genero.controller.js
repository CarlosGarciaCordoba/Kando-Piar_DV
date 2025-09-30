"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneroController = void 0;
const database_1 = __importDefault(require("../../config/database"));
class GeneroController {
    /**
     * Obtiene todos los géneros disponibles
     */
    static async getGeneros(req, res) {
        try {
            const query = `
                SELECT id_genero, descripcion
                FROM generos 
                WHERE estado = true
                ORDER BY id_genero ASC
            `;
            const result = await database_1.default.query(query);
            res.json({
                success: true,
                data: result.rows,
                message: 'Géneros obtenidos exitosamente'
            });
        }
        catch (error) {
            console.error('Error al obtener géneros:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al obtener géneros',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }
}
exports.GeneroController = GeneroController;
