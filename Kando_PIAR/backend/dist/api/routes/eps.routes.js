"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eps_controller_1 = require("../controllers/eps.controller");
const router = (0, express_1.Router)();
/**
 * @route GET /api/eps
 * @desc Obtiene todas las EPS disponibles
 * @access Public
 */
router.get('/', eps_controller_1.EpsController.getEps);
/**
 * @route GET /api/eps/:id_eps
 * @desc Obtiene una EPS específica por ID
 * @access Public
 */
router.get('/:id_eps', eps_controller_1.EpsController.getEpsById);
exports.default = router;
