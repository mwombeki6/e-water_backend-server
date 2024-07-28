import express, { Application, Request, Response } from 'express'

const app: Application = express()
const port: number = 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!, its Erick here')
    res.render('index.html',)
})

app.post('')

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})