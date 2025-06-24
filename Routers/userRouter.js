const Router = require("express")
const router = new Router()
const controller = require("../Controllers/userController")
const roleMiddleware = require("../middleware/roleMiddleware")

router.put("/broadcastingGps", roleMiddleware(["USER"]), controller.broadcastingGps)

module.exports = router