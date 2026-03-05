@echo off
chcp 65001 > nul

echo 현재 경로:
cd

echo index.js 존재 여부:
dir index.js

echo node 실행 시작
node "%~dp0index.js"
echo node 실행 끝

pause
