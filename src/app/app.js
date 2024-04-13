import express from 'express'
import { webRouter } from '../routes/web/web.router.js'
import { apiRouter } from '../routes/api/api.router.js'
import passport from 'passport'
import initializePassport from '../config/passport.config.js'
import { sessionConfig } from '../middlewares/session.js'
import session from 'express-session'
import {engine} from 'express-handlebars'
export const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './public/views')

app.use(express.json());
app.use('/static', express.static('./public/static'));



app.use(sessionConfig)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/', webRouter)
app.use('/api', apiRouter)