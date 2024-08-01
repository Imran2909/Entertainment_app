const express = require("express")
const { connection } = require("./db")
const fs = require("fs")
const cors = require('cors')
const { userRouter } = require("./routes/user.route")
const { authenticate } = require("./middleware/middleware")
const userModel = require("./models/user.model")
const session = require('express-session');
const passport = require('passport');
require('./config/google-oauth');

const app = express()
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors({origin:"*"}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'cats',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } 
}));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.send("Home page")
})


app.use("/user", userRouter)


app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3000/',
        failureRedirect: '/fail'
    })
);


app.put("/addTvSeriesBookmark", async (req, res) => {
    fs.readFile('userData.txt', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send('Error reading file');
        } try {
            const userId = data.trim();
            const movieId = req.body.movieId;
            if (!movieId) {
                return res.status(400).send('Movie ID is required');
            }
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            // Update the bookmark array using findByIdAndUpdate
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                {
                    $push: { 'bookmark.0.tvSeries': movieId }
                },
                { new: true, useFindAndModify: false }
            );
            if (!updatedUser) {
                return res.status(404).send('User not found');
            }
            // console.log(updatedUser.bookmark[0].movie);
            res.send('Bookmark updated successfully');
        } catch (error) {
            console.error('Error updating bookmark', error);
            res.status(500).send('Error updating bookmark');
        }
    });
});

app.put("/removeTvSeriesBookmark", async (req, res) => {
    fs.readFile('userData.txt', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send('Error reading file');
        }
        try {
            const userId = data.trim();
            const movieId = req.body.movieId;
            if (!movieId) {
                return res.status(400).send('Movie ID is required');
            }
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            // Update the bookmark array using findByIdAndUpdate
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                {
                    $pull: { 'bookmark.0.tvSeries': movieId }
                },
                { new: true, useFindAndModify: false }
            );
            if (!updatedUser) {
                return res.status(404).send('User not found');
            }
            res.send('Bookmark removed successfully');
        } catch (error) {
            console.error('Error updating bookmark', error);
            res.status(500).send('Error updating bookmark');
        }
    });
});

app.put("/addMovieBookmark", async (req, res) => {
    fs.readFile('userData.txt', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send('Error reading file');
        } try {
            const userId = data.trim();
            const movieId = req.body.movieId;
            if (!movieId) {
                return res.status(400).send('Movie ID is required');
            }
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                {
                    $push: { 'bookmark.0.movie': movieId }
                },
                { new: true, useFindAndModify: false }
            );
            if (!updatedUser) {
                return res.status(404).send('User not found');
            }
            // console.log(updatedUser.bookmark[0].movie);
            res.send('Bookmark updated successfully');
        } catch (error) {
            console.error('Error updating bookmark', error);
            res.status(500).send('Error updating bookmark');
        }
    });
});

app.put("/removeMovieBookmark", async (req, res) => {
    fs.readFile('userData.txt', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send('Error reading file');
        }
        try {
            const userId = data.trim();
            console.log(req.body.movieId);
            const movieId = req.body.movieId;
            if (!movieId) {
                return res.status(400).send('Movie ID is required');
            }
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            // Update the bookmark array using findByIdAndUpdate
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                {
                    $pull: { 'bookmark.0.movie': movieId }
                },
                { new: true, useFindAndModify: false }
            );
            if (!updatedUser) {
                return res.status(404).send('User not found');
            }
            res.send('Bookmark removed successfully');
        } catch (error) {
            console.error('Error updating bookmark', error);
            res.status(500).send('Error updating bookmark');
        }
    });
});

app.get("/getMovieBookmark", async (req, res) => {
    fs.readFile('userData.txt', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send('Error reading file');
        }
        try {
            const userId = data.trim();
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.send(user.bookmark[0].movie);
        } catch (error) {
            console.error('Error retrieving bookmarks', error);
            res.status(500).send('Error retrieving bookmarks');
        }
    });
});

app.get("/getTvSeriesBookmark", async (req, res) => {
    fs.readFile('userData.txt', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send('Error reading file');
        }
        try {
            const userId = data.trim();
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.send(user.bookmark[0].tvSeries);
        } catch (error) {
            console.error('Error retrieving bookmarks', error);
            res.status(500).send('Error retrieving bookmarks');
        }
    });
});

app.get("/usr", (req, res) => {

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

