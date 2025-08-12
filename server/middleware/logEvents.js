const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

const logEvents = async (message, fileName) => {
  const logsDir = path.join(__dirname, "..", "logs");
  const logsPath = path.join(logsDir, fileName);
  const logDate = format(new Date(), "yyyy-MM-dd\thh:mm:ss"); // Print Date and Time of the Event
  const logsItem = `${logDate}\t${uuidv4()}\t${message}\n\n`; // format Date, Time and the Message for the event

  try {
    if (!fs.existsSync(logsDir)) {
      fsPromises.mkdir(logsDir, { recursive: true });
    }
    await fsPromises.appendFile(logsPath, logsItem);
  } catch (err) {
    console.log(err);
  }
};
const logger = async (req, res, next) => {
  logEvents(`${req.method} ${req.origin} ${req.url}`, "reqLog.txt");
  next();
};
module.exports = { logEvents, logger };
