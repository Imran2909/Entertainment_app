const express = require("express")
const app = express()
const { connection } = require("./db")
const fs = require("fs")
const { userRouter } = require("./routes/user.route")
const { authenticate } = require("./middleware/middleware")
const userModel = require("./models/user.model")
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Home page")
})

app.use("/user", userRouter)


app.put("/addBookmark", async (req, res) => {
    // Read the user ID from 'userData.txt'
    fs.readFile('userData.txt', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send('Error reading file');
        }

        try {
            // Find the user by ID
            const user = await userModel.findById(data);
            if (!user) {
                return res.status(404).send('User not found');
            }
            // res.send(user)
            // Update the bookmark array
            const updatedBookmark = [...user.bookmark[0].movie]
            updatedBookmark.push(req.body.movieId)
            user.bookmark[0].movie = updatedBookmark;

            // Save the updated user document
            await user.save();
            console.log(user.bookmark[0].movie)
            res.send('Bookmark updated successfully');
        } catch (error) {
            console.error('Error updating bookmark', error);
            res.status(500).send('Error updating bookmark');
        }
    });
});

app.get("/usr",(req,res)=>{
    
})

app.use(authenticate)
app.listen(8050, async () => {
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log("cannot connected to db");
        console.log(error);
    }
    console.log("server started at port 8050");
})

