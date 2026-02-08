/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Upload dan manajemen file
 */

/**
 * @swagger
 * /api/file/upload:
 *   post:
 *     summary: Upload file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: File yang akan diupload
 *     responses:
 *       201:
 *         description: File berhasil diupload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 file_id:
 *                   type: string
 *                   example: "file-726ed504102d34e0.jpg"
 *                 url:
 *                   type: string
 *                   example: "/file/file-726ed504102d34e0.jpg"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /api/file/{file_id}:
 *   get:
 *     summary: Download file berdasarkan ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: file_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID file
 *     responses:
 *       200:
 *         description: File berhasil didownload
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */