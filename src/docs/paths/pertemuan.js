/**
 * @swagger
 * tags:
 *   name: Pertemuan
 *   description: Manajemen pertemuan dalam kelas
 */

/**
 * @swagger
 * /pertemuan:
 *   get:
 *     summary: Dapatkan daftar semua pertemuan
 *     tags: [Pertemuan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar pertemuan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pertemuan'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /pertemuan/{pertemuan_id}:
 *   get:
 *     summary: Dapatkan detail pertemuan berdasarkan ID
 *     tags: [Pertemuan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pertemuan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Detail pertemuan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pertemuan'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /pertemuan:
 *   post:
 *     summary: Buat pertemuan baru
 *     tags: [Pertemuan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PertemuanCreateInput'
 *     responses:
 *       201:
 *         description: Pertemuan berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pertemuan'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
 * /pertemuan/{pertemuan_id}:
 *   put:
 *     summary: Update pertemuan
 *     tags: [Pertemuan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pertemuan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PertemuanUpdateInput'
 *     responses:
 *       200:
 *         description: Pertemuan berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pertemuan'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /pertemuan/{pertemuan_id}:
 *   delete:
 *     summary: Hapus pertemuan
 *     tags: [Pertemuan]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pertemuan_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */