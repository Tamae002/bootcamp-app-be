/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Statistik dan dashboard
 */

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Dapatkan statistik dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistik dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                 totalKelas:
 *                   type: integer
 *                 totalPertemuan:
 *                   type: integer
 *                 totalJawaban:
 *                   type: integer
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */