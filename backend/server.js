import express from 'express'
import { sendMail } from './mail/index.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/mail', sendMail)

const PORT = 5001

app.listen(PORT, console.log(`Server running on ${PORT} port`))
