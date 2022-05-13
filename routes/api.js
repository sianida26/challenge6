var express = require('express');
var multer = require('multer');
var router = express.Router();
var multer = require('multer');

var authController = require('../controllers/AuthController');
var carController = require('../controllers/CarController');

// file upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/images'),
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${Math.floor(Math.random()*1E6)}.${file.originalname.split('.').pop()}`; //random filename
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/createAdmin', authController.createAdmin);
router.get('/getAllUsers', authController.getAllUsers);
router.get('/whoAmI', authController.whoAmI);

router.get('/cars/all', carController.getAllCars);
router.post('/cars/create', upload.single('image'), carController.createCar);
router.post('/cars/update', upload.single('image'), carController.updateCar);
router.post('/cars/delete', carController.deleteCar);


module.exports = router;
