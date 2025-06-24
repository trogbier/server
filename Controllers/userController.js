
class userController {
  async broadcastingGps(req, res) {
    try {
      res.status(200).json({ message: "GPS broadcasted" })
    } catch (e) {
      console.log("Broadcast error:", e)
      res.status(500).json({ error: "Broadcasting failed" })
    }
  }
}

module.exports = new userController()
