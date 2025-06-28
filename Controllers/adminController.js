const { setupChangeStream, broadcasts } = require("../changeStream")

class adminController {
  async broadcastingAdmin(req, res) {
    try {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*", // Если нужен CORS
      })

      // Добавляем ответ в набор активных подключений
      broadcasts.add(res)

      // Закрываем соединение при завершении
      req.on("close", () => {
        broadcasts.delete(res)
        res.end()
      })

      // Таймаут для keep-alive
      setInterval(() => {
        res.write(": keep-alive\n\n")
      }, 30000)
    } catch (e) {
      console.error("Ошибка SSE:", e)
      res.end()
    }
  }
}

module.exports = new adminController()
