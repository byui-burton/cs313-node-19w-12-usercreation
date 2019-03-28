const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/register", handleRegister);

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});

///////// Below here in a separate file... /////
function handleRegister(request, response) {
    const username = request.body.username;
    const password = request.body.password;

    console.log(`Registering new user: ${username}:${password}`);

    response.redirect("home.html");
}
