"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipos_documento_controller_1 = require("../controllers/tipos-documento.controller");
const router = (0, express_1.Router)();
/**
 * @route GET /api/tipos-documento
 * @desc Obtener todos los tipos de documento
 * @query {string} incluir_inactivos - Si es 'true', incluye tipos de documento inactivos
 */
router.get('/', tipos_documento_controller_1.TiposDocumentoController.getAllTiposDocumento);
/**
 * @route GET /api/tipos-documento/:id
 * @desc Obtener un tipo de documento específico por ID
 * @param {string} id - ID del tipo de documento
 */
router.get('/:id', tipos_documento_controller_1.TiposDocumentoController.getTipoDocumentoById);
/**
 * @route POST /api/tipos-documento
 * @desc Crear un nuevo tipo de documento
 * @body {object} tipoDocumento - Datos del tipo de documento (codigo, descripcion, activo)
 */
router.post('/', tipos_documento_controller_1.TiposDocumentoController.createTipoDocumento);
/**
 * @route PUT /api/tipos-documento/:id
 * @desc Actualizar un tipo de documento existente
 * @param {string} id - ID del tipo de documento a actualizar
 * @body {object} tipoDocumento - Datos actualizados del tipo de documento
 */
router.put('/:id', tipos_documento_controller_1.TiposDocumentoController.updateTipoDocumento);
/**
 * @route DELETE /api/tipos-documento/:id
 * @desc Eliminar un tipo de documento
 * @param {string} id - ID del tipo de documento a eliminar
 */
router.delete('/:id', tipos_documento_controller_1.TiposDocumentoController.deleteTipoDocumento);
exports.default = router;
