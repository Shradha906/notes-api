const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const notesRoutes = require("./routes/note");
const app = express();
app.use(cors());

app.use(express.json());



app.get("/", (req, res) => {
    res.send("Notes API Running");
});

app.use("/notes", notesRoutes);


pool.connect()
    .then(() => {
        console.log("✅ PostgreSQL Connected");
    })
    .catch((err) => {
        console.log(err.message);
    });
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
}); 