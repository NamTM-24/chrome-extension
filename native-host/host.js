const path = require('path');
// Import functions
const scanSections = require('./scripts/scanSections');
const openIDE = require('./scripts/openIDE');
const selectFolder = require('./scripts/selectFolder');

let chunks = [];
let messageLength = null;

process.stdin.on("data", (chunk) => {
  console.error("stdin received", chunk);

  chunks.push(chunk);
  const buffer = Buffer.concat(chunks);

  if (messageLength === null && buffer.length >= 4) {
    messageLength = buffer.readUInt32LE(0);
  }

  if (messageLength !== null && buffer.length >= 4 + messageLength) {
    const messageBuffer = buffer.slice(4, 4 + messageLength);

    const message = JSON.parse(messageBuffer.toString());

    handleMessage(message);

    chunks = [];
    messageLength = null;
  }
});

async function handleMessage(message) {
  if (message.action === 'selectFolder') {
    const result = await selectFolder();
    sendResponse(result);
    return;
  }

  if (message.action === "openFile") {
    try {
      const { displayName, projectPath } = message;

      // Scan sections
      const mappings = scanSections(projectPath);

      // Get file path
      const filePath = mappings[displayName];

      if (!filePath) {
        sendResponse({
          success: false,
          error: `Component "${displayName}" not found`
        });
        return;
      }

      const fullPath = path.join(projectPath, filePath);

      // Open in IDE
      openIDE(fullPath);

      sendResponse({
        success: true,
        filePath: filePath,
        opened: true
      });


    } catch (error) {
      sendResponse({
        success: false,
        error: error.message,
      });
    }
    return;
  }
};

//===============================================================================

function sendResponse(responseObject) {
  const message = JSON.stringify(responseObject);
  const messageLength = Buffer.byteLength(message);

  const header = Buffer.alloc(4);
  header.writeUInt32LE(messageLength, 0);

  process.stdout.write(header);
  process.stdout.write(message);

  console.error("Send response", responseObject);
};
