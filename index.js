// Importing All Packages using the CommonJS method.
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")
const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.PORT
const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get("/", (req, res) => {

    console.log("Welcome to the Dynasty Telegram Bot.")
    res.end("Welcome to the Dynasty Telegram Bot.")
})

app.get("/test-token", (req, res) => {
    console.log(TELEGRAM_API_TOKEN)
    console.log(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`)
    res.end("Testing Token Complete")
})


app.post("/new-message", function (req, res) {
    const { message } = req.body

    // Each message contains "text" and a "chat" object, which has an "id" which is the chat id

    // if (!message || message.text.toLowerCase().indexOf("dynasty") < 0) {
    //     // In case a message is not present, or if our message does not have the word dynasty in it, do nothing and return an empty response
    //     return res.end()
    // }

    if (!message || !message.text) {
        // Terminate program if no message was passed.
        return res.end()
    }

    const text = message.text.toLowerCase().trim()
    const chatId = message.chat.id
    let responseText = ""

    // Commands handling logic
    if (text === "/start") {
        responseText = "Welcome to Dynasty Bot! Its great to have you here. Try typing /who-is-dynasty to learn more about Dynasty."
    }
    else if (text === "/who-is-dynasty") {
        responseText = "Emmanuel Mojiboye also known as Dynasty is a passionate Software Engineer with 3+ years of experience in building scalable softwares. \n Dynasty is also a type of person who loves to learn new things, explore and keep improving himself. \n His goal is to be 0.1% better everyday. And Dynasty also happens to be the creator of this particular bot you are using :)"
    }
    else if (text === "/help") {
        responseText = "Available commands: /start, /who-is-dynasty, /help, /info, /status, /contact, /contact"
    }
    else if (text.includes("dynasty")) {
        responseText = "Dynasty is the greatest!!!!!!!!!!!!!"
    }

    else if (text === "/info") {
        responseText = "More about This bot: This bot was built by the amazing Dynasty and it was built thanks to the Telegram Documentation, Online reading resource to ensure the bot works well."
    }

    else if (text === "/status") {
        responseText = "Bot is in a good state, thanks for asking about its status."
    }

    else if (text === "/contact") {
        // responseText = "Here is a link to a bunch of social media platforms Dynasty makes use of: GitHub: (https://github.com/Emzzy241), Portfolio: (https://emmanuelmojiboye.journoportfolio.com/), LinkedIn (https://www.linkedin.com/in/emmanuel-mojiboye/),  X.com (Twitter): (https://x.com/EmmanuelMOjiboy), Tiktok: (https://www.tiktok.com/@dynasty608), Product Hunt: (https://www.producthunt.com/@Dynasty)"
        responseText = "Here are the social media platforms Dynasty uses:\n\n" +
                   "**GitHub:** (https://github.com/Emzzy241)\n" +
                   "**Portfolio:** (https://emmanuelmojiboye.journoportfolio.com/)\n" +
                   "**LinkedIn:** (https://www.linkedin.com/in/emmanuel-mojiboye/)\n" +
                   "**X.com (Twitter):** (https://x.com/EmmanuelMOjiboy)\n" +
                   "**Tiktok:** (https://www.tiktok.com/@dynasty608)\n" +
                   "**Product Hunt:** (https://www.producthunt.com/@Dynasty)"
    }

    else if (text === "/feedback") {
        responseText = "Enter the feedback you would like to give Dynasty about his bot."
    }

    if (responseText) {
        // Only attempt to send a message if a responseText was generated.
        axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`,
            {
                chat_id: chatId,
                text: responseText,
            }
        )
            .then((response) => {
                console.log("Message posted successfully.")
                res.end("ok")
            })
            .catch((err) => {
                console.log("Error :", err)
                res.end("Error :" + err)
            })
    }

    else {
        // End the request if no command or keyword was matched.
        res.end("ok")
    }
    // Respond by hitting the telegram bot API and responding to the appropriate chat_id with the word "Dynasty is da great!!!!!!!"

})


// Finally, start our server
app.listen(PORT, () => {
    console.log(`Telegram app listening on port ${3000}!`)
})