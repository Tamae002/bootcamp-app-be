const { body, validationResult } = require('express-validator');
const {
  verifyResetToken,
  updatePasswordAndDeleteToken,
} = require('../../services/authResetService');

// Validation chain for reset-password
const resetPasswordValidation = [
  body('token').isString().notEmpty().withMessage('Token wajib diisi'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password minimal 8 karakter'),
];

async function resetPassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validasi gagal',
      errors: errors.array(),
    });
  }

  const { token, password } = req.body;

  const verified = await verifyResetToken(token);
  if (!verified) {
    return res.status(400).json({
      message: 'Token tidak valid atau sudah kedaluwarsa',
    });
  }

  const success = await updatePasswordAndDeleteToken(
    verified.user.id,
    password,
    token
  );

  if (!success) {
    return res.status(500).json({
      message: 'Gagal memperbarui password',
    });
  }

  return res.json({
    message: 'Password berhasil diperbarui',
  });
}

module.exports = {
  resetPassword,
  resetPasswordValidation,
};