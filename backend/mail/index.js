import { SENDGRID_API_KEY } from '../env.js'
import sgMail from '@sendgrid/mail'
import { createMessageFn } from './helpers/index.js'

sgMail.setApiKey(SENDGRID_API_KEY)

export const sendMail = (req, res) => {
  const mailMessage = createMessageFn({ type: 'mail', data: req.body })

  sgMail
    .send(mailMessage)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
      res.json({
        success: true,
        message: createMessageFn({ type: 'success' }),
      })
    })
    .catch((error) => {
      console.error(error)
      res.json({
        success: false,
        message: createMessageFn({ type: 'error' }),
      })
    })
}
