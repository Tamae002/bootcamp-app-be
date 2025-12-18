import { body, validationResult } from "express-validator";
import { generateResetTokenForEmail } from "../../services/authResetService.js";
import nodemailer from "nodemailer";

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

    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      console.error("[CRITICAL] FRONTEND_URL belum diatur di .env");
      return res.status(500).json({
        message: "Konfigurasi server tidak lengkap",
      });
    }

    // Generate token & simpan ke DB
    const result = await generateResetTokenForEmail(email);

    if (!result) {
      console.log(`[INFO] Permintaan reset untuk email tidak terdaftar: ${email}`);
      return res.json({
        message: "Jika email terdaftar, link reset password telah dikirim. Periksa inbox Anda.",
      });
    }

    const resetLink = `${frontendUrl}/reset-password/${result.token}`;

    // Setup transporter email
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.RESEND_USERNAME,
        pass: process.env.RESEND_PASSWORD,
      },
    });

    // Kirim email
    try {
      await transporter.sendMail({
        from: "bootcampapps@bootcamp.raihankr.my.id",
        to: email,
        subject: "Reset Password Akun Anda",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto;">
            <h2>Permintaan Reset Password</h2>
            <p>Klik tombol di bawah untuk mengatur ulang password Anda:</p>
            <a href="${resetLink}" 
               style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
              Atur Ulang Password
            </a>
            <p>Link ini berlaku selama <strong>15 menit</strong>.</p>
            <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
          </div>
        `,
      });

      console.log(`[SUCCESS] Email reset dikirim ke: ${email}`);
    } catch (emailError) {
      console.error("[EMAIL ERROR]", emailError.message);
      return res.status(500).json({
        message: "Gagal mengirim email reset password",
      });
    }

    return res.json({
      message: "Jika email terdaftar, link reset password telah dikirim. Periksa inbox Anda.",
    });
  } catch (err) {
    console.error("[SERVER ERROR] forgotPassword:", err);
    return res.status(500).json({ message: "Terjadi kesalahan internal" });
  }
}

export { forgotPassword, forgotPasswordValidation };