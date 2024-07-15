const app = require("express")()


app.get("/",(req,res)=>{
    res.send("Home page for ent app")
})


app.listen(8080,()=>{
    console.log("listening on port 8080");
})

