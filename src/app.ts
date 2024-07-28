import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import router from './routes/auth'
import connectDB from './config/db'

/*const app: Application = express()
const port: number = 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!, its Erick here')
    res.render('index.html',)
})

app.use('/api/auth', );

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})
*/

dotenv.config()

const app = express()
connectDB()

app.use(express.json())
app.use('/api/auth', router)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))