/////////// SEND GRID ////////////////

// import sgMail from "@sendgrid/mail";
// const { SENDGRID_API_KEY } = process.env;
// sgMail.setApiKey(SENDGRID_API_KEY);

// const  = async (data) => {
//   const email = {
//     ...data,
//     from: "domanskaya_@ukr.net",
//   };
//   await sgMail.send(email);
//   return true;
// };

// const email = {
//   to: "domanskaya_@ukr.net",
//   from: "Yelyzaveta",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3001</p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email sent successfully"))
//   .catch(() => console.log(error.message));

//////////////////////////////////////////////////////////

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 405, //25, 465, 2525
  secure: true,
  auth: {
    user: "domanskayelyzaveta@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "domanskayelyzaveta@meta.ua" };
  return transport.sendMail(email);
};

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

export default sendEmail;
