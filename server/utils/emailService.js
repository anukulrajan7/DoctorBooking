import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailToPatients = async (doctorName, emails) => {
  // await transporter.sendMail({
  //   from: process.env.EMAIL_USER,
  //   to: emails.join(","),
  //   subject: `Dr. ${doctorName} is now online!`,
  //   html: `<p>Dr. ${doctorName} is now available for consultation. Log in now to connect.</p>`,
  // });
};
