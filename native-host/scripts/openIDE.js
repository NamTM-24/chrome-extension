const { exec } = require('child_process');

function openIDE(filePath) {
  const command = `code "${filePath}"`;
  console.error('Executing command:', command);
  exec(command, (error) => {
    if (error) {
      console.error("Error opening IDE:", error.message);
      return;
    }

    console.error('Opened in IDE:', filePath);
  });
}

module.exports = openIDE;