
const multer = require("multer");


// module.exports = upload
module.exports = (destination)=>{

  // UPLOAD
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,  destination);
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + '-' +file.originalname )
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");
  return upload
}