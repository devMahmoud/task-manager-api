const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDMAIL_API_KEY)

const writeEmail = (email, sub, message) => {
  sgMail.send({
    to: email,
    from: "kabaka.nagib7@gmail.com",
    subject: `${sub}`,
    text: message
}).then(() => {}, error => {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  })
}

const sendWelcomeEmail = (email, name) => {
  writeEmail(email, `Welcome ${name}`, "Welcome to the app")
}

const sendCancelationEmail = (email, name) => {
  writeEmail(email, `We are sorry ${name}`, "Tell us why you left")
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}