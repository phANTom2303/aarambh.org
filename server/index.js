const express = require('express')
const app = express()
const port = 4000
const mongourl = "mongodb://127.0.0.1:27017/aarambh"
const {connectMongoDB} = require("./connectMongoDB")


connectMongoDB(mongourl)
.then(()=> console.log("Mongo Connection successfull"))
.catch((err) => console.log(`Mongo Connection failed : ${err}`));


app.use(express.urlencoded({extended: false}));//to support parsing of form data

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
