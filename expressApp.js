import express from "express"
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res) => {
   res.send('response from server get method')
})
app.post('/create', (req, res) => {
   const { username, password } = req.body
   console.log('username: ', username)
   console.log('password: ', password)
   res.send({ data: "response from post method" })
})

app.listen(3000, (req, res) => console.log("Server is listening on port 3000"))