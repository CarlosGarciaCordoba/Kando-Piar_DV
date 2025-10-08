"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamento_controller_1 = require("../controllers/departamento.controller");
const router = (0, express_1.Router)();
/**
 * @route GET /api/departamentos
 * @desc Obtiene todos los departamentos disponibles
 * @access Public
 */
router.get('/', departamento_controller_1.DepartamentoController.getDepartamentos);
/**
 * @route GET /api/departamentos/:id_departamento/municipios
 * @desc Obtiene los municipios de un departamento específico
 * @access Public
 */
router.get('/:id_departamento/municipios', departamento_controller_1.DepartamentoController.getMunicipiosByDepartamento);
exports.default = router;
