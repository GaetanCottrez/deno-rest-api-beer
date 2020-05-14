import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './router.ts'

const env = Deno.env.toObject()
const HOST = env.HOST || '127.0.0.1'
const PORT = env.PORT || 3000

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on port ${PORT} ...`)
app.listen(`${HOST}:${PORT}`)