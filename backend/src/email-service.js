import nodemailer from "nodemailer";

export class EmailService {
  constructor() {
    this.transporter = null;
    this.setupTransporter();
  }

  setupTransporter() {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      this.transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }
  }

  async sendEmail(to, subject, body) {
    try {
      // For demo purposes, always log the email
      console.log("\n📧 EMAIL NOTIFICATION:");
      console.log("========================");
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${body}`);
      console.log(`Timestamp: ${new Date().toISOString()}`);
      console.log("========================\n");

      // If real email credentials are provided, send actual email
      if (this.transporter) {
        await this.transporter.sendMail({
          from: process.env.EMAIL_USER,
          to,
          subject,
          text: body,
          html: `<p>${body.replace(/\n/g, "<br>")}</p>`,
        });
        console.log("✅ Real email sent successfully!");
        return { success: true, message: "Email sent successfully!" };
      } else {
        console.log(
          "ℹ️  Demo mode - email logged but not sent (configure EMAIL_USER and EMAIL_PASS to send real emails)"
        );
        return {
          success: true,
          message: "Email logged successfully (demo mode)!",
        };
      }
    } catch (error) {
      console.error("❌ Email send failed:", error.message);
      return {
        success: false,
        message: `Failed to send email: ${error.message}`,
      };
    }
  }
}
