///
/// logging-service.js
///

function logMessage(message) {
  console.log("message: " + message);
}

function logException(ex) {
  console.log("exception: " + ex);
}

const exported = {
  logMessage,
  logException,
};

export default exported;
