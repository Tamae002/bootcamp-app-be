/**
 * @swagger
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Akses ditolak - tidak memiliki token valid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 * 
 *     NotFoundError:
 *       description: Resource tidak ditemukan
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 * 
 *     ValidationError:
 *       description: Data input tidak valid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 * 
 *     ForbiddenError:
 *       description: Akses ditolak - tidak memiliki izin yang cukup
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 * 
 *     SuccessResponse:
 *       description: Operasi berhasil
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SuccessResponse'
 */