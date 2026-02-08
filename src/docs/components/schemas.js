/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "cmj3zf5im0001kbk4iao6jqe7"
 *         name:
 *           type: string
 *           example: "Rhizky"
 *         email:
 *           type: string
 *           format: email
 *           example: "rhizkygranger59@gmail.com"
 *         role:
 *           type: string
 *           enum: [admin, mentor, user]
 *           example: "admin"
 *         gambar:
 *           type: string
 *           nullable: true
 *           example: "https://example.com/avatar.jpg"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - user_id
 *         - name
 *         - email
 *         - role
 * 
 *     UserCreateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 255
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *         role:
 *           type: string
 *           enum: [admin, mentor, user]
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 * 
 *     UserUpdateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 255
 *         email:
 *           type: string
 *           format: email
 * 
 *     LoginInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 * 
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           $ref: '#/components/schemas/User'
 *       required:
 *         - token
 *         - user
 * 
 *     Kelas:
 *       type: object
 *       properties:
 *         kelas_id:
 *           type: string
 *           format: uuid
 *           example: "cmiwpsni60004cru43d8h4kh8"
 *         nama_kelas:
 *           type: string
 *           example: "Belajar React"
 *         gambar:
 *           type: string
 *           nullable: true
 *           example: "https://example.com/react.jpg"
 *         deskripsi:
 *           type: string
 *           nullable: true
 *           example: "Kelas untuk para pemula React"
 *         tanggal_mulai:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         tanggal_berakhir:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - kelas_id
 *         - nama_kelas
 * 
 *     KelasCreateInput:
 *       type: object
 *       properties:
 *         nama_kelas:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *         gambar:
 *           type: string
 *           nullable: true
 *         deskripsi:
 *           type: string
 *           nullable: true
 *         tanggal_mulai:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         tanggal_berakhir:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         added_users:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           description: Array of user IDs to add as members
 *       required:
 *         - nama_kelas
 * 
 *     KelasUpdateInput:
 *       type: object
 *       properties:
 *         nama_kelas:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *         gambar:
 *           type: string
 *           nullable: true
 *         deskripsi:
 *           type: string
 *           nullable: true
 *         tanggal_mulai:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         tanggal_berakhir:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         isActive:
 *           type: boolean
 *         added_users:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         removed_users:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 * 
 *     Pertemuan:
 *       type: object
 *       properties:
 *         pertemuan_id:
 *           type: string
 *           format: uuid
 *           example: "cmj5ff9oy000av9eksim56agc"
 *         kelas_id:
 *           type: string
 *           format: uuid
 *         judul:
 *           type: string
 *           example: "Inimah cuma testing jangan dianggap serius"
 *         tanggal:
 *           type: string
 *           format: date-time
 *         deskripsi_tugas:
 *           type: string
 *           nullable: true
 *           example: "yang ga ngerjain ga dapet MBG"
 *         link_lampiran:
 *           type: string
 *           nullable: true
 *           example: "linkin9"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - pertemuan_id
 *         - judul
 *         - tanggal
 * 
 *     PertemuanCreateInput:
 *       type: object
 *       properties:
 *         kelas_id:
 *           type: string
 *           format: uuid
 *         judul:
 *           type: string
 *           minLength: 5
 *           maxLength: 255
 *         tanggal:
 *           type: string
 *           format: date-time
 *         deskripsi_tugas:
 *           type: string
 *           nullable: true
 *         link_lampiran:
 *           type: string
 *           nullable: true
 *       required:
 *         - kelas_id
 *         - judul
 *         - tanggal
 * 
 *     PertemuanUpdateInput:
 *       type: object
 *       properties:
 *         kelas_id:
 *           type: string
 *           format: uuid
 *         judul:
 *           type: string
 *           minLength: 5
 *           maxLength: 255
 *         tanggal:
 *           type: string
 *           format: date-time
 *         deskripsi_tugas:
 *           type: string
 *           nullable: true
 *         link_lampiran:
 *           type: string
 *           nullable: true
 * 
 *     Jawaban:
 *       type: object
 *       properties:
 *         jawaban_id:
 *           type: string
 *           format: uuid
 *           example: "cmkxddxcr000bv9aovks9pr81"
 *         pertemuan_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         file_path:
 *           type: string
 *           nullable: true
 *           example: "/uploads/jawaban_cmknp6zuq0002v9igwx8nz728_cmknp6zwa0008v9ig0xx90yl6.pdf"
 *         nilai:
 *           type: integer
 *           minimum: 0
 *           nullable: true
 *         status:
 *           type: string
 *           enum: [menunggu nilai, sudah dinilai, menunggu, dinilai]
 *           example: "dinilai"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - jawaban_id
 *         - status
 * 
 *     JawabanNilaiUpdateInput:
 *       type: object
 *       properties:
 *         nilai:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *       required:
 *         - nilai
 * 
 *     PaginationResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             type: object
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             totalPages:
 *               type: integer
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Not found"
 *         errors:
 *           type: array
 *           items:
 *             type: object
 * 
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Success"
 */