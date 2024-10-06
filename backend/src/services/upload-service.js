const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
const Result = require("../utils/result")

const UploadService = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter: (req, file, cb) => {
    // Validação de tipo de arquivo
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Result(false, "Tipo de arquivo não suportado!", null, null));
    }
  },
});

module.exports = UploadService;
