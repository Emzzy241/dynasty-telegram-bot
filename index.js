// Importing All Packages using the CommonJS method.
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")
const dotenv = require("dotenv")

dotenv.config()

const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get("/", (req, res)=> {

    console.log("Welcome to the Dynasty Telegram Bot.")
    res.end("Welcome to the Dynasty Telegram Bot.")
})

app.get("/test-token", (req, res) => {
    console.log(TELEGRAM_API_TOKEN)
    console.log(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/send-message`)
    res.end("Testing Token Complete")
})


app.post("/new-message", function(req, res) {
    const { message } = req.body

    // Each message contains "text" and a "chat" object, which has an "id" which is the chat id

    if (!message || message.text.toLowerCase().indexOf("dynasty") < 0) {
        // In case a message is not present, or if our message does not have the word dynasty in it, do nothing and return an empty response
        return res.end()
    }

    // If we have gotten this far, it means that we have received the word "dynasty"
    // Respond by hitting the telegram bot API and responding to the appropriate chat_id with the word "Dynasty is da great!!!!!!!"
    axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/send-message`,
       {
        chat_id: message.chat.id,
        text: "Dynasty is da greatest!!!!!",
       } 
    )
    .then((response) => {
        console.log("Message posted")
        res.end("ok")
    })
    .catch((err) => {
        console.log("Error :", err)
        res.end("Error :" + err)
    })
})


// Finally, start our server
app.listen(3000, ()=> {
    console.log("Telegram app listening on port 3000!")
})