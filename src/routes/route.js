const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const WeatherController = require("../controllers/weatherController")
const MemeController = require("../controllers/memeController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
//Slot booking by District ID
router.get("/coWin/getByDistricts", CowinController.getbyDistricts)
//Slot booking via OTP
router.post("/cowin/getOtp", CowinController.getOtp)

//weather api
router.get('/getWeather', WeatherController.getWeather)
router.get('/tempOfLondon', WeatherController.tempOfLondon)
router.get('/tempOfCities', WeatherController.tempOfCities)

//meme api
router.get('/getMemes', MemeController.getMemes )
router.post('/createMemes', MemeController.createMemes)



module.exports = router;