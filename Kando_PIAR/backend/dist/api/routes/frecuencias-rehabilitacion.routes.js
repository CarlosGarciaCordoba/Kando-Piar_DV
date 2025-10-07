"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const frecuencias_rehabilitacion_controller_1 = require("../controllers/frecuencias-rehabilitacion.controller");
const router = (0, express_1.Router)();
const frecuenciasRehabilitacionController = new frecuencias_rehabilitacion_controller_1.FrecuenciasRehabilitacionController();
/**
 * @route GET /api/frecuencias-rehabilitacion
 * @description Obtiene todas las frecuencias de rehabilitación disponibles
 * @access Public
 */
router.get('/', frecuenciasRehabilitacionController.getFrecuenciasRehabilitacion);
/**
 * @route GET /api/frecuencias-rehabilitacion/:id
 * @description Obtiene una frecuencia de rehabilitación específica por ID
 * @access Public
 */
router.get('/:id', frecuenciasRehabilitacionController.getFrecuenciaRehabilitacionById);
exports.default = router;
