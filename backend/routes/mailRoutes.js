import express from 'express'
import { createMail } from '../controllers/createMail.js'
const router = express.Router()

router.route('/').post(createMail)

export default router
