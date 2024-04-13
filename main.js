import { app } from './src/app/app.js'
import { PORT } from './src/config/config.js'
import { connect } from './src/database/database.js'

await connect()

app.listen(PORT)