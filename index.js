const express = require("express")
const app = express()

app.all("/", (req, res) => {
    console.log("Just got a request!")
    res.status(200).json({ welcome: "app works" })
})
app.listen(process.env.PORT || 3000)
