// load save path
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['projectPath'] , (res) => {
        if(res.projectPath) {
            document.getElementById('projectPath').value = res.projectPath;
        }
    });
});

// save
document.getElementById('save').addEventListener('click' , () => {
    const projectPath = document.getElementById('projectPath').value.trim();

    if(!projectPath){
        return;
    }
    // save local storage chrome
    chrome.storage.local.set({ projectPath });
});

// browse
document.getElementById('browse').addEventListener('click' , () => {
    // send message to nativehost
    chrome.runtime.sendNativeMessage(
        'com.weaverse.navigator',

        { action: 'selectFolder'},

        (response) => {
            if(chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }

            if(response && response.success && response.path) {
                document.getElementById('projectPath').value = response.path;
            }
        }
    )
});

