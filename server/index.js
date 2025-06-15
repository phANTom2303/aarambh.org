const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const mongourl = "mongodb://127.0.0.1:27017/aarambh";
const { connectMongoDB } = require("./connectMongoDB");
const memberRouter = require("./routes/memberRouter");
const articleRouter = require("./routes/articleRouter");

//cors to allow access to frontend
// app.use(cors());

app.use(cors());
connectMongoDB(mongourl)
    .then(() => console.log("Mongo Connection successfull"))
    .catch((err) => console.log(`Mongo Connection failed : ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));//to support parsing of form data

app.get('/', (req, res) => {
    res.send('Aarambh NGO')
})

app.use("/members", memberRouter);
app.use("/articles", articleRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
