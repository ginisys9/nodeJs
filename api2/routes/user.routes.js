var express = require("express"),
  router = express.Router(),
  User = require("../models/user.models"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken");
dotenv = require("dotenv");
dotenv.config();

router.post("/register", async (req, res) => {
  try {
    var { username, email, password } = req.body,
      existUser = await User.findOne({
        $or: [{ username }, { email }],
      });
    if (existUser)
      return res
        .status(400)
        .json({ message: "Username or email already exist" });
    var hashPass = await bcrypt.hash(password, 10),
      user = new User({ username, email, password: hashPass });
    savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    var { username, password } = req.body,
      user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User are not found" });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    var token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({message:error.message})
  }
});
router.post("/logout", async (req, res) => {

    res.json({message:"logged out successfully"})
});
module.exports = router;
