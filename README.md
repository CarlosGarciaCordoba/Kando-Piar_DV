# Kando PIAR - Sistema de Gestión PIAR

Sistema web para la gestión de Planes Individuales de Ajustes Razonables (PIAR) desarrollado para instituciones educativas.

## 📋 Descripción

Kando PIAR es una aplicación web completa que permite a las instituciones educativas gestionar de manera eficiente los Planes Individuales de Ajustes Razonables (PIAR) para estudiantes con necesidades educativas especiales.

## 🚀 Características

- **Sistema de Autenticación**: Login seguro con JWT
- **Formulario PIAR Completo**: Formulario interactivo con todos los anexos requeridos
- **Gestión de Parametrizaciones**: Administración de datos maestros (departamentos, municipios, tipos de documento, etc.)
- **Dashboard Interactivo**: Panel de control para gestión de información
- **Base de Datos Robusta**: PostgreSQL con estructura completa para PIAR

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** con **TypeScript**
- **Express.js** - Framework web
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **dotenv** - Variables de entorno

### Frontend
- **HTML5, CSS3, JavaScript**
- **Font Awesome** - Iconografía
- **CSS Grid & Flexbox** - Layout responsive

## 📁 Estructura del Proyecto

```
Kando_PIAR/
├── backend/                    # Servidor Node.js/TypeScript
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/    # Controladores de la API
│   │   │   ├── routes/        # Rutas de la API
│   │   │   └── validators/    # Validadores de entrada
│   │   ├── config/            # Configuración de BD y otros
│   │   ├── middleware/        # Middlewares personalizados
│   │   └── utils/            # Utilidades
│   ├── database/             # Scripts SQL
│   ├── package.json
│   └── tsconfig.json
├── frontend/                  # Cliente web
│   ├── pages/               # Páginas HTML
│   ├── css/                # Estilos CSS
│   ├── js/                 # JavaScript del cliente
│   └── css/images/         # Recursos gráficos
└── README.md
```

## ⚙️ Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/CarlosGarciaCordoba/Kando-Piar_DV.git
cd Kando-Piar_DV
```

### 2. Configurar la base de datos
```bash
# Crear base de datos en PostgreSQL
createdb Kando/PIAR_Dev

# Ejecutar el script de creación de tablas
psql -d "Kando/PIAR_Dev" -f Kando_PIAR/backend/database/sistema_piar_completo.sql
```

### 3. Configurar el backend
```bash
cd Kando_PIAR/backend

# Instalar dependencias
npm install

# Crear archivo .env con las siguientes variables:
PORT=3000
NODE_ENV=development
DB_USER=postgres
DB_HOST=localhost
DB_NAME=Kando/PIAR_Dev
DB_PASSWORD=tu_password
DB_PORT=5432
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=1d

# Compilar TypeScript
npm run build

# Iniciar servidor en modo desarrollo
npm run dev
```

### 4. Abrir la aplicación
Navegar a `http://localhost:3000/frontend/pages/login.html`

## 🔧 Scripts Disponibles

### Backend
- `npm run dev` - Servidor en modo desarrollo con hot-reload
- `npm run build` - Compilar TypeScript a JavaScript
- `npm start` - Ejecutar servidor en producción
- `npm run lint` - Linter de código
- `npm run format` - Formatear código con Prettier

## 📊 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/validate` - Validar token

### Parametrizaciones
- `GET /api/tipos-documento` - Obtener tipos de documento
- `GET /api/generos` - Obtener géneros
- `GET /api/departamentos` - Obtener departamentos
- `GET /api/departamentos/:id/municipios` - Obtener municipios por departamento

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 👥 Autores

- **Carlos García Córdoba** - *Desarrollador Principal* - [CarlosGarciaCordoba](https://github.com/CarlosGarciaCordoba)

## 🆘 Soporte

Para soporte y preguntas, por favor crear un issue en el repositorio de GitHub.

---

⭐ ¡No olvides dar una estrella al proyecto si te fue útil!