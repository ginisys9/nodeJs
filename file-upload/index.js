const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
/**
 * ! file Upload Method
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    var newFile = Date.now() + path.extname(file.originalname);
    cb(null, newFile);
  },
});

const fileFilter = function (req, file, cb) {
  // const isImage = file.mimetype.startsWith("image/");
   if (file.fieldname=== "userfile") {
    const isImage = file.mimetype == "image/jpg" || file.mimetype == "image/png";
  if (isImage) {
    cb(null, true);
  } else {
    cb(new Error("only Images are allowed"), false);
  }
   }
   else if(file.fieldname==="userdocs")
   {
    const isPdf = file.mimetype == "application/pdf";
    if (isPdf) {
      cb(null, true);
    } else {
      cb(new Error("only Pdf are allowed"), false);
    }
   }
  else{
    cb(new Error("unknown fields"), false);
   }

  
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: fileFilter,
});

app.get("/", (req, res) => {
  res.render("myForm");
});
/**
 *  
 */

app.post(
  "/saveForm",
  upload.fields([
    {name:"userfile",maxCount:1},
    {name:"userdocs",maxCount:3}
  ]),
  function (req, res) {
    if (!req.files || req.files.length === 0) {
      res.status(400).send("no file are upload");
    }
    res.send(req.files);
  }
);

/**
 * ! for the multiple file are upload 
 * ! upload.array("userfile",3)


app.post(
  "/saveForm",
  upload.array("userfile",3),
  function (req, res) {
    if (!req.files || req.files.length === 0) {
      res.status(400).send("no file are upload");
    }
    res.send(req.files);
  }
);
*/
/**
 * ! this is the single file uploader
app.post(
  "/saveForm",
  upload.single("userfile"),
  function (req, res) {
    if (!req.files || req.file.length === 0) {
      res.status(400).send("no file are upload");
    }
    res.send(req.file.filename);
  }
);
 * 
 */
const errMiddleware = function (error, req, res, next) {
    if (error instanceof multer.MulterError) {
       if(error.code === "LIMIT_UNEXPECTED_FILE")
       {
         return res.status(400).send("Error: Too many files are uploaded")
       }
      return res.status(400).send(`Multer Error: ${error.message}:${error.code}`);
    } else if (error) {
      return res.status(500).send(`someThing went wrong: ${error.message}`);
    }
    next();
  };
app.use(errMiddleware)
app.listen(3000, () => console.log("server are running"));
