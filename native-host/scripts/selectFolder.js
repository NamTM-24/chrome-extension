const fileDialog = require('node-file-dialog');

async function selectFolder() {
  try {
    const openFileDialog = await fileDialog({
      type: 'directory'
    });

    if (openFileDialog && openFileDialog.length > 0) {
      return {
        success: true,
        path: openFileDialog[0]
      };
    } else {
      return {
        success: false,
        error: 'No folder selected'
      };
    }

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = selectFolder;