# 🚀 Weaverse Navigator

Extension Chrome giúp mở nhanh file component từ Weaverse Studio vào VSCode

---

## 📋 Mục Lục

- [Tính Năng](#-tính-năng)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt](#-cài-đặt)
  - [Windows](#windows)
  - [macOS](#macos)
  - [Linux](#linux)
- [Sử Dụng](#-sử-dụng)
- [Cấu Trúc Project](#-cấu-trúc-project)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Tính Năng

### 🎯 **Core Features:**

- ✅ **Ctrl+Click** trên component trong Weaverse Studio để mở file trong VSCode
- ✅ **Browse folder** để chọn project path (cross-platform)

### 🌍 **Cross-Platform:**

- ✅ Windows
- ✅ macOS
- ✅ Linux

---

## 💻 Yêu Cầu Hệ Thống

### **Bắt buộc:**

- ✅ Google Chrome (hoặc Chromium-based browser)
- ✅ Node.js (v14 trở lên)
- ✅ VSCode (hoặc IDE khác có command line)

### **Project:**

- ✅ Hydrogen storefront với Weaverse
- ✅ Cấu trúc: `app/sections/` folder

---

## 📦 Cài Đặt

> **📚 Tài liệu tham khảo:**
>
> - [Chrome Extension Development](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
> - [Native Messaging](https://developer.chrome.com/docs/extensions/mv3/nativeMessaging/)

---

### **Bước 1: Load Extension**

1. Mở Chrome
2. Vào `chrome://extensions/`
3. Bật **Developer mode** (góc trên bên phải)
4. Click **Load unpacked**
5. Chọn folder `chrome extension`
6. Extension sẽ xuất hiện với một **Extension ID** (dạng: `abcdefghijklmnopqrstuvwxyz123456`)

> **📖 Chi tiết:** [Load an unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

---

### **Bước 2: Lấy Extension ID**

1. Trong trang `chrome://extensions/`
2. Tìm **Weaverse Navigator**
3. **Copy Extension ID** (dưới tên extension)
   - Ví dụ: `fhlahlicodjbleodoifbjipnaejkbhij`

> **⚠️ Quan trọng:** Extension ID này cần thiết cho Native Host!

---

### **Bước 3: Cấu Hình Extension ID**

**Mở và sửa các file manifest sau:**

#### **Windows:**

File: `native-host/windows/manifest.json`

```json
{
  "allowed_origins": ["chrome-extension://YOUR_EXTENSION_ID_HERE/"]
}
```

#### **macOS:**

File: `native-host/macos/manifest.json`

```json
{
  "allowed_origins": ["chrome-extension://YOUR_EXTENSION_ID_HERE/"]
}
```

#### **Linux:**

File: `native-host/linux/manifest.json`

```json
{
  "allowed_origins": ["chrome-extension://YOUR_EXTENSION_ID_HERE/"]
}
```

**Thay `YOUR_EXTENSION_ID_HERE` bằng Extension ID bạn vừa copy.**

> **📖 Chi tiết:** [Native Messaging Host](https://developer.chrome.com/docs/extensions/mv3/nativeMessaging/#native-messaging-host)

---

### **Bước 4: Cài Native Host**

#### **Windows**

```bash
# 1. Cài dependencies
cd native-host
npm install

# 2. Chạy install script
cd windows
install.bat
```

**Lưu ý:** Cần chạy với quyền Administrator nếu gặp lỗi registry.

---

#### **macOS**

```bash
# 1. Cài dependencies
cd native-host
npm install

# 2. Chạy install script
cd macos
chmod +x install.sh
./install.sh
```

---

#### **Linux**

```bash
# 1. Cài dependencies
cd native-host
npm install

# 2. Chạy install script
cd linux
chmod +x install.sh
./install.sh
```

---

## 🎮 Sử Dụng

### **Bước 1: Cấu Hình Project Path**

1. Click icon extension trên Chrome toolbar
2. Click nút **Browse** để chọn project folder
3. Hoặc nhập path thủ công
4. Click **Save**

**Ví dụ paths hợp lệ:**

```
✅ D:\my-hydrogen-storefront
✅ D:\my-hydrogen-storefront\app
✅ D:\my-hydrogen-storefront\app\sections
```

---

### **Bước 2: Sử Dụng Trong Weaverse Studio**

1. Vào [Weaverse Studio](https://studio.weaverse.io/)
2. Mở project của bạn
3. **Ctrl+Click** (hoặc **Cmd+Click** trên Mac) vào bất kỳ component nào
4. VSCode sẽ tự động mở file component đó

---

## 📁 Cấu Trúc Project

```
Final/
├── chrome extension/          # Chrome Extension
│   ├── manifest.json         # Extension config
│   ├── popup.html/css/js     # Popup UI
│   ├── scripts/
│   │   ├── content.js        # Ctrl+Click detection
│   │   └── background.js     # Native messaging
│   └── images/
│
├── native-host/              # Native Host
│   ├── host.js              # Main entry point
│   ├── scripts/
│   │   ├── scanSections.js  # Scan components logic
│   │   ├── openIDE.js       # Open VSCode
│   │   └── selectFolder.js  # Folder picker
│   ├── windows/             # Windows setup
│   │   ├── host.bat
│   │   ├── manifest.json
│   │   └── install.bat
│   ├── macos/               # macOS setup
│   │   ├── host.sh
│   │   ├── manifest.json
│   │   └── install.sh
│   └── linux/               # Linux setup
│       ├── host.sh
│       ├── manifest.json
│       └── install.sh
│
└── README.md                # File này
```

---

## 🔧 Troubleshooting

### **❌ Native Host không kết nối**

**Windows:**

```bash
# Kiểm tra registry
reg query "HKCU\Software\Google\Chrome\NativeMessagingHosts\com.weaverse.navigator"

# Nếu không có, chạy lại install.bat
cd native-host/windows
install.bat
```

**macOS/Linux:**

```bash
# Kiểm tra manifest file
cat ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts/com.weaverse.navigator.json  # macOS
cat ~/.config/google-chrome/NativeMessagingHosts/com.weaverse.navigator.json  # Linux

# Nếu không có, chạy lại install.sh
cd native-host/macos  # hoặc linux
./install.sh
```

---

### **❌ Folder picker không mở**

**Nguyên nhân:**

- Thiếu dependency `node-file-dialog`

**Giải pháp:**

```bash
cd native-host
npm install
```
