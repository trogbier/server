const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
const { secret } = require("../config")

const generateAccessToken = (id, roles, username) => {
  const payload = {
    id,
    roles,
    username,
  }
  return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors })
      }
      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({ value: "USER" })
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      })
      await user.save()
      return res.json({ message: "Пользователь успешно зарегистрирован" })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Ошибка регистрации" })
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` })
      }

      const token = generateAccessToken(user._id, user.roles, username)
      let siteRoute = "index.html"

      if (user.roles == "ADMIN") {
        siteRoute = "admin.html"
      }
      return res.json({ token, siteRoute })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Ошибка авторизации" })
    }
  }
}

module.exports = new authController()
