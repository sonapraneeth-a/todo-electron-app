// C:\Users\sdkca\Desktop\electron-workspace\build.js
var electronInstaller = require("electron-winstaller");
// Reference: https://ourcodeworld.com/articles/read/365/how-to-create-a-windows-installer-for-an-application-built-with-electron-framework
// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: "./build/ElectronApp-win32-x64",
    // Specify the existing folder where 
    outputDirectory: "./installers",
    // The name of the Author of the app (the name of your company)
    authors: "Sona Praneeth Akula",
    // The name of the executable of your built
    exe: "./ElectronApp.exe"
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});