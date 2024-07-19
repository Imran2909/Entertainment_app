const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")

const userRouter = express.Router()

userRouter.post("/signup", (req, res) => {
    const { email, password, resetPassword } = req.body
    try {
        if (password !== resetPassword) {
            res.send("Password does not matched")
            return
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send({ "msg": error.message })
            } else {
                const user = new userModel({ email, password: hash, bookmark: [{ movie: [] }, { tvSeries: [] }] })
                await user.save()
                res.send({ "msg": "User Registered success" })
            }
        });
    } catch (error) {
        res.send({ "msg": error.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    console.log(user)
                    var token = jwt.sign({ foo: 'bar' }, "imran");
                    res.send({ "msg": "login successful", "token": token })
                }
                else {
                    res.send({ "msg": err.message })
                }
            });
        }
        else {
            res.send({ "msg": "err.message" })
        }
    } catch (error) {
        res.send({ "msg": error.message })
    }
})

module.exports = {
    userRouter
}

