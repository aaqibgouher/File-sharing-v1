const bcrypt = require("bcrypt");
const { MESSAGE_CONSTANTS } = require("./constants");
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const encryptPass = async (password) => {
  const saltRounds = process.env.BCRYPT_SALT_ROUNDS;

  if (!saltRounds) throw MESSAGE_CONSTANTS.BCRYPT_INVALID_SALT_ROUNDS;

  return await bcrypt.hash(password, +saltRounds);
};

const verifyPass = async (dbPassword, password) => {
  return await bcrypt.compare(password, dbPassword);
};

const sendEmail = async (
  to,
  subject = MESSAGE_CONSTANTS.EMAIL_VERIFICATION_SUBJECT,
  text = MESSAGE_CONSTANTS.EMAIL_VERIFICATION_TEXT
) => {
  try {
    const mailOptions = {
      from: "mrdh2@freesourcecodes.com ",
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const generateOtp = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

const generateJWT = async (payload) => {
  return JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyJWT = async (token) => {
  return await JWT.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  encryptPass,
  verifyPass,
  sendEmail,
  generateOtp,
  generateJWT,
  verifyJWT,
};
