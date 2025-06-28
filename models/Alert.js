const { Schema, model } = require("mongoose")

const Alert = new Schema({
  username: { type: String },
  date: { type: Date, default: Date.now },
  coordinates: { type: [Number] },
  tel: { type: Number },
})

module.exports = model("Alert", Alert)
