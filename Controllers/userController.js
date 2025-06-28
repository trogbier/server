const { secret } = require("../config")
const jwt = require("jsonwebtoken")
const Alert = require("../models/Alert")

class userController {
  async broadcastingGps(req, res) {
    try {
      let latitude = parseFloat(req.body.latitude)
      let longitude = parseFloat(req.body.longitude)

      const token = req.headers.authorization

      let { username } = jwt.verify(token, secret)
      const alert = new Alert({
        username,
        coordinates: [latitude, longitude],
        tel: 89885882166,
      })
      await alert.save()
      res.status(200).json({ message: "GPS broadcasted" })
    } catch (e) {
      res.status(500).json({ error: "Broadcasting failed" })
    }
  }
}

module.exports = new userController()
