const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
const port = 4000;
const mongourl = "mongodb://127.0.0.1:27017/aarambh";
const { connectMongoDB } = require("./connectMongoDB");
const memberRouter = require("./routes/memberRouter");
const articleRouter = require("./routes/articleRouter");
const adminRouter = require("./routes/adminRouter");

//cors to allow access to frontend
require('dotenv').config();
app.use(cors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

connectMongoDB(mongourl)
    .then(() => console.log("Mongo Connection successfull"))
    .catch((err) => console.log(`Mongo Connection failed : ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));//to support parsing of form data
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Aarambh NGO')
})

app.use("/members", memberRouter);
app.use("/articles", articleRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
