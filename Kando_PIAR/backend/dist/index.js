"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("./config/database"));
const auth_routes_1 = __importDefault(require("./api/routes/auth.routes"));
const tipos_documento_routes_1 = __importDefault(require("./api/routes/tipos-documento.routes"));
const genero_routes_1 = __importDefault(require("./api/routes/genero.routes"));
const departamento_routes_1 = __importDefault(require("./api/routes/departamento.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
// ID de build para depuración (reinicia en cada proceso)
const BUILD_ID = `build-${Date.now()}`;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Servir archivos estáticos del frontend
app.use('/frontend', express_1.default.static(path_1.default.join(__dirname, '../../frontend')));
// Header de versión en todas las respuestas
app.use((req, res, next) => {
    res.setHeader('X-App-Build', BUILD_ID);
    next();
});
// Rutas
app.use('/api/auth', auth_routes_1.default);
app.use('/api/tipos-documento', tipos_documento_routes_1.default);
app.use('/api/generos', genero_routes_1.default);
app.use('/api/departamentos', departamento_routes_1.default);
// Ruta de prueba
app.get('/', (_req, res) => {
    res.json({
        message: 'API Kando PIAR funcionando correctamente',
        build: BUILD_ID
    });
});
// Ruta de diagnóstico para identificar el proceso que responde
app.get('/whoami', (_req, res) => {
    res.json({
        build: BUILD_ID,
        pid: process.pid,
        cwd: process.cwd(),
        execPath: process.execPath,
        uptimeSeconds: process.uptime(),
        timestamp: new Date().toISOString()
    });
});
// Ruta de prueba para la base de datos
app.get('/db-test', async (_req, res) => {
    try {
        const result = await database_1.default.query('SELECT NOW()');
        res.json({
            message: 'Conexión exitosa a la base de datos',
            timestamp: result.rows[0].now
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error conectando a la base de datos',
            error: error.message
        });
    }
});
const PORT = Number(process.env.PORT) || 3000;
// 404 para rutas no encontradas
app.use((req, res, _next) => {
    res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});
// Middleware global de errores (debe ir al final)
app.use(errorHandler_1.errorHandler);
// Iniciar el servidor independientemente de la conexión a la base de datos
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🆔 BUILD_ID: ${BUILD_ID}`);
    console.log(`📌 PID: ${process.pid}`);
    console.log(`📂 CWD: ${process.cwd()}`);
});
// Verificar conexión a la base de datos (opcional, no bloquea el servidor)
database_1.default.query('SELECT NOW()', (error, result) => {
    if (error) {
        console.error('❌ Error conectando a la base de datos al iniciar el servidor:', error.message);
        console.log('⚠️ El servidor continuará ejecutándose sin conexión a la base de datos');
    }
    else {
        console.log('✅ Conexión exitosa a la base de datos al iniciar el servidor');
    }
});
exports.default = app;
