# Fenace Madrasah

Kas logistik (LPJ) + sistem seragam madrasah. Offline, tanpa server. BY. Mbahjimut

## Cara dapat file .exe (otomatis lewat GitHub)
1. Upload seluruh isi folder ini ke repository GitHub (termasuk folder `.github`).
2. Buka tab **Actions** -> **Build EXE Windows (portable x64)** -> **Run workflow**.
3. Tunggu ±3-5 menit, lalu unduh `Fenace-Madrasah-Portable-x64` dari bagian **Artifacts**.
   (Kalau membuat tag, misalnya `v1.1.0`, file .exe otomatis terlampir di **Releases**.)

## Cara pakai .exe
- Klik dua kali, tanpa instal, tanpa internet.
- Data tersimpan di folder `DataFenace` di samping file .exe. Salin folder itu bersama .exe untuk pindah komputer, dan tetap rutin unduh cadangan .json dari menu Atur.
- Windows SmartScreen bisa memberi peringatan karena belum bertanda tangan digital: klik *More info* -> *Run anyway*.

## Build manual di komputer sendiri
```
npm install
npm start      # jalankan versi uji
npm run dist   # hasil: dist/Fenace-Madrasah-Portable-x64.exe
```
Aplikasinya ada di `src/index.html` (satu file); `main.js` hanya pembungkus Electron.
