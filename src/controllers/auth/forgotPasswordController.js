const { body, validationResult } = require("express-validator");
const { generateResetTokenForEmail } = require("../../services/authResetService");
const nodemailer = require("nodemailer");

// Validasi input
const forgotPasswordValidation = [
  body("email").isEmail().withMessage("Email tidak valid"),
];

async function forgotPassword(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const { email } = req.body;
    const result = await generateResetTokenForEmail(email);

    if (!result) {
      console.log(`[INFO] Email ${email} tidak ditemukan di database`);
      return res.json({
        message: "Jika email terdaftar, link reset password telah dikirim. Periksa inbox Anda.",
      });
    }

    const resetLink = `http://localhost:5000/reset-password/${result.token}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: "re_cc8GtATr_FVBn6NMpAuRm7Wuz6Lc4Xz7f",
      },
    });

    try {
      await transporter.sendMail({
        from: "bootcampapps@bootcamp.raihankr.my.id",
        to: email,
        subject: "Reset Password",
        html: `
          <p><b>Reset password</b></p>
          <p>Klik link berikut untuk mengatur ulang password Anda (berlaku 15 menit):</p>
          <a href="${resetLink}">${resetLink}</a>
        `,
      });

      console.log(`[INFO] Email reset dikirim ke ${email}`);
    } catch (emailError) {
      console.error("[ERROR] Gagal kirim email:", emailError);
      return res.status(500).json({
        message: "Gagal mengirim email reset password",
      });
    }

    return res.json({
      message: "Jika email terdaftar, link reset password telah dikirim. Periksa inbox Anda.",
    });
  } catch (err) {
    console.error("Error forgotPassword:", err);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

module.exports = {
  forgotPassword,
  forgotPasswordValidation,
};