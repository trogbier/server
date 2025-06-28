const Router = require("express")
const router = new Router()
const roleMiddleware = require("../middleware/roleMiddleware")
const controller = require("../Controllers/adminController")

router.get(
  "/adminBroadcasting",
  roleMiddleware(["ADMIN"]),
  controller.broadcastingAdmin
)

module.exports = router
