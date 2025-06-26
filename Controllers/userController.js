const { secret } = require("../config")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

class userController {
  async broadcastingGps(req, res) {
    try {
      let latitude = parseFloat(req.body.latitude)
      let longitude = parseFloat(req.body.longitude)

      const token = req.headers.authorization

      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" })
      }
      let { id } = jwt.verify(token, secret)

      await User.findByIdAndUpdate(id, {
        $set: { coordinates: [latitude, longitude] },
      })
      res.status(200).json({ message: "GPS broadcasted" })
    } catch (e) {
      res.status(500).json({ error: "Broadcasting failed" })
    }
  }
}

module.exports = new userController()
