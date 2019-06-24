function init() {}

function logMessage(message) {
  console.log("message: " + message);
}

function logException(ex) {
  console.log("exception: " + ex);
}

export default {
  init,
  logMessage,
  logException
};
