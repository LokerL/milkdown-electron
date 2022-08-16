import { app, BrowserWindow, shell, ipcMain, screen } from "electron";
import { release } from "os";
import { join } from "path";
import { getCurrentInstance } from "vue";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, "../.."),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
};

let win = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;
const indexHtml = join(ROOT_PATH.dist, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "Main window",
    width: 1020,
    height: 600,
    icon: join(ROOT_PATH.public, "favicon.ico"),
    frame: false,
    transparent: true,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    childWindow.loadURL(`${url}/#${arg}`);
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
});

// 退出程序
ipcMain.on("window-close", function () {
  app.quit();
});
// 最小化
ipcMain.on("window-minimize", function () {
  win.minimize();
});
// 全屏
ipcMain.on("window-maximize", function () {
  if (win.isFullScreen()) {
    win.setFullScreen(false);
  } else if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
  // win.setFullScreen(true);
});
// 退出全屏
ipcMain.on("window-unmaximize", function () {
  win.setFullScreen(false);
});

// 移动窗口----start
ipcMain.on("win-start", (event) => {
  const winPosition = win.getPosition();
  const cursorPosition = screen.getCursorScreenPoint();
  let x = cursorPosition.x - winPosition[0];
  let y = cursorPosition.y - winPosition[1];
  event.returnValue = JSON.stringify({ x, y });
});
ipcMain.on("win-move", (_, params) => {
  const param = JSON.parse(params);
  win.setPosition(param.x, param.y, true);
});
