import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
    authMethod: "PLAIN",
  },
});

const sendRemainderMail = async (data) => {
  let status = false;

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: data.email,
    subject: `Reminder: ${data.title}`,
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #007bff;">Reminder: ${data.title}</h2>
          <p>Hello,</p>
          <p>This is a friendly reminder for the task you scheduled on <strong>${new Date(
            data.date
          ).toLocaleString()}</strong>:</p>
          <p><strong>Title:</strong> ${data.title}</p>
          <p><strong>Description:</strong> ${
            data.description || "No description provided"
          }</p>
          ${
            data.attachment
              ? `
            <p><strong>Attachment:</strong></p>
            <p><a href="${data.attachment}" target="_blank" 
               style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">
              View Attachment
            </a></p>`
              : ""
          }
          <p>Please ensure you complete this task on time.</p>
          <p>Best regards,<br>Your Task Reminder Team</p>
        </div>
      `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    status = true;
  } catch (error) {
    console.error("Error sending email:", error);
  }

  return status;
};

export default sendRemainderMail;
