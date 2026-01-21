var express = require("express"),
  app = express();
const { body, validationResult } = require("express-validator");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const validRegister = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 character length")
    .trim()
    .isAlpha()
    .withMessage("userName must contain only the letters")
    .custom(function (value) {
      if (value === "admin") {
        throw new Error('userName "admin" is not allowed');
      }
      return true;
    })
    .customSanitizer(function (value) {
      return value.toLowerCase();
    }),

  body("useremail")
    .isEmail()
    .withMessage("please provide a valid email id")
    .normalizeEmail(),

  body("userpass")
    .isLength({ min: 3, max: 10 })
    .withMessage("Username must be at least 3 character")
    .isStrongPassword()
    .withMessage("password must be strong"),

  body("userage")
    .isNumeric()
    .withMessage("age must be numeric")
    .isInt({ min: 18 })
    .withMessage("age must be at least 18 Years old"),

  body("usercity")
    .isIn(["Delhi", "Noida", "Goa", "Mumbai", "Agra"])
    .withMessage("City must be in the feild"),
];

app.get("/", function (req, res) {
  res.render("myForm", { myError: 0 });
});
app.post("/saveForm", validRegister, function (req, res) {
  const error = validationResult(req);
  if (error.isEmpty()) {
    res.send(req.body);
  }
  res.render("myForm", { myError: error.array() });
});
app.listen(3000, function () {
  console.log("server are started");
});
