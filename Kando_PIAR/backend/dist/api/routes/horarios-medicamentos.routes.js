"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horarios_medicamentos_controller_1 = require("../controllers/horarios-medicamentos.controller");
const router = (0, express_1.Router)();
const horariosMedicamentosController = new horarios_medicamentos_controller_1.HorariosMedicamentosController();
/**
 * @route GET /api/horarios-medicamentos
 * @description Obtiene todos los horarios de medicamentos disponibles
 * @access Public
 */
router.get('/', horariosMedicamentosController.getHorariosMedicamentos);
/**
 * @route GET /api/horarios-medicamentos/:id
 * @description Obtiene un horario de medicamentos específico por ID
 * @access Public
 */
router.get('/:id', horariosMedicamentosController.getHorarioMedicamentosById);
exports.default = router;
