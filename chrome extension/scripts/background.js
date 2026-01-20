// Listen messages from content.js
chrome.runtime.onMessage.addListener((message) => {
    console.log("check message" , message);

    if(message.action === 'openFile') {
        console.log("Forwarding to native host...");   
        /**
        * Gửi message tới ứng dụng native từ Chrome Extension
        * chrome.runtime.sendNativeMessage(application, message, responseCallback);
        * @param {string} application - Tên ứng dụng native đã đăng ký trên máy
        * @param {Object} message - Dữ liệu gửi đi, phải là object JSON
        * @param {function} [responseCallback] - Hàm nhận phản hồi từ native app (không bắt buộc)
        */

        chrome.runtime.sendNativeMessage(
            'com.weaverse.navigator',
             message,         
            (response) => {
                if(chrome.runtime.lastError) {
                    console.error("Erro" , chrome.runtime.lastError.message);
                }
                else {
                    console.log("Respone from app" , response);
                }
            }
        );
    }
});
console.log("Background script loaded!");