"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const frecuencias_medicamentos_controller_1 = require("../controllers/frecuencias-medicamentos.controller");
const router = (0, express_1.Router)();
const frecuenciasMedicamentosController = new frecuencias_medicamentos_controller_1.FrecuenciasMedicamentosController();
/**
 * @route GET /api/frecuencias-medicamentos
 * @description Obtiene todas las frecuencias de medicamentos disponibles
 * @access Public
 */
router.get('/', frecuenciasMedicamentosController.getFrecuenciasMedicamentos);
/**
 * @route GET /api/frecuencias-medicamentos/:id
 * @description Obtiene una frecuencia de medicamentos específica por ID
 * @access Public
 */
router.get('/:id', frecuenciasMedicamentosController.getFrecuenciaMedicamentosById);
exports.default = router;
