const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { senderEmail, appPassword, subject, body, recipients } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: appPassword
    }
  });

  const recipientList = recipients.split(',').map(email => email.trim());

  try {
    for (let email of recipientList) {
      await transporter.sendMail({
        from: senderEmail,
        to: email,
        subject,
        html: `<p>${body}</p>`
      });
    }
    res.json({ message: '✅ Emails sent successfully!' });
  } catch (err) {
    res.json({ message: '❌ Failed to send emails.' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
