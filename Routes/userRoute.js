const { default: mongoose } = require("mongoose");
const usersSchema = require("../schema/schema");
const bcrypt = require("bcrypt");
const Users = mongoose.model("users", usersSchema);
const userPost = async (req, res, next) => {
  try {
    const { name, email, role, password: plainPassword } = req.body;
    const password = await bcrypt.hash(plainPassword, 10);
    const user = new Users({ name, email, role, password });
    await user.save();
    res.status(200).send({ success: "you have successfully added" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "sorry! can't perform this action" });
  }
};

const getStudents = async (req, res) => {
  try {
    const result = await Users.find({ role: "student" });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "sorry! can't perform this action" });
  }
};
const updateStudent = async (req, res) => {
  try {
    const { id, toggle } = req.body;
    console.log(id, toggle);

    const result = await Users.findOneAndUpdate(
      { _id: id },
      { $set: { present: toggle ? true : false } },
      { upsert: true, new: true },
    );
    console.log(result.present);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "sorry! can't perform this action" });
  }
};

const userGet = async (req, res) => {
  try {
    const { email, password: plainPassword } = JSON.parse(req.headers.data);
    const { password: hashPassword, role } = await Users.findOne({ email });
    const passwordInfo = await bcrypt.compare(plainPassword, hashPassword);
    if (passwordInfo) {
      res.status(200).send({ token: `${process.env.secret_token}`, role });
    } else {
      res.status(404).send({ error: "sorry! could not found user" });
    }
  } catch (error) {
    res.status(500).send({ error: "There was an error!" });
  }
};

module.exports = { userPost, userGet, getStudents, updateStudent };
