// docs/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Bootcamp App API',
      version: '1.0.0',
      description: 'API untuk sistem pembelajaran bootcamp',
      contact: {
        name: 'Developer Team',
        email: 'dev@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server'
      },
      {
        url: 'https://localhost:3000',
        description: 'Development Server (HTTPS)'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Masukkan token JWT tanpa prefix "Bearer "'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      { name: 'Authentication', description: 'Endpoint autentikasi' },
      { name: 'Users', description: 'Manajemen pengguna' },
      { name: 'Kelas', description: 'Manajemen kelas pembelajaran' },
      { name: 'Pertemuan', description: 'Manajemen pertemuan dalam kelas' },
      { name: 'Jawaban', description: 'Manajemen jawaban tugas' },
      { name: 'Files', description: 'Upload dan download file' },
      { name: 'Dashboard', description: 'Statistik dashboard' }
    ]
  },
  apis: [
    join(__dirname, 'components', '*.js'),
    join(__dirname, 'paths', '*.js')
  ]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Debug
console.log('✅ Swagger specification generated');
console.log('📄 Total paths:', Object.keys(swaggerSpec.paths || {}).length);
console.log('🏷️  Total tags:', swaggerSpec.tags?.length || 0);

export default swaggerSpec;