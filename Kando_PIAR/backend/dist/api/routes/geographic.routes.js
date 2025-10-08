"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geographic_controller_1 = require("../controllers/geographic.controller");
const router = (0, express_1.Router)();
/**
 * @route GET /api/geographic/departments
 * @desc Obtener todos los departamentos de Colombia
 * @access Public
 */
router.get('/departments', geographic_controller_1.getDepartments);
/**
 * @route GET /api/geographic/municipalities/:departmentCode
 * @desc Obtener municipios por código de departamento
 * @access Public
 * @param departmentCode Código DANE del departamento
 */
router.get('/municipalities/:departmentCode', geographic_controller_1.getMunicipalitiesByDepartment);
/**
 * @route GET /api/geographic/municipalities
 * @desc Obtener todos los municipios con información del departamento
 * @access Public
 */
router.get('/municipalities', geographic_controller_1.getAllMunicipalities);
exports.default = router;
