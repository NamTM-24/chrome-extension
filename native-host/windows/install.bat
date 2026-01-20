@echo off
echo ========================================
echo Installing Weaverse Navigator Native Host
echo ========================================

echo.
REM Register with chrome
REG ADD "HKCU\Software\Google\Chrome\NativeMessagingHosts\com.weaverse.navigator" /ve /t REG_SZ /d "D:\WeaverseTraining\Final\native-host\windows\manifest.json" /f

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.

echo Native Host has been registered with Chrome.
echo You can now use Weaverse Navigator extension.
echo.

pause
