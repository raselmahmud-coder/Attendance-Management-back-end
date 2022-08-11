require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { userPost, userGet, getStudents, updateStudent } = require("./Routes/userRoute");
const app = express();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("attendance management running the server");
});

app.listen(port, () => {
  console.log(`attendance management app listening on port ${port}`);
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(`${process.env.URI_DB}`, {
    connectTimeoutMS: 5000,
    dbName: `${process.env.DB_Name}`,
  });
  console.log("connected");
}
app.post("/user", userPost);
app.get("/students", getStudents);
app.put("/student", updateStudent);
app.get("/user-login", userGet);
