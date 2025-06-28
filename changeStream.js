const Alert = require("./models/Alert")
const broadcasts = new Set()

const setupChangeStream = () => {
  const changeStream = Alert.watch([
    {
      $match: {
        $or: [{ operationType: "insert" }],
      },
    },
  ])

  changeStream.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        handleInsert(change.fullDocument)
        break
    }
  })

  changeStream.on("error", (error) => {
    console.error("Ошибка в Change Stream:", error)
    setTimeout(() => setupChangeStream(), 5000)
  })

  const handleInsert = ({ username, coordinates, tel, date }) => {
    broadcasts.forEach((res) => {
      res.write(
        `data: ${JSON.stringify({ username, coordinates, tel, date })}\n\n`
      )
    })
  }
}

module.exports = {
  setupChangeStream,
  broadcasts,
}
