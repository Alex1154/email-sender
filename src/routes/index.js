import { Router } from "express"
import email from "./email.routes.js"

const routes = Router()

routes.use("/email", email)

export default routes
