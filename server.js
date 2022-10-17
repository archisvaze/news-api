const express = require("express");
const cors = require("cors");

const inshorts = require('inshorts-news-api');

const app = express();

app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const httpServer = app.listen(process.env.PORT || 8000, () => {
    const port = httpServer.address().port;
    console.log("Express is running on port " + port);
})


//specify language, category of news you want

app.get("/", async (req, res) => {
    console.log("get", req.query)
    let lang = req.query.lang;
    let category = req.query.category;
    if (lang === null || lang === undefined) lang = "en";
    if (category === null || category === undefined) category = "world"
    try {
        inshorts.getNews({lang, category}, async (result) => {
            return res.status(200).json({ data: result })
        });
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})