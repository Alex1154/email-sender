import express from "express"
import { Router } from "express"
import nodemailer from "nodemailer"
import * as dotenv from "dotenv"

const email = Router()

email.post("/send", async (req, res) => {
  const { userEmail, userName, subject, textContent } = req.body

  const emailModule = {
    userEmail,
    userName,
    subject,
    textContent,
  }
  console.log(
    emailModule.userEmail,
    emailModule.userName,
    emailModule.subject,
    emailModule.textContent
  )
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ADMIN_USER,
      pass: process.env.MAIL_ADMIN_PASS,
    },
  })

  await transporter
    .sendMail({
      from: process.env.MAIL_ADMIN_USER,
      to: process.env.MAIL_ADMIN_USER,
      subject: emailModule.subject,
      text: `from ${emailModule.userName} < ${emailModule.userEmail} > : ${emailModule.textContent} `,
    })

    .then((info) => {
      res.status(200).json({ message: info })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
})
export default email
