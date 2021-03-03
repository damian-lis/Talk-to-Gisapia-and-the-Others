import express from 'express'
import mailRoutes from './routes/mailRoutes.js'

const app = express()

app.use(express.json())

app.use('/api/mail', mailRoutes)

const PORT = 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
