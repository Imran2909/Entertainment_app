const express = require("express")
const app = express()
const { connection } = require("./db")
const { userRouter } = require("./routes/user.route")
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Home page")
})


app.use("/user", userRouter)


app.listen(8080, async () => {
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log("cannot connected to db");
        console.log(error);
    }
    console.log("server started at port 8080");
})

