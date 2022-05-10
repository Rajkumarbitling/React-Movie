const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const path = require('path')

dotenv.config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

main().then(console.log("Db connected"))

app.use(express.json());

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/lists", listRoute)

if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "/admin/build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/admin/build', 'index.html'));
});
}
app.listen(process.env.PORT || 8800, () => {
    console.log("Server is up and running");
})