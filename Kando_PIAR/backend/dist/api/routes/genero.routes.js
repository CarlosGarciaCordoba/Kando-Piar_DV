"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genero_controller_1 = require("../controllers/genero.controller");
const router = (0, express_1.Router)();
/**
 * @route GET /api/generos
 * @desc Obtiene todos los géneros disponibles
 * @access Public
 */
router.get('/', genero_controller_1.GeneroController.getGeneros);
exports.default = router;
