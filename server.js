const express = require("express");

const PORT = 4000;

let app = express();
app.set('view engine', 'ejs')


// ROUTES DEFINITION
const userRouter = require("./routes/services");

app.use("/services", userRouter)

app.listen(process.env.PORT || PORT, function() {
    console.log("App listening on PORT " + PORT);
});