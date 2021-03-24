import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

const msg = {
  to: 'damian.lis1293@gmail.com',
  from: 'gisapiaapp@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  mail_settings: {
    sandbox_mode: {
      enable: true,
    },
  },
}

export default msg
