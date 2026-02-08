/**
 * @swagger
 * tags:
 *   name: Jawaban
 *   description: Manajemen jawaban tugas pertemuan
 */

/**
 * @swagger
 * /jawaban/{Jawaban_id}/nilai:
 *   patch:
 *     summary: Update nilai jawaban
 *     tags: [Jawaban]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Jawaban_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID jawaban
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JawabanNilaiUpdateInput'
 *     responses:
 *       200:
 *         description: Nilai berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jawaban'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /jawaban/{pertemuan_id}:
 *   post:
 *     summary: Submit jawaban untuk pertemuan
 *     tags: [Jawaban]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pertemuan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID pertemuan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               file_path:
 *                 type: string
 *                 nullable: true
 *               nilai:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 100
 *                 nullable: true
 *               status:
 *                 type: string
 *                 enum: [menunggu nilai, sudah dinilai, menunggu, dinilai]
 *     responses:
 *       201:
 *         description: Jawaban berhasil disubmit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jawaban'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       409:
 *         description: Jawaban untuk pertemuan ini sudah ada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */