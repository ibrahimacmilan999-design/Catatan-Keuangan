# Catatan Keuangan Pribadi

Aplikasi web pencatatan keuangan pribadi (dashboard, transaksi, rekening,
anggaran, utang/piutang, tabungan & investasi, laporan tahunan). Data
tersimpan di browser masing-masing perangkat (`localStorage`) — bukan di
server, jadi tidak dibagikan ke siapapun.

## Coba dulu di komputer (opsional)

Butuh [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya `http://localhost:5173`).

## Cara menerbitkan (paling mudah: Vercel)

1. Buat akun gratis di [vercel.com](https://vercel.com) (bisa login pakai
   GitHub/Google).
2. Upload folder proyek ini ke **GitHub** (buat repo baru, upload semua
   file/folder di sini), atau pakai [Vercel CLI](https://vercel.com/docs/cli):
   ```bash
   npm install -g vercel
   vercel
   ```
3. Kalau lewat website Vercel: klik **Add New → Project**, pilih repo GitHub
   yang tadi dibuat, biarkan pengaturan default (Vercel otomatis mengenali
   proyek Vite), klik **Deploy**.
4. Setelah selesai (biasanya 1–2 menit), Vercel memberi alamat seperti
   `https://catatan-keuangan-pribadi.vercel.app` — itu aplikasi kamu sudah
   online.

## Alternatif: Netlify (drag & drop, tanpa GitHub)

1. Jalankan build dulu di komputer:
   ```bash
   npm install
   npm run build
   ```
   Ini akan membuat folder `dist/`.
2. Buka [app.netlify.com/drop](https://app.netlify.com/drop), lalu
   **drag & drop** folder `dist` ke halaman tersebut.
3. Netlify langsung memberi alamat online dalam beberapa detik.

## Menambahkan ke layar utama HP (opsional, terasa seperti aplikasi)

Setelah alamat online-nya jadi, buka di browser HP (Chrome/Safari), lalu pilih
menu **"Tambahkan ke Layar Utama" / "Add to Home Screen"**. Ikon aplikasi akan
muncul di layar utama seperti aplikasi biasa.

## Catatan penting

- Data disimpan per **perangkat & browser** (localStorage). Buka di HP lain
  akan mulai dari data awal (data contoh dari file Excel), bukan data yang
  sama dengan di HP pertama.
- Kalau ingin data tersinkron di banyak perangkat, aplikasi ini perlu
  ditambah database (misalnya Firebase/Supabase) — bisa dibantu kalau
  dibutuhkan nanti.
