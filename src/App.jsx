import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  LayoutDashboard, Receipt, Wallet, PieChart as PieChartIcon, HandCoins,
  PiggyBank, TrendingUp, Plus, X, Trash2, ArrowRightLeft, ArrowDownCircle,
  ArrowUpCircle, Search, ChevronDown, ChevronRight, CheckCircle2, Circle,
  BadgeDollarSign, Undo2, Redo2
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, LineChart, Line
} from "recharts";

/* ============================== SEED DATA ============================== */
const SEED_TRANSAKSI = [{"no": 1, "tanggal": "2026-01-01", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": "dari toko", "jumlah": 8000, "saldo_setelah": 132000, "ref_id": null}, {"no": 2, "tanggal": "2026-01-02", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 136000, "ref_id": null}, {"no": 3, "tanggal": "2026-01-02", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 20000, "saldo_setelah": 116000, "ref_id": null}, {"no": 4, "tanggal": "2026-01-02", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 112000, "ref_id": null}, {"no": 5, "tanggal": "2026-01-03", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 2500, "saldo_setelah": 467673, "ref_id": null}, {"no": 6, "tanggal": "2026-01-03", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 8000, "saldo_setelah": 122500, "ref_id": null}, {"no": 7, "tanggal": "2026-01-03", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 16500, "saldo_setelah": 106000, "ref_id": null}, {"no": 8, "tanggal": "2026-01-04", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Pendapatan Lain", "keterangan": null, "jumlah": 5000, "saldo_setelah": 111000, "ref_id": null}, {"no": 9, "tanggal": "2026-01-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 13000, "saldo_setelah": 124000, "ref_id": null}, {"no": 10, "tanggal": "2026-01-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 9000, "saldo_setelah": 115000, "ref_id": null}, {"no": 11, "tanggal": "2026-01-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 90000, "ref_id": null}, {"no": 12, "tanggal": "2026-01-06", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 102500, "saldo_setelah": 365173, "ref_id": null}, {"no": 13, "tanggal": "2026-01-06", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 197500, "ref_id": null}, {"no": 14, "tanggal": "2026-01-06", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Hiburan", "keterangan": "beli kaca mata", "jumlah": 27500, "saldo_setelah": 170000, "ref_id": null}, {"no": 15, "tanggal": "2026-01-06", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 145000, "ref_id": null}, {"no": 16, "tanggal": "2026-01-06", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 20000, "saldo_setelah": 125000, "ref_id": null}, {"no": 17, "tanggal": "2026-01-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 10000, "saldo_setelah": 115000, "ref_id": null}, {"no": 18, "tanggal": "2026-01-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 30000, "saldo_setelah": 85000, "ref_id": null}, {"no": 19, "tanggal": "2026-01-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 15000, "saldo_setelah": 70000, "ref_id": null}, {"no": 20, "tanggal": "2026-01-08", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 6000, "saldo_setelah": 76000, "ref_id": null}, {"no": 21, "tanggal": "2026-01-08", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 51000, "ref_id": null}, {"no": 22, "tanggal": "2026-01-08", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 10000, "saldo_setelah": 41000, "ref_id": null}, {"no": 23, "tanggal": "2026-01-09", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 100000, "saldo_setelah": 265173, "ref_id": null}, {"no": 24, "tanggal": "2026-01-09", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 9000, "saldo_setelah": 150000, "ref_id": null}, {"no": 25, "tanggal": "2026-01-09", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 20000, "saldo_setelah": 130000, "ref_id": null}, {"no": 26, "tanggal": "2026-01-09", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 8000, "saldo_setelah": 122000, "ref_id": null}, {"no": 27, "tanggal": "2026-01-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 17000, "saldo_setelah": 139000, "ref_id": null}, {"no": 28, "tanggal": "2026-01-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 10000, "saldo_setelah": 129000, "ref_id": null}, {"no": 29, "tanggal": "2026-01-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 30000, "saldo_setelah": 99000, "ref_id": null}, {"no": 30, "tanggal": "2026-01-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 16000, "saldo_setelah": 83000, "ref_id": null}, {"no": 31, "tanggal": "2026-01-13", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 22000, "saldo_setelah": 243173, "ref_id": null}, {"no": 32, "tanggal": "2026-01-13", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 80000, "ref_id": null}, {"no": 33, "tanggal": "2026-01-13", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 8000, "saldo_setelah": 72000, "ref_id": null}, {"no": 34, "tanggal": "2026-01-14", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 50000, "saldo_setelah": 193173, "ref_id": null}, {"no": 35, "tanggal": "2026-01-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 9000, "saldo_setelah": 131000, "ref_id": null}, {"no": 36, "tanggal": "2026-01-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Paket Data/Pulsa", "keterangan": null, "jumlah": 70000, "saldo_setelah": 61000, "ref_id": null}, {"no": 37, "tanggal": "2026-01-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 57000, "ref_id": null}, {"no": 38, "tanggal": "2026-01-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 32000, "ref_id": null}, {"no": 39, "tanggal": "2026-01-15", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 115000, "saldo_setelah": 78173, "ref_id": null}, {"no": 40, "tanggal": "2026-01-15", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 16000, "saldo_setelah": 163000, "ref_id": null}, {"no": 41, "tanggal": "2026-01-15", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 15000, "saldo_setelah": 148000, "ref_id": null}, {"no": 42, "tanggal": "2026-01-15", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 123000, "ref_id": null}, {"no": 43, "tanggal": "2026-01-15", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 8000, "saldo_setelah": 115000, "ref_id": null}, {"no": 44, "tanggal": "2026-01-16", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 20000, "saldo_setelah": 58173, "ref_id": null}, {"no": 45, "tanggal": "2026-01-16", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 140000, "ref_id": null}, {"no": 46, "tanggal": "2026-01-16", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 20000, "saldo_setelah": 120000, "ref_id": null}, {"no": 47, "tanggal": "2026-01-17", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 13000, "saldo_setelah": 133000, "ref_id": null}, {"no": 48, "tanggal": "2026-01-17", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 128000, "ref_id": null}, {"no": 49, "tanggal": "2026-01-18", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 7000, "saldo_setelah": 135000, "ref_id": null}, {"no": 50, "tanggal": "2026-01-19", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 110000, "ref_id": null}, {"no": 51, "tanggal": "2026-01-19", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 105000, "ref_id": null}, {"no": 52, "tanggal": "2026-01-20", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 5500, "saldo_setelah": 99500, "ref_id": null}, {"no": 53, "tanggal": "2026-01-20", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 74500, "ref_id": null}, {"no": 54, "tanggal": "2026-01-20", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 70500, "ref_id": null}, {"no": 55, "tanggal": "2026-01-20", "rekening_asal": "BRI Britama", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 5500, "saldo_setelah": 48523, "ref_id": null}, {"no": 56, "tanggal": "2026-01-21", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 15000, "saldo_setelah": 91000, "ref_id": null}, {"no": 57, "tanggal": "2026-01-21", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 66000, "ref_id": null}, {"no": 58, "tanggal": "2026-01-21", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 61000, "ref_id": null}, {"no": 59, "tanggal": "2026-01-22", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 35000, "saldo_setelah": 23173, "ref_id": null}, {"no": 60, "tanggal": "2026-01-22", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 100000, "ref_id": null}, {"no": 61, "tanggal": "2026-01-22", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 75000, "ref_id": null}, {"no": 62, "tanggal": "2026-01-22", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 8000, "saldo_setelah": 67000, "ref_id": null}, {"no": 63, "tanggal": "2026-01-23", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 72000, "ref_id": null}, {"no": 64, "tanggal": "2026-01-23", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 47000, "ref_id": null}, {"no": 65, "tanggal": "2026-01-23", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 43000, "ref_id": null}, {"no": 66, "tanggal": "2026-01-24", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 47000, "ref_id": null}, {"no": 67, "tanggal": "2026-01-24", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 42000, "ref_id": null}, {"no": 68, "tanggal": "2026-01-25", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 47000, "ref_id": null}, {"no": 69, "tanggal": "2026-01-25", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 42000, "ref_id": null}, {"no": 70, "tanggal": "2026-01-26", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 46000, "ref_id": null}, {"no": 71, "tanggal": "2026-01-26", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 7000, "saldo_setelah": 39000, "ref_id": null}, {"no": 72, "tanggal": "2026-01-26", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 14000, "ref_id": null}, {"no": 73, "tanggal": "2026-01-26", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 9000, "ref_id": null}, {"no": 74, "tanggal": "2026-01-27", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 13000, "ref_id": null}, {"no": 75, "tanggal": "2026-01-27", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": -12000, "ref_id": null}, {"no": 76, "tanggal": "2026-01-27", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 9000, "saldo_setelah": -21000, "ref_id": null}, {"no": 77, "tanggal": "2026-01-28", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": -46000, "ref_id": null}, {"no": 78, "tanggal": "2026-01-28", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": -50000, "ref_id": null}, {"no": 79, "tanggal": "2026-01-29", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": -46000, "ref_id": null}, {"no": 80, "tanggal": "2026-01-29", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": -71000, "ref_id": null}, {"no": 81, "tanggal": "2026-01-29", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 9000, "saldo_setelah": -80000, "ref_id": null}, {"no": 82, "tanggal": "2026-01-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 8000, "saldo_setelah": -88000, "ref_id": null}, {"no": 83, "tanggal": "2026-01-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": -113000, "ref_id": null}, {"no": 84, "tanggal": "2026-01-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 10000, "saldo_setelah": -123000, "ref_id": null}, {"no": 85, "tanggal": "2026-01-31", "rekening_asal": "BCA", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Gaji", "keterangan": "gajian wilux", "jumlah": 3170000, "saldo_setelah": 3193173, "ref_id": null}, {"no": 86, "tanggal": "2026-01-31", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 1300000, "saldo_setelah": 1893173, "ref_id": null}, {"no": 87, "tanggal": "2026-01-31", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Jatah Orang Tua", "keterangan": null, "jumlah": 550000, "saldo_setelah": 627000, "ref_id": null}, {"no": 88, "tanggal": "2026-01-31", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 7000, "saldo_setelah": 620000, "ref_id": null}, {"no": 89, "tanggal": "2026-02-01", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 102500, "saldo_setelah": 1790673, "ref_id": null}, {"no": 90, "tanggal": "2026-02-01", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 726500, "ref_id": null}, {"no": 91, "tanggal": "2026-02-01", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Jatah Orang Tua", "keterangan": null, "jumlah": 102500, "saldo_setelah": 624000, "ref_id": null}, {"no": 92, "tanggal": "2026-02-01", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 620000, "ref_id": null}, {"no": 93, "tanggal": "2026-02-01", "rekening_asal": "Tunai (Cash)", "jenis": "Piutang", "rekening_tujuan": null, "kategori": "Uang Dipinjam", "keterangan": "di pinjam ajeng", "jumlah": 100000, "saldo_setelah": 520000, "ref_id": 1}, {"no": 94, "tanggal": "2026-02-02", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 400000, "saldo_setelah": 1390673, "ref_id": null}, {"no": 95, "tanggal": "2026-02-02", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Servis Sepeda", "keterangan": null, "jumlah": 463000, "saldo_setelah": 457000, "ref_id": null}, {"no": 96, "tanggal": "2026-02-03", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Barang Pribadi", "keterangan": "beli sepatu zevma", "jumlah": 165000, "saldo_setelah": 292000, "ref_id": null}, {"no": 97, "tanggal": "2026-02-03", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 267000, "ref_id": null}, {"no": 98, "tanggal": "2026-02-04", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Perawatan Diri", "keterangan": "cukur", "jumlah": 20000, "saldo_setelah": 247000, "ref_id": null}, {"no": 99, "tanggal": "2026-02-06", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 10000, "saldo_setelah": 1380673, "ref_id": null}, {"no": 100, "tanggal": "2026-02-06", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Jatah Orang Tua", "keterangan": null, "jumlah": 110000, "saldo_setelah": 147000, "ref_id": null}, {"no": 101, "tanggal": "2026-02-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 14000, "saldo_setelah": 161000, "ref_id": null}, {"no": 102, "tanggal": "2026-02-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 35000, "saldo_setelah": 126000, "ref_id": null}, {"no": 103, "tanggal": "2026-02-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 101000, "ref_id": null}, {"no": 104, "tanggal": "2026-02-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 97000, "ref_id": null}, {"no": 105, "tanggal": "2026-02-08", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 101000, "ref_id": null}, {"no": 106, "tanggal": "2026-02-10", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 20000, "saldo_setelah": 81000, "ref_id": null}, {"no": 107, "tanggal": "2026-02-11", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 65000, "saldo_setelah": 1315673, "ref_id": null}, {"no": 108, "tanggal": "2026-02-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Paket Data/Pulsa", "keterangan": null, "jumlah": 65000, "saldo_setelah": 81000, "ref_id": null}, {"no": 109, "tanggal": "2026-02-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 8000, "saldo_setelah": 73000, "ref_id": null}, {"no": 110, "tanggal": "2026-02-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 78000, "ref_id": null}, {"no": 111, "tanggal": "2026-02-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 8000, "saldo_setelah": 70000, "ref_id": null}, {"no": 112, "tanggal": "2026-02-13", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 100000, "saldo_setelah": 1215673, "ref_id": null}, {"no": 113, "tanggal": "2026-02-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 145000, "ref_id": null}, {"no": 114, "tanggal": "2026-02-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 10000, "saldo_setelah": 135000, "ref_id": null}, {"no": 115, "tanggal": "2026-02-15", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 5000, "saldo_setelah": 130000, "ref_id": null}, {"no": 116, "tanggal": "2026-02-15", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 17000, "saldo_setelah": 113000, "ref_id": null}, {"no": 117, "tanggal": "2026-02-16", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 88000, "ref_id": null}, {"no": 118, "tanggal": "2026-02-16", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 83000, "ref_id": null}, {"no": 119, "tanggal": "2026-02-17", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 7000, "saldo_setelah": 90000, "ref_id": null}, {"no": 120, "tanggal": "2026-02-17", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 85000, "ref_id": null}, {"no": 121, "tanggal": "2026-02-18", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Pekerjaan", "keterangan": null, "jumlah": 40000, "saldo_setelah": 45000, "ref_id": null}, {"no": 122, "tanggal": "2026-02-19", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 76000, "saldo_setelah": 1139673, "ref_id": null}, {"no": 123, "tanggal": "2026-02-19", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 26000, "saldo_setelah": 95000, "ref_id": null}, {"no": 124, "tanggal": "2026-02-19", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 70000, "ref_id": null}, {"no": 125, "tanggal": "2026-02-20", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 112500, "saldo_setelah": 1027173, "ref_id": null}, {"no": 126, "tanggal": "2026-02-20", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 12500, "saldo_setelah": 170000, "ref_id": null}, {"no": 127, "tanggal": "2026-02-21", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 5000, "saldo_setelah": 165000, "ref_id": null}, {"no": 128, "tanggal": "2026-02-22", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 10000, "saldo_setelah": 175000, "ref_id": null}, {"no": 129, "tanggal": "2026-02-22", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 8000, "saldo_setelah": 167000, "ref_id": null}, {"no": 130, "tanggal": "2026-02-23", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 20000, "saldo_setelah": 147000, "ref_id": null}, {"no": 131, "tanggal": "2026-02-24", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 30000, "saldo_setelah": 117000, "ref_id": null}, {"no": 132, "tanggal": "2026-02-26", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 20000, "saldo_setelah": 97000, "ref_id": null}, {"no": 133, "tanggal": "2026-02-26", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 11787, "saldo_setelah": 1015386, "ref_id": null}, {"no": 134, "tanggal": "2026-02-26", "rekening_asal": "BRI Britama", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 5500, "saldo_setelah": 43023, "ref_id": null}, {"no": 135, "tanggal": "2026-02-26", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 7713, "saldo_setelah": 122000, "ref_id": null}, {"no": 136, "tanggal": "2026-03-02", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 97000, "ref_id": null}, {"no": 137, "tanggal": "2026-03-02", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 15000, "saldo_setelah": 82000, "ref_id": null}, {"no": 138, "tanggal": "2026-03-03", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 57000, "ref_id": null}, {"no": 139, "tanggal": "2026-03-05", "rekening_asal": "BRI Simpedes", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Gaji", "keterangan": "gaji bmi", "jumlah": 1463261, "saldo_setelah": 1463261, "ref_id": null}, {"no": 140, "tanggal": "2026-03-05", "rekening_asal": "BCA", "jenis": "Piutang", "rekening_tujuan": null, "kategori": "Uang Dikembalikan", "keterangan": "ajeng nyaur", "jumlah": 100000, "saldo_setelah": 1115386, "ref_id": 1}, {"no": 141, "tanggal": "2026-03-05", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 500000, "saldo_setelah": 963261, "ref_id": null}, {"no": 142, "tanggal": "2026-03-06", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Jatah Orang Tua", "keterangan": null, "jumlah": 400000, "saldo_setelah": 157000, "ref_id": null}, {"no": 143, "tanggal": "2026-03-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 11000, "saldo_setelah": 168000, "ref_id": null}, {"no": 144, "tanggal": "2026-03-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 10000, "saldo_setelah": 158000, "ref_id": null}, {"no": 145, "tanggal": "2026-03-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 133000, "ref_id": null}, {"no": 146, "tanggal": "2026-03-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 129000, "ref_id": null}, {"no": 147, "tanggal": "2026-03-08", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 6000, "saldo_setelah": 135000, "ref_id": null}, {"no": 148, "tanggal": "2026-03-08", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 25000, "saldo_setelah": 110000, "ref_id": null}, {"no": 149, "tanggal": "2026-03-09", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 8000, "saldo_setelah": 102000, "ref_id": null}, {"no": 150, "tanggal": "2026-03-10", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 61000, "saldo_setelah": 1054386, "ref_id": null}, {"no": 151, "tanggal": "2026-03-10", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 117000, "saldo_setelah": 46000, "ref_id": null}, {"no": 152, "tanggal": "2026-03-11", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 100000, "saldo_setelah": 863261, "ref_id": null}, {"no": 153, "tanggal": "2026-03-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 6000, "saldo_setelah": 140000, "ref_id": null}, {"no": 154, "tanggal": "2026-03-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 20000, "saldo_setelah": 120000, "ref_id": null}, {"no": 155, "tanggal": "2026-03-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 10000, "saldo_setelah": 110000, "ref_id": null}, {"no": 156, "tanggal": "2026-03-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 114000, "ref_id": null}, {"no": 157, "tanggal": "2026-03-13", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 119000, "ref_id": null}, {"no": 158, "tanggal": "2026-03-13", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 20000, "saldo_setelah": 99000, "ref_id": null}, {"no": 159, "tanggal": "2026-03-13", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 8000, "saldo_setelah": 91000, "ref_id": null}, {"no": 160, "tanggal": "2026-03-13", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 200000, "saldo_setelah": 663261, "ref_id": null}, {"no": 161, "tanggal": "2026-03-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 287000, "ref_id": null}, {"no": 162, "tanggal": "2026-03-15", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 50000, "saldo_setelah": 237000, "ref_id": null}, {"no": 163, "tanggal": "2026-03-31", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 963500, "saldo_setelah": 90886, "ref_id": null}, {"no": 164, "tanggal": "2026-03-31", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 464000, "saldo_setelah": 199261, "ref_id": null}, {"no": 165, "tanggal": "2026-03-31", "rekening_asal": "BRI Britama", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 43023, "saldo_setelah": 0, "ref_id": null}, {"no": 166, "tanggal": "2026-04-30", "rekening_asal": "Tunai (Cash)", "jenis": "Transfer", "rekening_tujuan": "BRI Simpedes", "kategori": "Transfer Antar Rekening", "keterangan": "transaksi tidak tercatat", "jumlah": 128593, "saldo_setelah": 1578930, "ref_id": null}, {"no": 167, "tanggal": "2026-04-30", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": "transaksi tidak tercatat", "jumlah": 71000, "saldo_setelah": 19886, "ref_id": null}, {"no": 168, "tanggal": "2026-04-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": "transaksi tidak tercatat", "jumlah": 1558930, "saldo_setelah": 91000, "ref_id": null}, {"no": 169, "tanggal": "2026-05-02", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 86000, "ref_id": null}, {"no": 170, "tanggal": "2026-05-03", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 65000, "saldo_setelah": 262854, "ref_id": null}, {"no": 171, "tanggal": "2026-05-03", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 10000, "saldo_setelah": 161000, "ref_id": null}, {"no": 172, "tanggal": "2026-05-03", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Paket Data/Pulsa", "keterangan": null, "jumlah": 75000, "saldo_setelah": 86000, "ref_id": null}, {"no": 173, "tanggal": "2026-05-04", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 255000, "saldo_setelah": 7854, "ref_id": null}, {"no": 174, "tanggal": "2026-05-04", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 345000, "ref_id": null}, {"no": 175, "tanggal": "2026-05-04", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 32000, "saldo_setelah": 313000, "ref_id": null}, {"no": 176, "tanggal": "2026-05-05", "rekening_asal": "BRI Simpedes", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Gaji", "keterangan": "gaji bulan april, bmi", "jumlah": 1767618, "saldo_setelah": 1775472, "ref_id": null}, {"no": 177, "tanggal": "2026-05-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 143000, "saldo_setelah": 170000, "ref_id": null}, {"no": 178, "tanggal": "2026-05-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 20000, "saldo_setelah": 150000, "ref_id": null}, {"no": 179, "tanggal": "2026-05-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 10000, "saldo_setelah": 140000, "ref_id": null}, {"no": 180, "tanggal": "2026-05-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 20000, "saldo_setelah": 120000, "ref_id": null}, {"no": 181, "tanggal": "2026-05-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 20000, "saldo_setelah": 100000, "ref_id": null}, {"no": 182, "tanggal": "2026-05-07", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 180000, "saldo_setelah": 1595472, "ref_id": null}, {"no": 183, "tanggal": "2026-05-08", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 284000, "ref_id": null}, {"no": 184, "tanggal": "2026-05-08", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 34000, "saldo_setelah": 250000, "ref_id": null}, {"no": 185, "tanggal": "2026-05-08", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 246000, "ref_id": null}, {"no": 186, "tanggal": "2026-05-09", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 221000, "ref_id": null}, {"no": 187, "tanggal": "2026-05-09", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 7000, "saldo_setelah": 214000, "ref_id": null}, {"no": 188, "tanggal": "2026-05-10", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 13000, "saldo_setelah": 201000, "ref_id": null}, {"no": 189, "tanggal": "2026-05-11", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 300000, "saldo_setelah": 1295472, "ref_id": null}, {"no": 190, "tanggal": "2026-05-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 10000, "saldo_setelah": 511000, "ref_id": null}, {"no": 191, "tanggal": "2026-05-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Pendapatan Lain", "keterangan": null, "jumlah": 15000, "saldo_setelah": 526000, "ref_id": null}, {"no": 192, "tanggal": "2026-05-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Barang Pribadi", "keterangan": "beli smart watch", "jumlah": 472000, "saldo_setelah": 54000, "ref_id": null}, {"no": 193, "tanggal": "2026-05-13", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 29000, "ref_id": null}, {"no": 194, "tanggal": "2026-05-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 25000, "ref_id": null}, {"no": 195, "tanggal": "2026-05-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 29000, "ref_id": null}, {"no": 196, "tanggal": "2026-05-15", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 14000, "saldo_setelah": 15000, "ref_id": null}, {"no": 197, "tanggal": "2026-05-16", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 100000, "saldo_setelah": 1195472, "ref_id": null}, {"no": 198, "tanggal": "2026-05-16", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 25000, "saldo_setelah": 90000, "ref_id": null}, {"no": 199, "tanggal": "2026-05-16", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 85000, "ref_id": null}, {"no": 200, "tanggal": "2026-05-17", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 4000, "saldo_setelah": 81000, "ref_id": null}, {"no": 201, "tanggal": "2026-05-18", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 14000, "saldo_setelah": 67000, "ref_id": null}, {"no": 202, "tanggal": "2026-05-19", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 10000, "saldo_setelah": 1185472, "ref_id": null}, {"no": 203, "tanggal": "2026-05-19", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 10000, "saldo_setelah": 67000, "ref_id": null}, {"no": 204, "tanggal": "2026-05-31", "rekening_asal": "BCA", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 19886, "saldo_setelah": 0, "ref_id": null}, {"no": 205, "tanggal": "2026-05-31", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 180500, "saldo_setelah": 1004972, "ref_id": null}, {"no": 206, "tanggal": "2026-05-31", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": "transaksi tidak tercatat", "jumlah": 167386, "saldo_setelah": 100000, "ref_id": null}, {"no": 207, "tanggal": "2026-06-01", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 22000, "saldo_setelah": 122000, "ref_id": null}, {"no": 208, "tanggal": "2026-06-01", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 22000, "saldo_setelah": 100000, "ref_id": null}, {"no": 209, "tanggal": "2026-06-01", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 5000, "saldo_setelah": 95000, "ref_id": null}, {"no": 210, "tanggal": "2026-06-02", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngado Orang Nikah", "keterangan": "ngado nif'a", "jumlah": 50000, "saldo_setelah": 45000, "ref_id": null}, {"no": 211, "tanggal": "2026-06-03", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 18000, "saldo_setelah": 27000, "ref_id": null}, {"no": 212, "tanggal": "2026-06-04", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 17000, "saldo_setelah": 10000, "ref_id": null}, {"no": 213, "tanggal": "2026-06-04", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 15000, "saldo_setelah": -5000, "ref_id": null}, {"no": 214, "tanggal": "2026-06-04", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 600000, "saldo_setelah": 404972, "ref_id": null}, {"no": 215, "tanggal": "2026-06-05", "rekening_asal": "BRI Simpedes", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Gaji", "keterangan": null, "jumlah": 680302, "saldo_setelah": 1085274, "ref_id": null}, {"no": 216, "tanggal": "2026-06-05", "rekening_asal": "BRI Simpedes", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Bonus", "keterangan": null, "jumlah": 100000, "saldo_setelah": 1185274, "ref_id": null}, {"no": 217, "tanggal": "2026-06-05", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 26000, "saldo_setelah": 1159274, "ref_id": null}, {"no": 218, "tanggal": "2026-06-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Jatah Orang Tua", "keterangan": null, "jumlah": 400000, "saldo_setelah": 221000, "ref_id": null}, {"no": 219, "tanggal": "2026-06-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Hiburan", "keterangan": "beli netflix bulanan", "jumlah": 30000, "saldo_setelah": 191000, "ref_id": null}, {"no": 220, "tanggal": "2026-06-06", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 10000, "saldo_setelah": 181000, "ref_id": null}, {"no": 221, "tanggal": "2026-06-06", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 10000, "saldo_setelah": 1149274, "ref_id": null}, {"no": 222, "tanggal": "2026-06-08", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 16000, "saldo_setelah": 175000, "ref_id": null}, {"no": 223, "tanggal": "2026-06-08", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 20000, "saldo_setelah": 1129274, "ref_id": null}, {"no": 224, "tanggal": "2026-06-09", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 12000, "saldo_setelah": 183000, "ref_id": null}, {"no": 225, "tanggal": "2026-06-10", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 187000, "ref_id": null}, {"no": 226, "tanggal": "2026-06-20", "rekening_asal": "BRI Simpedes", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": "Admin fee", "jumlah": 4000, "saldo_setelah": 1125274, "ref_id": null}, {"no": 227, "tanggal": "2026-06-21", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 7000, "saldo_setelah": 194000, "ref_id": null}, {"no": 228, "tanggal": "2026-06-21", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Pekerjaan", "keterangan": "print, fotokopi, dll", "jumlah": 26000, "saldo_setelah": 168000, "ref_id": null}, {"no": 229, "tanggal": "2026-06-22", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 30000, "saldo_setelah": 138000, "ref_id": null}, {"no": 230, "tanggal": "2026-06-22", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 8000, "saldo_setelah": 130000, "ref_id": null}, {"no": 231, "tanggal": "2026-06-23", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 135000, "ref_id": null}, {"no": 232, "tanggal": "2026-06-23", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 20000, "saldo_setelah": 115000, "ref_id": null}, {"no": 233, "tanggal": "2026-06-23", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Pendapatan Lain", "keterangan": "di opah i mbak lik", "jumlah": 150000, "saldo_setelah": 265000, "ref_id": null}, {"no": 234, "tanggal": "2026-06-23", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 18000, "saldo_setelah": 247000, "ref_id": null}, {"no": 235, "tanggal": "2026-06-25", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Barang Pribadi", "keterangan": "beli alat cukur kumis", "jumlah": 35000, "saldo_setelah": 212000, "ref_id": null}, {"no": 236, "tanggal": "2026-06-25", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": "hilang", "jumlah": 10000, "saldo_setelah": 202000, "ref_id": null}, {"no": 237, "tanggal": "2026-06-25", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 207000, "ref_id": null}, {"no": 238, "tanggal": "2026-06-25", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 7000, "saldo_setelah": 200000, "ref_id": null}, {"no": 239, "tanggal": "2026-06-26", "rekening_asal": "BRI Simpedes", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Paket Data/Pulsa", "keterangan": "paket bulanan via qris", "jumlah": 61000, "saldo_setelah": 1064274, "ref_id": null}, {"no": 240, "tanggal": "2026-06-26", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Servis Sepeda", "keterangan": "ganti oli", "jumlah": 50000, "saldo_setelah": 150000, "ref_id": null}, {"no": 241, "tanggal": "2026-06-26", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 5000, "saldo_setelah": 145000, "ref_id": null}, {"no": 242, "tanggal": "2026-06-27", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 18000, "saldo_setelah": 127000, "ref_id": null}, {"no": 243, "tanggal": "2026-06-27", "rekening_asal": "Dana", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Pendapatan Lain", "keterangan": null, "jumlah": 6673, "saldo_setelah": 8459, "ref_id": null}, {"no": 244, "tanggal": "2026-06-28", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 132000, "ref_id": null}, {"no": 245, "tanggal": "2026-06-28", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 15000, "saldo_setelah": 117000, "ref_id": null}, {"no": 246, "tanggal": "2026-06-29", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 25500, "saldo_setelah": 91500, "ref_id": null}, {"no": 247, "tanggal": "2026-06-29", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 2000, "saldo_setelah": 89500, "ref_id": null}, {"no": 248, "tanggal": "2026-06-29", "rekening_asal": "BRI Simpedes", "jenis": "Transfer", "rekening_tujuan": "Tunai (Cash)", "kategori": "Transfer Antar Rekening", "keterangan": null, "jumlah": 600000, "saldo_setelah": 464274, "ref_id": null}, {"no": 249, "tanggal": "2026-06-29", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Jatah Orang Tua", "keterangan": null, "jumlah": 500000, "saldo_setelah": 189500, "ref_id": null}, {"no": 250, "tanggal": "2026-06-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 9000, "saldo_setelah": 198500, "ref_id": null}, {"no": 251, "tanggal": "2026-06-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Jatah Orang Tua", "keterangan": "di pinjam ayah", "jumlah": 50000, "saldo_setelah": 148500, "ref_id": null}, {"no": 252, "tanggal": "2026-06-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 6000, "saldo_setelah": 142500, "ref_id": null}, {"no": 253, "tanggal": "2026-06-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 10000, "saldo_setelah": 132500, "ref_id": null}, {"no": 254, "tanggal": "2026-06-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": "transaksi tidak tercatat", "jumlah": 19500, "saldo_setelah": 113000, "ref_id": null}, {"no": 255, "tanggal": "2026-06-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 65000, "saldo_setelah": 178000, "ref_id": null}, {"no": 256, "tanggal": "2026-06-30", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Barang Pribadi", "keterangan": "beli keyboard", "jumlah": 65000, "saldo_setelah": 113000, "ref_id": null}, {"no": 257, "tanggal": "2026-07-01", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 30000, "saldo_setelah": 83000, "ref_id": null}, {"no": 258, "tanggal": "2026-07-03", "rekening_asal": "BRI Simpedes", "jenis": "Piutang", "rekening_tujuan": null, "kategori": "Uang Dipinjam", "keterangan": "di pinjam anton", "jumlah": 20000, "saldo_setelah": 444274, "ref_id": 2}, {"no": 259, "tanggal": "2026-07-04", "rekening_asal": "Tunai (Cash)", "jenis": "Piutang", "rekening_tujuan": null, "kategori": "Uang Dikembalikan", "keterangan": "di kembalikan anton", "jumlah": 20000, "saldo_setelah": 103000, "ref_id": 2}, {"no": 260, "tanggal": "2026-07-04", "rekening_asal": "BRI Simpedes", "jenis": "Piutang", "rekening_tujuan": null, "kategori": "Uang Dipinjam", "keterangan": "di pinjam dhoni", "jumlah": 52500, "saldo_setelah": 391774, "ref_id": 3}, {"no": 261, "tanggal": "2026-07-04", "rekening_asal": "BRI Simpedes", "jenis": "Piutang", "rekening_tujuan": null, "kategori": "Uang Dipinjam", "keterangan": "di pinjam anton", "jumlah": 30000, "saldo_setelah": 361774, "ref_id": 4}, {"no": 262, "tanggal": "2026-07-04", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 5000, "saldo_setelah": 98000, "ref_id": null}, {"no": 263, "tanggal": "2026-07-05", "rekening_asal": "BRI Simpedes", "jenis": "Piutang", "rekening_tujuan": null, "kategori": "Uang Dikembalikan", "keterangan": "di kembalikan anton", "jumlah": 30000, "saldo_setelah": 391774, "ref_id": 4}, {"no": 264, "tanggal": "2026-07-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 12000, "saldo_setelah": 110000, "ref_id": null}, {"no": 265, "tanggal": "2026-07-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Pekerjaan", "keterangan": null, "jumlah": 7000, "saldo_setelah": 103000, "ref_id": null}, {"no": 266, "tanggal": "2026-07-05", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 5000, "saldo_setelah": 98000, "ref_id": null}, {"no": 267, "tanggal": "2026-07-06", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 5000, "saldo_setelah": 93000, "ref_id": null}, {"no": 268, "tanggal": "2026-06-18", "rekening_asal": "Tunai (Cash)", "jenis": "Utang", "rekening_tujuan": null, "kategori": "Utang Diterima", "keterangan": "rizal", "jumlah": 10000, "saldo_setelah": 103000, "ref_id": 1}, {"no": 269, "tanggal": "2026-06-18", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 10000, "saldo_setelah": 93000, "ref_id": null}, {"no": 270, "tanggal": "2026-07-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 13000, "saldo_setelah": 106000, "ref_id": null}, {"no": 271, "tanggal": "2026-07-07", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 6000, "saldo_setelah": 100000, "ref_id": null}, {"no": 272, "tanggal": "2026-07-09", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 12000, "saldo_setelah": 112000, "ref_id": null}, {"no": 273, "tanggal": "2026-07-09", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 10000, "saldo_setelah": 102000, "ref_id": null}, {"no": 274, "tanggal": "2026-07-10", "rekening_asal": "BRI Simpedes", "jenis": "Piutang", "rekening_tujuan": null, "kategori": "Uang Dikembalikan", "keterangan": "di kembalikan dhoni", "jumlah": 52500, "saldo_setelah": 444274, "ref_id": 3}, {"no": 275, "tanggal": "2026-07-10", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 10000, "saldo_setelah": 92000, "ref_id": null}, {"no": 276, "tanggal": "2026-07-10", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 5000, "saldo_setelah": 87000, "ref_id": null}, {"no": 277, "tanggal": "2026-07-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 11000, "saldo_setelah": 98000, "ref_id": null}, {"no": 278, "tanggal": "2026-07-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Pekerjaan", "keterangan": null, "jumlah": 15000, "saldo_setelah": 83000, "ref_id": null}, {"no": 279, "tanggal": "2026-07-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 17500, "saldo_setelah": 100500, "ref_id": null}, {"no": 280, "tanggal": "2026-07-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 36000, "saldo_setelah": 136500, "ref_id": null}, {"no": 281, "tanggal": "2026-07-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Barang Pribadi", "keterangan": "beli sandal", "jumlah": 17500, "saldo_setelah": 119000, "ref_id": null}, {"no": 282, "tanggal": "2026-07-11", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Barang Pribadi", "keterangan": "beli deodoran kahfr 2 pcs", "jumlah": 36000, "saldo_setelah": 83000, "ref_id": null}, {"no": 283, "tanggal": "2026-07-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 17000, "saldo_setelah": 100000, "ref_id": null}, {"no": 284, "tanggal": "2026-07-12", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Pendapatan Lain", "keterangan": "sholawat kondangan", "jumlah": 5000, "saldo_setelah": 105000, "ref_id": null}, {"no": 285, "tanggal": "2026-07-13", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "BBM", "keterangan": null, "jumlah": 30000, "saldo_setelah": 75000, "ref_id": null}, {"no": 286, "tanggal": "2026-07-13", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 5000, "saldo_setelah": 70000, "ref_id": null}, {"no": 287, "tanggal": "2026-07-13", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 74000, "ref_id": null}, {"no": 288, "tanggal": "2026-07-13", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 4000, "saldo_setelah": 70000, "ref_id": null}, {"no": 289, "tanggal": "2026-07-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 10000, "saldo_setelah": 60000, "ref_id": null}, {"no": 290, "tanggal": "2026-07-14", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 65000, "ref_id": null}, {"no": 291, "tanggal": "2026-07-15", "rekening_asal": "BRI Simpedes", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Sedekah", "keterangan": null, "jumlah": 20000, "saldo_setelah": 424274, "ref_id": null}, {"no": 292, "tanggal": "2026-07-15", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 6000, "saldo_setelah": 59000, "ref_id": null}, {"no": 293, "tanggal": "2026-07-16", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 2000, "saldo_setelah": 61000, "ref_id": null}, {"no": 294, "tanggal": "2026-07-16", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Perawatan Diri", "keterangan": "cukur", "jumlah": 15000, "saldo_setelah": 46000, "ref_id": null}, {"no": 295, "tanggal": "2026-07-16", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 5000, "saldo_setelah": 41000, "ref_id": null}, {"no": 296, "tanggal": "2026-07-17", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 5000, "saldo_setelah": 46000, "ref_id": null}, {"no": 297, "tanggal": "2026-07-17", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 6000, "saldo_setelah": 40000, "ref_id": null}, {"no": 298, "tanggal": "2026-07-18", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 20000, "saldo_setelah": 60000, "ref_id": null}, {"no": 299, "tanggal": "2026-07-18", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Barang Pribadi", "keterangan": "beli casing", "jumlah": 15000, "saldo_setelah": 45000, "ref_id": null}, {"no": 300, "tanggal": "2026-07-19", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 14000, "saldo_setelah": 59000, "ref_id": null}, {"no": 301, "tanggal": "2026-07-19", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 19000, "saldo_setelah": 40000, "ref_id": null}, {"no": 302, "tanggal": "2026-07-19", "rekening_asal": "Tunai (Cash)", "jenis": "Utang", "rekening_tujuan": null, "kategori": "Utang Dibayar", "keterangan": "rizal", "jumlah": 5000, "saldo_setelah": 35000, "ref_id": 1}, {"no": 303, "tanggal": "2026-07-21", "rekening_asal": "BRI Simpedes", "jenis": "Piutang", "rekening_tujuan": null, "kategori": "Uang Dipinjam", "keterangan": "ibu, buat beli token listrik", "jumlah": 53000, "saldo_setelah": 371274, "ref_id": 5}, {"no": 304, "tanggal": "2026-07-20", "rekening_asal": "BRI Simpedes", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": "Admin Fee", "jumlah": 4000, "saldo_setelah": 367274, "ref_id": null}, {"no": 305, "tanggal": "2026-07-22", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 12000, "saldo_setelah": 47000, "ref_id": null}, {"no": 306, "tanggal": "2026-07-22", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 9000, "saldo_setelah": 38000, "ref_id": null}, {"no": 307, "tanggal": "2026-07-22", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Pekerjaan", "keterangan": null, "jumlah": 7000, "saldo_setelah": 31000, "ref_id": null}, {"no": 308, "tanggal": "2026-07-22", "rekening_asal": "Dana", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": "tes buy produl digital milik sendiri", "jumlah": 2014, "saldo_setelah": 6445, "ref_id": null}, {"no": 309, "tanggal": "2026-07-23", "rekening_asal": "Tunai (Cash)", "jenis": "Piutang", "rekening_tujuan": null, "kategori": "Uang Dikembalikan", "keterangan": "ibu", "jumlah": 53000, "saldo_setelah": 84000, "ref_id": 5}, {"no": 310, "tanggal": "2026-07-24", "rekening_asal": "BRI Simpedes", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Paket Data/Pulsa", "keterangan": "Paket habis 20 Agustus", "jumlah": 61000, "saldo_setelah": 306274, "ref_id": null}, {"no": 311, "tanggal": "2026-07-24", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 5000, "saldo_setelah": 79000, "ref_id": null}, {"no": 312, "tanggal": "2026-07-25", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Lainnya", "keterangan": null, "jumlah": 10000, "saldo_setelah": 69000, "ref_id": null}, {"no": 313, "tanggal": "2026-07-25", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 5000, "saldo_setelah": 64000, "ref_id": null}, {"no": 314, "tanggal": "2026-07-25", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 7000, "saldo_setelah": 71000, "ref_id": null}, {"no": 315, "tanggal": "2026-07-26", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 4000, "saldo_setelah": 75000, "ref_id": null}, {"no": 316, "tanggal": "2026-07-26", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Ngopi/Nongkrong", "keterangan": null, "jumlah": 11000, "saldo_setelah": 64000, "ref_id": null}, {"no": 317, "tanggal": "2026-07-25", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 6000, "saldo_setelah": 70000, "ref_id": null}, {"no": 318, "tanggal": "2026-07-28", "rekening_asal": "Tunai (Cash)", "jenis": "Pemasukan", "rekening_tujuan": null, "kategori": "Dari Toko", "keterangan": null, "jumlah": 11000, "saldo_setelah": 81000, "ref_id": null}, {"no": 319, "tanggal": "2026-07-28", "rekening_asal": "Tunai (Cash)", "jenis": "Pengeluaran", "rekening_tujuan": null, "kategori": "Makan & Minum", "keterangan": null, "jumlah": 12000, "saldo_setelah": 69000, "ref_id": null}];
const SEED_REKENING = [{"kode": "REK-001", "nama": "BCA", "jenis": "Bank", "no_rek": "3301539141", "saldo_awal": 470173}, {"kode": "REK-002", "nama": "BRI Simpedes", "jenis": "Bank", "no_rek": "004101205066502", "saldo_awal": 0}, {"kode": "REK-003", "nama": "Tunai (Cash)", "jenis": "Tunai", "no_rek": "-", "saldo_awal": 124000}, {"kode": "REK-004", "nama": "Dana", "jenis": "E-Wallet", "no_rek": "087716397819", "saldo_awal": 1786}, {"kode": "REK-005", "nama": "OVO", "jenis": "E-Wallet", "no_rek": "087716397819", "saldo_awal": 0}, {"kode": "REK-006", "nama": "GoPay", "jenis": "E-Wallet", "no_rek": "087716397819", "saldo_awal": 0}, {"kode": "REK-007", "nama": "ShopeePAY", "jenis": "E-Wallet", "no_rek": "087716397819", "saldo_awal": 10000}, {"kode": "REK-008", "nama": "SeaBank", "jenis": "Bank Digital", "no_rek": 77, "saldo_awal": 0}, {"kode": "REK-009", "nama": "BRI Britama", "jenis": "Bank", "no_rek": "004101181726505", "saldo_awal": 54023}, {"kode": "REK-010", "nama": "Mandiri", "jenis": "Bank", "no_rek": null, "saldo_awal": 0}, {"kode": "REK-011", "nama": "Bank Jago", "jenis": "Bank Digital", "no_rek": null, "saldo_awal": 0}];
const SEED_KATEGORI = [{"kategori": "Gaji", "jenis": "Pemasukan", "kepala": "Pendapatan Aktif"}, {"kategori": "Bonus", "jenis": "Pemasukan", "kepala": "Pendapatan Pasif"}, {"kategori": "Hasil Investasi", "jenis": "Pemasukan", "kepala": "Pendapatan Pasif"}, {"kategori": "Pendapatan Lain", "jenis": "Pemasukan", "kepala": "Lainnya"}, {"kategori": "Dari Toko", "jenis": "Pemasukan", "kepala": "Pendapatan Pasif"}, {"kategori": "Makan & Minum", "jenis": "Pengeluaran", "kepala": "Kebutuhan Pokok"}, {"kategori": "Transportasi", "jenis": "Pengeluaran", "kepala": "Transportasi & Perawatan"}, {"kategori": "Belanja Bulanan", "jenis": "Pengeluaran", "kepala": "Kebutuhan Pokok"}, {"kategori": "Hiburan", "jenis": "Pengeluaran", "kepala": "Gaya Hidup"}, {"kategori": "Kesehatan", "jenis": "Pengeluaran", "kepala": "Kesehatan & Pendidikan"}, {"kategori": "Pendidikan", "jenis": "Pengeluaran", "kepala": "Kesehatan & Pendidikan"}, {"kategori": "Tagihan & Utilitas", "jenis": "Pengeluaran", "kepala": "Kebutuhan Pokok"}, {"kategori": "Cicilan/Utang", "jenis": "Pengeluaran", "kepala": "Kewajiban & Sosial"}, {"kategori": "Jatah Orang Tua", "jenis": "Pengeluaran", "kepala": "Kewajiban & Sosial"}, {"kategori": "Servis Sepeda", "jenis": "Pengeluaran", "kepala": "Transportasi & Perawatan"}, {"kategori": "BBM", "jenis": "Pengeluaran", "kepala": "Kebutuhan Pokok"}, {"kategori": "Sedekah", "jenis": "Pengeluaran", "kepala": "Kewajiban & Sosial"}, {"kategori": "Ngado Orang Nikah", "jenis": "Pengeluaran", "kepala": "Kewajiban & Sosial"}, {"kategori": "Paket Data/Pulsa", "jenis": "Pengeluaran", "kepala": "Kebutuhan Pokok"}, {"kategori": "Barang Pribadi", "jenis": "Pengeluaran", "kepala": "Gaya Hidup"}, {"kategori": "Perawatan Diri", "jenis": "Pengeluaran", "kepala": "Gaya Hidup"}, {"kategori": "Pekerjaan", "jenis": "Pengeluaran", "kepala": "Pekerjaan & Lainnya"}, {"kategori": "Servis Elektronik", "jenis": "Pengeluaran", "kepala": "Transportasi & Perawatan"}, {"kategori": "Lainnya", "jenis": "Pengeluaran", "kepala": "Pekerjaan & Lainnya"}, {"kategori": "Ngopi/Nongkrong", "jenis": "Pengeluaran", "kepala": "Gaya Hidup"}, {"kategori": "Kost", "jenis": "Pengeluaran", "kepala": "Kebutuhan Pokok"}, {"kategori": "Transfer Antar Rekening", "jenis": "Transfer", "kepala": "-"}, {"kategori": "Uang Dipinjam", "jenis": "Piutang", "kepala": "-"}, {"kategori": "Uang Dikembalikan", "jenis": "Piutang", "kepala": "-"}, {"kategori": "Utang Diterima", "jenis": "Utang", "kepala": "-"}, {"kategori": "Utang Dibayar", "jenis": "Utang", "kepala": "-"}];
const BUDGET_2026 = {"Makan & Minum": [450000, 450000, 450000, 450000, 450000, 450000, 100000, 450000, 450000, 450000, 450000, 450000], "BBM": [450000, 450000, 450000, 450000, 450000, 450000, 200000, 450000, 450000, 450000, 450000, 450000], "Paket Data/Pulsa": [75000, 75000, 75000, 75000, 75000, 75000, 75000, 75000, 75000, 75000, 75000, 75000], "Tagihan & Utilitas": [100000, 100000, 100000, 100000, 100000, 100000, 0, 100000, 100000, 100000, 100000, 100000], "Belanja Bulanan": [100000, 100000, 100000, 100000, 100000, 100000, 0, 100000, 100000, 100000, 100000, 100000], "Kost": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "Transportasi": [100000, 100000, 100000, 100000, 100000, 100000, 0, 100000, 100000, 100000, 100000, 100000], "Servis Sepeda": [100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000], "Servis Elektronik": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "Cicilan/Utang": [100000, 100000, 100000, 100000, 100000, 100000, 0, 100000, 100000, 100000, 100000, 100000], "Jatah Orang Tua": [300000, 300000, 300000, 300000, 300000, 300000, 0, 300000, 300000, 300000, 300000, 300000], "Sedekah": [50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000], "Ngado Orang Nikah": [50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000], "Kesehatan": [100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000], "Pendidikan": [100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000], "Hiburan": [50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000], "Ngopi/Nongkrong": [300000, 300000, 300000, 300000, 300000, 300000, 150000, 300000, 300000, 300000, 300000, 300000], "Barang Pribadi": [200000, 200000, 200000, 200000, 200000, 200000, 100000, 200000, 200000, 200000, 200000, 200000], "Perawatan Diri": [70000, 70000, 70000, 70000, 70000, 70000, 0, 70000, 70000, 70000, 70000, 70000], "Pekerjaan": [30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000], "Lainnya": [100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000]};
const SEED_UTANG = [{"no": 1, "tgl": "2026-06-18", "dari": "rizal", "ket": "beli nasi", "jumlah": 10000, "dibayar": 5000, "sisa": 5000, "status": "Belum Lunas"}];
const SEED_PIUTANG = [{"no": 1, "tgl": "2026-02-01", "kepada": "ajeng", "ket": "dipinjamkan (dari Cash)", "jumlah": 100000, "kembali": 100000, "sisa": 0, "status": "Lunas"}, {"no": 2, "tgl": "2026-07-03", "kepada": "anton", "ket": "dipinjamkan (dari BRI Simpedes)", "jumlah": 20000, "kembali": 20000, "sisa": 0, "status": "Lunas"}, {"no": 3, "tgl": "2026-07-04", "kepada": "dhoni", "ket": "dipinjamkan (dari BRI Simpedes)", "jumlah": 52500, "kembali": 52500, "sisa": 0, "status": "Lunas"}, {"no": 4, "tgl": "2026-07-04", "kepada": "anton", "ket": "dipinjamkan ke-2 (dari BRI Simpedes)", "jumlah": 30000, "kembali": 30000, "sisa": 0, "status": "Lunas"}, {"no": 5, "tgl": "2026-07-21", "kepada": "ibu", "ket": "buat beli token listrik", "jumlah": 53000, "kembali": 53000, "sisa": 0, "status": "Lunas"}];

const MONTHS = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
const HEAD_ORDER = [
  "Kebutuhan Pokok",
  "Transportasi & Perawatan",
  "Kewajiban & Sosial",
  "Kesehatan & Pendidikan",
  "Gaya Hidup",
  "Pekerjaan & Lainnya"
];

const fmtRp = (n) => {
  const v = Math.round(Number(n) || 0);
  const sign = v < 0 ? "-" : "";
  return sign + "Rp" + Math.abs(v).toLocaleString("id-ID");
};

const fmtDate = (iso) => {
  if (!iso) return "-";
  const dt = new Date(iso + "T00:00:00");
  return dt.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
};

const monthKey = (iso) => iso ? iso.slice(0, 7) : "";
const yearOf = (iso) => iso ? parseInt(iso.slice(0, 4), 10) : null;
const monthOf = (iso) => iso ? parseInt(iso.slice(5, 7), 10) : null;

function uid(list) {
  return (list.reduce((m, x) => Math.max(m, x.no || 0), 0) || 0) + 1;
}

/* ============================ CORE CALCULATIONS ============================ */

function computeAccountBalances(accounts, transaksi) {
  const balances = {};
  accounts.forEach(a => { balances[a.nama] = a.saldo_awal || 0; });
  transaksi.forEach(t => {
    const src = t.rekening_asal;
    const dst = t.rekening_tujuan;
    const jumlah = Number(t.jumlah) || 0;
    if (src == null || !(src in balances)) return;
    switch (t.jenis) {
      case "Pemasukan":
        balances[src] += jumlah; break;
      case "Pengeluaran":
        balances[src] -= jumlah; break;
      case "Transfer":
        balances[src] -= jumlah;
        if (dst && dst in balances) balances[dst] += jumlah;
        break;
      case "Piutang":
        if (t.kategori === "Uang Dipinjam") balances[src] -= jumlah;
        else if (t.kategori === "Uang Dikembalikan") balances[src] += jumlah;
        break;
      case "Utang":
        if (t.kategori === "Utang Diterima") balances[src] += jumlah;
        else if (t.kategori === "Utang Dibayar") balances[src] -= jumlah;
        break;
      default: break;
    }
  });
  return balances;
}

function periodTotals(transaksi, predicate) {
  let income = 0, expense = 0, count = 0;
  transaksi.forEach(t => {
    if (!predicate(t)) return;
    if (t.jenis === "Pemasukan") { income += Number(t.jumlah) || 0; count++; }
    else if (t.jenis === "Pengeluaran") { expense += Number(t.jumlah) || 0; count++; }
  });
  return { income, expense, net: income - expense, count };
}

function startOfWeekMonday(d) {
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  monday.setHours(0,0,0,0);
  return monday;
}

function toISO(d) {
  return d.toISOString().slice(0, 10);
}

/* ============================== MAIN APP ============================== */

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [accounts, setAccounts] = useState(SEED_REKENING);
  const [categories] = useState(SEED_KATEGORI);
  const [transaksi, setTransaksi] = useState(SEED_TRANSAKSI);
  const [budget, setBudget] = useState({ "2026": BUDGET_2026 });
  const [utang, setUtang] = useState(SEED_UTANG);
  const [piutang, setPiutang] = useState(SEED_PIUTANG);
  const [tabungan, setTabungan] = useState([]);
  const [investasi, setInvestasi] = useState([]);
  const [asetLain, setAsetLain] = useState(0);
  const [toast, setToast] = useState(null);

  // Load persisted data once (localStorage — data tersimpan di browser perangkat ini)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ckp-data");
      if (raw) {
        const d = JSON.parse(raw);
        if (d.accounts) setAccounts(d.accounts);
        if (d.transaksi) setTransaksi(d.transaksi);
        if (d.budget) setBudget(d.budget);
        if (d.utang) setUtang(d.utang);
        if (d.piutang) setPiutang(d.piutang);
        if (d.tabungan) setTabungan(d.tabungan);
        if (d.investasi) setInvestasi(d.investasi);
        if (typeof d.asetLain === "number") setAsetLain(d.asetLain);
      }
    } catch (e) {
      // data rusak / belum ada — pakai data awal
    } finally {
      setLoaded(true);
    }
  }, []);

  // Persist on every change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    try {
      const payload = JSON.stringify({ accounts, transaksi, budget, utang, piutang, tabungan, investasi, asetLain });
      localStorage.setItem("ckp-data", payload);
    } catch (e) {
      // storage penuh / diblokir browser — abaikan
    }
  }, [loaded, accounts, transaksi, budget, utang, piutang, tabungan, investasi, asetLain]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  // ---- Undo / Redo global ----
  const MAX_HISTORY = 50;
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const skipHistory = useRef(false);
  const prevSnapshotRef = useRef(null);

  const takeSnapshot = useCallback(() => JSON.stringify({
    accounts, transaksi, budget, utang, piutang, tabungan, investasi, asetLain
  }), [accounts, transaksi, budget, utang, piutang, tabungan, investasi, asetLain]);

  useEffect(() => {
    if (!loaded) return;
    const snapshot = takeSnapshot();
    if (prevSnapshotRef.current === null) {
      prevSnapshotRef.current = snapshot;
      return;
    }
    if (snapshot === prevSnapshotRef.current) return;
    if (skipHistory.current) {
      skipHistory.current = false;
      prevSnapshotRef.current = snapshot;
      return;
    }
    setPast(p => {
      const next = [...p, prevSnapshotRef.current];
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
    });
    setFuture([]);
    prevSnapshotRef.current = snapshot;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, accounts, transaksi, budget, utang, piutang, tabungan, investasi, asetLain]);

  const applySnapshot = (snapshot) => {
    const d = JSON.parse(snapshot);
    skipHistory.current = true;
    setAccounts(d.accounts);
    setTransaksi(d.transaksi);
    setBudget(d.budget);
    setUtang(d.utang);
    setPiutang(d.piutang);
    setTabungan(d.tabungan);
    setInvestasi(d.investasi);
    setAsetLain(d.asetLain);
  };

  const undo = () => {
    if (past.length === 0) return;
    const currentSnapshot = takeSnapshot();
    const prevState = past[past.length - 1];
    setPast(p => p.slice(0, -1));
    setFuture(f => [currentSnapshot, ...f]);
    skipHistory.current = true;
    applySnapshot(prevState);
    showToast("Perubahan diurungkan");
  };

  const redo = () => {
    if (future.length === 0) return;
    const currentSnapshot = takeSnapshot();
    const nextState = future[0];
    setFuture(f => f.slice(1));
    setPast(p => [...p, currentSnapshot]);
    skipHistory.current = true;
    applySnapshot(nextState);
    showToast("Perubahan diulangi");
  };

  // Keyboard shortcuts: Ctrl/Cmd+Z (undo), Ctrl/Cmd+Shift+Z atau Ctrl/Cmd+Y (redo)
  useEffect(() => {
    const handler = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const key = e.key.toLowerCase();
      if (key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((key === "z" && e.shiftKey) || key === "y") { e.preventDefault(); redo(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const balances = useMemo(() => computeAccountBalances(accounts, transaksi), [accounts, transaksi]);
  const totalKasBank = useMemo(() => Object.values(balances).reduce((s, v) => s + v, 0), [balances]);
  const totalSisaPiutang = useMemo(() => piutang.reduce((s, p) => s + Math.max(0, (p.jumlah || 0) - (p.kembali || 0)), 0), [piutang]);
  const totalSisaUtang = useMemo(() => utang.reduce((s, u) => s + Math.max(0, (u.jumlah || 0) - (u.dibayar || 0)), 0), [utang]);
  const totalInvestasi = useMemo(() => investasi.reduce((s, i) => s + (Number(i.nilai_sekarang) || 0), 0), [investasi]);

  const totalAset = totalKasBank + totalSisaPiutang + totalInvestasi + (Number(asetLain) || 0);
  const totalKewajiban = totalSisaUtang;
  const netWorth = totalAset - totalKewajiban;

  const addTransaksi = (t) => {
    const no = uid(transaksi);
    setTransaksi(prev => [...prev, { ...t, no }]);
    showToast("Transaksi tersimpan");
  };

  const deleteTransaksi = (no) => {
    setTransaksi(prev => prev.filter(t => t.no !== no));
    showToast("Transaksi dihapus");
  };

  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transaksi", label: "Transaksi", icon: Receipt },
    { id: "rekening", label: "Rekening", icon: Wallet },
    { id: "anggaran", label: "Anggaran", icon: PieChartIcon },
    { id: "utangpiutang", label: "Utang & Piutang", icon: HandCoins },
    { id: "tabungan", label: "Tabungan & Investasi", icon: PiggyBank },
    { id: "laporan", label: "Laporan", icon: TrendingUp },
  ];

  return (
    <div className="ckp-root">
      <style>{CSS}</style>

      <header className="ckp-header">
        <div className="ckp-header-inner">
          <div className="ckp-brand">
            <div className="ckp-brand-mark">CKP</div>
            <div>
              <div className="ckp-brand-title">Catatan Keuangan Pribadi</div>
              <div className="ckp-brand-sub">Buku kas digital — {new Date().toLocaleDateString("id-ID",{ day:"2-digit", month:"long", year:"numeric" })}</div>
            </div>
          </div>
          <div className="ckp-header-actions">
            <button
              className="ckp-icon-btn"
              onClick={undo}
              disabled={past.length === 0}
              title="Urungkan (Ctrl+Z)"
              aria-label="Urungkan"
            >
              <Undo2 size={16} />
            </button>
            <button
              className="ckp-icon-btn"
              onClick={redo}
              disabled={future.length === 0}
              title="Ulangi (Ctrl+Y)"
              aria-label="Ulangi"
            >
              <Redo2 size={16} />
            </button>
            <div className="ckp-networth-chip">
              <span className="ckp-networth-label">Kekayaan Bersih</span>
              <span className="ckp-networth-value">{fmtRp(netWorth)}</span>
            </div>
          </div>
        </div>
        <nav className="ckp-tabs">
          {NAV.map(n => (
            <button
              key={n.id}
              className={"ckp-tab" + (tab === n.id ? " active" : "")}
              onClick={() => setTab(n.id)}
            >
              <n.icon size={16} />
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="ckp-main">
        {tab === "dashboard" && (
          <Dashboard
            balances={balances}
            totalAset={totalAset}
            totalKewajiban={totalKewajiban}
            netWorth={netWorth}
            transaksi={transaksi}
            budget={budget}
            categories={categories}
          />
        )}
        {tab === "transaksi" && (
          <Transaksi
            transaksi={transaksi}
            accounts={accounts}
            categories={categories}
            onAdd={addTransaksi}
            onDelete={deleteTransaksi}
          />
        )}
        {tab === "rekening" && (
          <Rekening accounts={accounts} balances={balances} transaksi={transaksi} />
        )}
        {tab === "anggaran" && (
          <Anggaran transaksi={transaksi} categories={categories} budget={budget} setBudget={setBudget} />
        )}
        {tab === "utangpiutang" && (
          <UtangPiutang
            utang={utang} setUtang={setUtang}
            piutang={piutang} setPiutang={setPiutang}
            accounts={accounts}
            addTransaksi={addTransaksi}
            showToast={showToast}
          />
        )}
        {tab === "tabungan" && (
          <TabunganInvestasi
            tabungan={tabungan} setTabungan={setTabungan}
            investasi={investasi} setInvestasi={setInvestasi}
            asetLain={asetLain} setAsetLain={setAsetLain}
            showToast={showToast}
          />
        )}
        {tab === "laporan" && (
          <Laporan transaksi={transaksi} />
        )}
      </main>

      {toast && <div className="ckp-toast">{toast}</div>}
    </div>
  );
}

/* ============================== DASHBOARD ============================== */

function Dashboard({ balances, totalAset, totalKewajiban, netWorth, transaksi, budget, categories }) {
  const now = new Date();
  const todayISO = toISO(now);
  const monday = startOfWeekMonday(now);
  const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
  const mondayISO = toISO(monday), sundayISO = toISO(sunday);
  const y = now.getFullYear(), m = now.getMonth() + 1;

  const today = periodTotals(transaksi, t => t.tanggal === todayISO);
  const week = periodTotals(transaksi, t => t.tanggal >= mondayISO && t.tanggal <= sundayISO);
  const monthT = periodTotals(transaksi, t => yearOf(t.tanggal) === y && monthOf(t.tanggal) === m);
  const yearT = periodTotals(transaksi, t => yearOf(t.tanggal) === y);

  const budgetYear = budget[String(y)] || {};
  const catMap = {};
  categories.forEach(c => { if (c.jenis === "Pengeluaran") catMap[c.kategori] = c.kepala; });

  const realisasi = {};
  transaksi.forEach(t => {
    if (t.jenis === "Pengeluaran" && yearOf(t.tanggal) === y && monthOf(t.tanggal) === m) {
      realisasi[t.kategori] = (realisasi[t.kategori] || 0) + (Number(t.jumlah) || 0);
    }
  });

  const totalBudget = Object.keys(catMap).reduce((s, k) => s + ((budgetYear[k] || [])[m - 1] || 0), 0);
  const totalRealisasi = Object.values(realisasi).reduce((s, v) => s + v, 0);
  const pctBudget = totalBudget > 0 ? (totalRealisasi / totalBudget) * 100 : 0;

  const topOver = Object.keys(catMap)
    .map(k => {
      const b = (budgetYear[k] || [])[m - 1] || 0;
      const r = realisasi[k] || 0;
      return { kategori: k, budget: b, realisasi: r, pct: b > 0 ? (r / b) * 100 : (r > 0 ? 999 : 0) };
    })
    .filter(x => x.budget > 0 || x.realisasi > 0)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5);

  return (
    <div className="ckp-page">
      <section className="ckp-card ckp-networth-card">
        <div className="ckp-ledger-row">
          <div>
            <div className="ckp-eyebrow">Neraca Kekayaan</div>
            <div className="ckp-networth-big">{fmtRp(netWorth)}</div>
          </div>
          <BadgeDollarSign size={28} className="ckp-gold-icon" />
        </div>
        <div className="ckp-networth-split">
          <div><span className="ckp-dim">Total Aset</span><div className="ckp-money pos">{fmtRp(totalAset)}</div></div>
          <div><span className="ckp-dim">Total Kewajiban</span><div className="ckp-money neg">{fmtRp(totalKewajiban)}</div></div>
        </div>
      </section>

      <section className="ckp-grid4">
        <SummaryCard title="Hari Ini" data={today} />
        <SummaryCard title={`Minggu Ini (${fmtDate(mondayISO)} - ${fmtDate(sundayISO)})`} data={week} />
        <SummaryCard title={`Bulan Ini (${MONTHS[m-1]} ${y})`} data={monthT} />
        <SummaryCard title={`Tahun Ini (${y})`} data={yearT} />
      </section>

      <section className="ckp-card">
        <div className="ckp-card-title">
          <span>Progress Anggaran — {MONTHS[m-1]} {y}</span>
          <span className="ckp-dim">{fmtRp(totalRealisasi)} / {fmtRp(totalBudget)}</span>
        </div>
        <ProgressBar pct={pctBudget} />
        <div className="ckp-mini-list">
          {topOver.length === 0 && <div className="ckp-empty">Belum ada anggaran atau transaksi bulan ini.</div>}
          {topOver.map(x => (
            <div className="ckp-mini-row" key={x.kategori}>
              <div className="ckp-mini-label">{x.kategori}</div>
              <div className="ckp-mini-bar"><ProgressBar pct={x.pct} small /></div>
              <div className="ckp-mini-val">{fmtRp(x.realisasi)} / {fmtRp(x.budget)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="ckp-card">
        <div className="ckp-card-title"><span>Saldo Rekening</span></div>
        <div className="ckp-account-strip">
          {Object.entries(balances).map(([nama, saldo]) => (
            <div className="ckp-account-pill" key={nama}>
              <span>{nama}</span>
              <strong>{fmtRp(saldo)}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ title, data }) {
  return (
    <div className="ckp-card ckp-summary-card">
      <div className="ckp-eyebrow">{title}</div>
      <div className="ckp-summary-net">{fmtRp(data.net)}</div>
      <div className="ckp-summary-rows">
        <div><ArrowUpCircle size={14} className="ckp-pos-icon" /> {fmtRp(data.income)}</div>
        <div><ArrowDownCircle size={14} className="ckp-neg-icon" /> {fmtRp(data.expense)}</div>
      </div>
      <div className="ckp-dim ckp-small">{data.count} transaksi</div>
    </div>
  );
}

function ProgressBar({ pct, small }) {
  const clamped = Math.min(100, Math.max(0, pct));
  const over = pct > 100;
  return (
    <div className={"ckp-progress" + (small ? " small" : "")}>
      <div
        className={"ckp-progress-fill" + (over ? " over" : "")}
        style={{ width: clamped + "%" }}
      />
    </div>
  );
}

/* ============================== TRANSAKSI ============================== */

function Transaksi({ transaksi, accounts, categories, onAdd, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterBulan, setFilterBulan] = useState("all");
  const [filterJenis, setFilterJenis] = useState("all");

  const sorted = useMemo(() => {
    return [...transaksi].sort((a, b) => (b.tanggal || "").localeCompare(a.tanggal || "") || (b.no - a.no));
  }, [transaksi]);

  const filtered = sorted.filter(t => {
    if (filterBulan !== "all" && monthOf(t.tanggal) !== Number(filterBulan)) return false;
    if (filterJenis !== "all" && t.jenis !== filterJenis) return false;
    if (search) {
      const q = search.toLowerCase();
      const hay = `${t.kategori || ""} ${t.keterangan || ""} ${t.rekening_asal || ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="ckp-page">
      <div className="ckp-toolbar">
        <div className="ckp-search">
          <Search size={16} />
          <input placeholder="Cari kategori / keterangan..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select value={filterBulan} onChange={e => setFilterBulan(e.target.value)}>
          <option value="all">Semua Bulan</option>
          {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
        </select>
        <select value={filterJenis} onChange={e => setFilterJenis(e.target.value)}>
          <option value="all">Semua Jenis</option>
          <option value="Pemasukan">Pemasukan</option>
          <option value="Pengeluaran">Pengeluaran</option>
          <option value="Transfer">Transfer</option>
        </select>
        <button className="ckp-btn-gold" onClick={() => setShowForm(true)}>
          <Plus size={16} /> Tambah
        </button>
      </div>

      <div className="ckp-card ckp-list-card">
        <div className="ckp-list-head">
          <span>{filtered.length} transaksi</span>
        </div>
        <div className="ckp-tx-list">
          {filtered.length === 0 && <div className="ckp-empty">Tidak ada transaksi yang cocok.</div>}
          {filtered.map(t => (
            <div className="ckp-tx-row" key={t.no}>
              <div className={"ckp-tx-icon " + t.jenis}>
                {t.jenis === "Pemasukan" && <ArrowUpCircle size={18} />}
                {t.jenis === "Pengeluaran" && <ArrowDownCircle size={18} />}
                {t.jenis === "Transfer" && <ArrowRightLeft size={18} />}
                {(t.jenis === "Utang" || t.jenis === "Piutang") && <HandCoins size={18} />}
              </div>
              <div className="ckp-tx-main">
                <div className="ckp-tx-top">
                  <span className="ckp-tx-kategori">{t.kategori || "-"}</span>
                  <span className={"ckp-tx-jumlah " + (t.jenis === "Pemasukan" ? "pos" : t.jenis === "Pengeluaran" ? "neg" : "")}>
                    {t.jenis === "Pemasukan" ? "+" : t.jenis === "Pengeluaran" ? "-" : ""}{fmtRp(t.jumlah)}
                  </span>
                </div>
                <div className="ckp-tx-bottom">
                  <span>{fmtDate(t.tanggal)} · {t.rekening_asal}{t.rekening_tujuan ? " → " + t.rekening_tujuan : ""}</span>
                  {t.keterangan && <span className="ckp-tx-note">"{t.keterangan}"</span>}
                </div>
              </div>
              <button className="ckp-tx-delete" onClick={() => onDelete(t.no)}><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <TransaksiForm
          accounts={accounts}
          categories={categories}
          onClose={() => setShowForm(false)}
          onSubmit={(t) => { onAdd(t); setShowForm(false); }}
        />
      )}
    </div>
  );
}

function TransaksiForm({ accounts, categories, onClose, onSubmit }) {
  const [jenis, setJenis] = useState("Pengeluaran");
  const [tanggal, setTanggal] = useState(toISO(new Date()));
  const [rekeningAsal, setRekeningAsal] = useState(accounts[0]?.nama || "");
  const [rekeningTujuan, setRekeningTujuan] = useState(accounts[1]?.nama || "");
  const [kategori, setKategori] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [jumlah, setJumlah] = useState("");

  const kategoriOptions = categories.filter(c => c.jenis === jenis);

  const submit = () => {
    const nominal = Number(jumlah);
    if (!nominal || nominal <= 0) return;
    if (jenis !== "Transfer" && !kategori) return;
    onSubmit({
      tanggal,
      rekening_asal: rekeningAsal,
      jenis,
      rekening_tujuan: jenis === "Transfer" ? rekeningTujuan : null,
      kategori: jenis === "Transfer" ? "Transfer Antar Rekening" : kategori,
      keterangan: keterangan || null,
      jumlah: nominal,
      saldo_setelah: null,
      ref_id: null,
    });
  };

  return (
    <div className="ckp-modal-backdrop" onClick={onClose}>
      <div className="ckp-modal" onClick={e => e.stopPropagation()}>
        <div className="ckp-modal-head">
          <span>Tambah Transaksi</span>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="ckp-jenis-toggle">
          {["Pemasukan", "Pengeluaran", "Transfer"].map(j => (
            <button key={j} className={jenis === j ? "active" : ""} onClick={() => { setJenis(j); setKategori(""); }}>{j}</button>
          ))}
        </div>
        <label>Tanggal
          <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} />
        </label>
        <label>{jenis === "Transfer" ? "Dari Rekening" : "Rekening"}
          <select value={rekeningAsal} onChange={e => setRekeningAsal(e.target.value)}>
            {accounts.map(a => <option key={a.kode} value={a.nama}>{a.nama}</option>)}
          </select>
        </label>
        {jenis === "Transfer" && (
          <label>Ke Rekening
            <select value={rekeningTujuan} onChange={e => setRekeningTujuan(e.target.value)}>
              {accounts.filter(a => a.nama !== rekeningAsal).map(a => <option key={a.kode} value={a.nama}>{a.nama}</option>)}
            </select>
          </label>
        )}
        {jenis !== "Transfer" && (
          <label>Kategori
            <select value={kategori} onChange={e => setKategori(e.target.value)}>
              <option value="">Pilih kategori</option>
              {kategoriOptions.map(c => <option key={c.kategori} value={c.kategori}>{c.kategori}</option>)}
            </select>
          </label>
        )}
        <label>Keterangan (opsional)
          <input value={keterangan} onChange={e => setKeterangan(e.target.value)} placeholder="Catatan singkat" />
        </label>
        <label>Jumlah
          <input type="number" value={jumlah} onChange={e => setJumlah(e.target.value)} placeholder="0" />
        </label>
        <button className="ckp-btn-gold ckp-btn-block" onClick={submit}>Simpan Transaksi</button>
      </div>
    </div>
  );
}

/* ============================== REKENING ============================== */

function Rekening({ accounts, balances, transaksi }) {
  const stats = accounts.map(a => {
    let masuk = 0, keluar = 0, transferMasuk = 0, transferKeluar = 0;
    transaksi.forEach(t => {
      if (t.rekening_asal === a.nama) {
        if (t.jenis === "Pemasukan") masuk += Number(t.jumlah) || 0;
        if (t.jenis === "Pengeluaran") keluar += Number(t.jumlah) || 0;
        if (t.jenis === "Transfer") transferKeluar += Number(t.jumlah) || 0;
      }
      if (t.rekening_tujuan === a.nama && t.jenis === "Transfer") transferMasuk += Number(t.jumlah) || 0;
    });
    return { ...a, masuk, keluar, transferMasuk, transferKeluar, saldo: balances[a.nama] || 0 };
  });

  const total = stats.reduce((s, a) => s + a.saldo, 0);

  return (
    <div className="ckp-page">
      <section className="ckp-card">
        <div className="ckp-card-title">
          <span>Total Kas & Bank</span>
          <span className="ckp-money pos ckp-big-num">{fmtRp(total)}</span>
        </div>
      </section>
      <div className="ckp-rek-grid">
        {stats.map(a => (
          <div className="ckp-card ckp-rek-card" key={a.kode}>
            <div className="ckp-rek-top">
              <div>
                <div className="ckp-rek-nama">{a.nama}</div>
                <div className="ckp-dim ckp-small">{a.jenis}{a.no_rek ? " · " + a.no_rek : ""}</div>
              </div>
              <Wallet size={20} className="ckp-gold-icon" />
            </div>
            <div className="ckp-rek-saldo">{fmtRp(a.saldo)}</div>
            <div className="ckp-rek-detail">
              <span>Masuk <b className="pos">{fmtRp(a.masuk)}</b></span>
              <span>Keluar <b className="neg">{fmtRp(a.keluar)}</b></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================== ANGGARAN ============================== */

function Anggaran({ transaksi, categories, budget, setBudget }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const budgetYear = budget[String(year)] || {};
  const expenseCats = categories.filter(c => c.jenis === "Pengeluaran");

  const realisasi = {};
  transaksi.forEach(t => {
    if (t.jenis === "Pengeluaran" && yearOf(t.tanggal) === year && monthOf(t.tanggal) === month) {
      realisasi[t.kategori] = (realisasi[t.kategori] || 0) + (Number(t.jumlah) || 0);
    }
  });

  const grouped = {};
  expenseCats.forEach(c => {
    grouped[c.kepala] = grouped[c.kepala] || [];
    grouped[c.kepala].push(c.kategori);
  });

  let totalBudget = 0, totalRealisasi = 0;

  const updateBudget = (kategori, value) => {
    setBudget(prev => {
      const yKey = String(year);
      const yearData = { ...(prev[yKey] || {}) };
      const arr = [...(yearData[kategori] || Array(12).fill(0))];
      arr[month - 1] = Number(value) || 0;
      yearData[kategori] = arr;
      return { ...prev, [yKey]: yearData };
    });
  };

  return (
    <div className="ckp-page">
      <div className="ckp-toolbar">
        <select value={month} onChange={e => setMonth(Number(e.target.value))}>
          {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
        </select>
        <select value={year} onChange={e => setYear(Number(e.target.value))}>
          {[2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {HEAD_ORDER.filter(h => grouped[h]).map(head => {
        let subBudget = 0, subReal = 0;
        const rows = grouped[head].map(kat => {
          const b = (budgetYear[kat] || [])[month - 1] || 0;
          const r = realisasi[kat] || 0;
          subBudget += b; subReal += r;
          totalBudget += b; totalRealisasi += r;
          return { kat, b, r };
        });
        return (
          <section className="ckp-card" key={head}>
            <div className="ckp-card-title">
              <span>{head}</span>
              <span className="ckp-dim">{fmtRp(subReal)} / {fmtRp(subBudget)}</span>
            </div>
            <div className="ckp-anggaran-list">
              {rows.map(({ kat, b, r }) => {
                const pct = b > 0 ? (r / b) * 100 : (r > 0 ? 999 : 0);
                return (
                  <div className="ckp-anggaran-row" key={kat}>
                    <div className="ckp-anggaran-label">{kat}</div>
                    <ProgressBar pct={pct} small />
                    <div className="ckp-anggaran-nums">
                      <span>{fmtRp(r)} / </span>
                      <input
                        type="number"
                        value={b}
                        onChange={e => updateBudget(kat, e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="ckp-card ckp-total-card">
        <div className="ckp-card-title">
          <span>TOTAL — {MONTHS[month - 1]} {year}</span>
          <span className="ckp-money">{fmtRp(totalRealisasi)} / {fmtRp(totalBudget)}</span>
        </div>
        <ProgressBar pct={totalBudget > 0 ? (totalRealisasi / totalBudget) * 100 : 0} />
      </section>
    </div>
  );
}

/* ============================== UTANG & PIUTANG ============================== */

function UtangPiutang({ utang, setUtang, piutang, setPiutang, accounts, addTransaksi, showToast }) {
  const [showUtangForm, setShowUtangForm] = useState(false);
  const [showPiutangForm, setShowPiutangForm] = useState(false);
  const [payFor, setPayFor] = useState(null); // { type: 'utang'|'piutang', item }

  const totalSisaUtang = utang.reduce((s, u) => s + Math.max(0, (u.jumlah || 0) - (u.dibayar || 0)), 0);
  const totalSisaPiutang = piutang.reduce((s, p) => s + Math.max(0, (p.jumlah || 0) - (p.kembali || 0)), 0);

  const addUtang = ({ tgl, dari, ket, jumlah, rekening }) => {
    const no = uid(utang);
    setUtang(prev => [...prev, { no, tgl, dari, ket, jumlah, dibayar: 0, sisa: jumlah, status: "Belum Lunas" }]);
    addTransaksi({ tanggal: tgl, rekening_asal: rekening, jenis: "Utang", rekening_tujuan: null, kategori: "Utang Diterima", keterangan: `Pinjam dari ${dari}${ket ? " — " + ket : ""}`, jumlah, saldo_setelah: null, ref_id: no });
    showToast("Utang baru dicatat");
  };

  const addPiutang = ({ tgl, kepada, ket, jumlah, rekening }) => {
    const no = uid(piutang);
    setPiutang(prev => [...prev, { no, tgl, kepada, ket, jumlah, kembali: 0, sisa: jumlah, status: "Belum Lunas" }]);
    addTransaksi({ tanggal: tgl, rekening_asal: rekening, jenis: "Piutang", rekening_tujuan: null, kategori: "Uang Dipinjam", keterangan: `Dipinjamkan ke ${kepada}${ket ? " — " + ket : ""}`, jumlah, saldo_setelah: null, ref_id: no });
    showToast("Piutang baru dicatat");
  };

  const payUtang = (item, amount, rekening) => {
    const newDibayar = Math.min(item.jumlah, (item.dibayar || 0) + amount);
    setUtang(prev => prev.map(u => u.no === item.no ? { ...u, dibayar: newDibayar, sisa: item.jumlah - newDibayar, status: newDibayar >= item.jumlah ? "Lunas" : "Belum Lunas" } : u));
    addTransaksi({ tanggal: toISO(new Date()), rekening_asal: rekening, jenis: "Utang", rekening_tujuan: null, kategori: "Utang Dibayar", keterangan: `Bayar utang ke ${item.dari}`, jumlah: amount, saldo_setelah: null, ref_id: item.no });
    showToast("Pembayaran utang dicatat");
    setPayFor(null);
  };

  const payPiutang = (item, amount, rekening) => {
    const newKembali = Math.min(item.jumlah, (item.kembali || 0) + amount);
    setPiutang(prev => prev.map(p => p.no === item.no ? { ...p, kembali: newKembali, sisa: item.jumlah - newKembali, status: newKembali >= item.jumlah ? "Lunas" : "Belum Lunas" } : p));
    addTransaksi({ tanggal: toISO(new Date()), rekening_asal: rekening, jenis: "Piutang", rekening_tujuan: null, kategori: "Uang Dikembalikan", keterangan: `Diterima kembali dari ${item.kepada}`, jumlah: amount, saldo_setelah: null, ref_id: item.no });
    showToast("Pengembalian piutang dicatat");
    setPayFor(null);
  };

  return (
    <div className="ckp-page">
      <section className="ckp-grid2">
        <div className="ckp-card">
          <div className="ckp-card-title"><span>Total Sisa Utang</span></div>
          <div className="ckp-money neg ckp-big-num">{fmtRp(totalSisaUtang)}</div>
        </div>
        <div className="ckp-card">
          <div className="ckp-card-title"><span>Total Sisa Piutang</span></div>
          <div className="ckp-money pos ckp-big-num">{fmtRp(totalSisaPiutang)}</div>
        </div>
      </section>

      <section className="ckp-card">
        <div className="ckp-card-title">
          <span>Utang Saya (ke orang lain)</span>
          <button className="ckp-btn-mini" onClick={() => setShowUtangForm(true)}><Plus size={14} /> Tambah</button>
        </div>
        <div className="ckp-hp-list">
          {utang.length === 0 && <div className="ckp-empty">Belum ada catatan utang.</div>}
          {utang.map(u => (
            <div className="ckp-hp-row" key={u.no}>
              <div className="ckp-hp-icon">{u.status === "Lunas" ? <CheckCircle2 size={18} className="pos" /> : <Circle size={18} className="neg" />}</div>
              <div className="ckp-hp-main">
                <div className="ckp-hp-top"><span>{u.dari}</span><span className="ckp-money neg">{fmtRp(u.jumlah - u.dibayar)}</span></div>
                <div className="ckp-dim ckp-small">{fmtDate(u.tgl)} · {u.ket || "-"} · dibayar {fmtRp(u.dibayar)} / {fmtRp(u.jumlah)}</div>
              </div>
              {u.status !== "Lunas" && <button className="ckp-btn-mini" onClick={() => setPayFor({ type: "utang", item: u })}>Bayar</button>}
            </div>
          ))}
        </div>
      </section>

      <section className="ckp-card">
        <div className="ckp-card-title">
          <span>Piutang Saya (dipinjamkan)</span>
          <button className="ckp-btn-mini" onClick={() => setShowPiutangForm(true)}><Plus size={14} /> Tambah</button>
        </div>
        <div className="ckp-hp-list">
          {piutang.length === 0 && <div className="ckp-empty">Belum ada catatan piutang.</div>}
          {piutang.map(p => (
            <div className="ckp-hp-row" key={p.no}>
              <div className="ckp-hp-icon">{p.status === "Lunas" ? <CheckCircle2 size={18} className="pos" /> : <Circle size={18} className="neg" />}</div>
              <div className="ckp-hp-main">
                <div className="ckp-hp-top"><span>{p.kepada}</span><span className="ckp-money pos">{fmtRp(p.jumlah - p.kembali)}</span></div>
                <div className="ckp-dim ckp-small">{fmtDate(p.tgl)} · {p.ket || "-"} · kembali {fmtRp(p.kembali)} / {fmtRp(p.jumlah)}</div>
              </div>
              {p.status !== "Lunas" && <button className="ckp-btn-mini" onClick={() => setPayFor({ type: "piutang", item: p })}>Terima</button>}
            </div>
          ))}
        </div>
      </section>

      {showUtangForm && (
        <HutangForm
          title="Tambah Utang"
          personLabel="Dari Siapa"
          accounts={accounts}
          onClose={() => setShowUtangForm(false)}
          onSubmit={(v) => { addUtang(v); setShowUtangForm(false); }}
        />
      )}
      {showPiutangForm && (
        <HutangForm
          title="Tambah Piutang"
          personLabel="Kepada Siapa"
          accounts={accounts}
          onClose={() => setShowPiutangForm(false)}
          onSubmit={(v) => { addPiutang({ ...v, kepada: v.dari }); setShowPiutangForm(false); }}
        />
      )}
      {payFor && (
        <PayForm
          item={payFor.item}
          type={payFor.type}
          accounts={accounts}
          onClose={() => setPayFor(null)}
          onSubmit={(amount, rekening) => payFor.type === "utang" ? payUtang(payFor.item, amount, rekening) : payPiutang(payFor.item, amount, rekening)}
        />
      )}
    </div>
  );
}

function HutangForm({ title, personLabel, accounts, onClose, onSubmit }) {
  const [tgl, setTgl] = useState(toISO(new Date()));
  const [dari, setDari] = useState("");
  const [ket, setKet] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [rekening, setRekening] = useState(accounts[0]?.nama || "");

  const submit = () => {
    const nominal = Number(jumlah);
    if (!dari || !nominal) return;
    onSubmit({ tgl, dari, ket, jumlah: nominal, rekening });
  };

  return (
    <div className="ckp-modal-backdrop" onClick={onClose}>
      <div className="ckp-modal" onClick={e => e.stopPropagation()}>
        <div className="ckp-modal-head"><span>{title}</span><button onClick={onClose}><X size={18} /></button></div>
        <label>Tanggal<input type="date" value={tgl} onChange={e => setTgl(e.target.value)} /></label>
        <label>{personLabel}<input value={dari} onChange={e => setDari(e.target.value)} placeholder="Nama" /></label>
        <label>Keterangan (opsional)<input value={ket} onChange={e => setKet(e.target.value)} /></label>
        <label>Jumlah<input type="number" value={jumlah} onChange={e => setJumlah(e.target.value)} placeholder="0" /></label>
        <label>Rekening
          <select value={rekening} onChange={e => setRekening(e.target.value)}>
            {accounts.map(a => <option key={a.kode} value={a.nama}>{a.nama}</option>)}
          </select>
        </label>
        <button className="ckp-btn-gold ckp-btn-block" onClick={submit}>Simpan</button>
      </div>
    </div>
  );
}

function PayForm({ item, type, accounts, onClose, onSubmit }) {
  const sisa = item.jumlah - (type === "utang" ? item.dibayar : item.kembali);
  const [amount, setAmount] = useState(sisa);
  const [rekening, setRekening] = useState(accounts[0]?.nama || "");

  return (
    <div className="ckp-modal-backdrop" onClick={onClose}>
      <div className="ckp-modal" onClick={e => e.stopPropagation()}>
        <div className="ckp-modal-head">
          <span>{type === "utang" ? "Bayar Utang" : "Terima Piutang"}</span>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="ckp-dim">Sisa: {fmtRp(sisa)}</div>
        <label>Jumlah<input type="number" value={amount} onChange={e => setAmount(e.target.value)} /></label>
        <label>Rekening
          <select value={rekening} onChange={e => setRekening(e.target.value)}>
            {accounts.map(a => <option key={a.kode} value={a.nama}>{a.nama}</option>)}
          </select>
        </label>
        <button className="ckp-btn-gold ckp-btn-block" onClick={() => onSubmit(Math.min(Number(amount) || 0, sisa), rekening)}>Simpan</button>
      </div>
    </div>
  );
}

/* ======================= TABUNGAN & TARGET + INVESTASI ======================= */

function TabunganInvestasi({ tabungan, setTabungan, investasi, setInvestasi, asetLain, setAsetLain, showToast }) {
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showInvForm, setShowInvForm] = useState(false);

  const totalTarget = tabungan.reduce((s, g) => s + (Number(g.target) || 0), 0);
  const totalTerkumpul = tabungan.reduce((s, g) => s + (Number(g.terkumpul) || 0), 0);

  const totalModal = investasi.reduce((s, i) => s + (Number(i.modal) || 0), 0);
  const totalNilai = investasi.reduce((s, i) => s + (Number(i.nilai_sekarang) || 0), 0);
  const untungRugi = totalNilai - totalModal;

  const addGoal = (g) => {
    const no = uid(tabungan);
    setTabungan(prev => [...prev, { no, ...g }]);
    showToast("Target tabungan ditambahkan");
  };

  const addInv = (i) => {
    const no = uid(investasi);
    setInvestasi(prev => [...prev, { no, ...i }]);
    showToast("Investasi ditambahkan");
  };

  const removeGoal = (no) => setTabungan(prev => prev.filter(g => g.no !== no));
  const removeInv = (no) => setInvestasi(prev => prev.filter(i => i.no !== no));

  return (
    <div className="ckp-page">
      <section className="ckp-card">
        <div className="ckp-card-title">
          <span>Tabungan & Target</span>
          <button className="ckp-btn-mini" onClick={() => setShowGoalForm(true)}><Plus size={14} /> Tambah</button>
        </div>
        <div className="ckp-grid2" style={{ marginBottom: 12 }}>
          <div><span className="ckp-dim ckp-small">Total Target</span><div className="ckp-money">{fmtRp(totalTarget)}</div></div>
          <div><span className="ckp-dim ckp-small">Total Terkumpul</span><div className="ckp-money pos">{fmtRp(totalTerkumpul)}</div></div>
        </div>
        <div className="ckp-goal-list">
          {tabungan.length === 0 && <div className="ckp-empty">Belum ada target tabungan. Uang tabungan sudah termasuk di saldo kas & bank.</div>}
          {tabungan.map(g => {
            const pct = g.target > 0 ? (g.terkumpul / g.target) * 100 : 0;
            return (
              <div className="ckp-goal-row" key={g.no}>
                <div className="ckp-goal-top">
                  <span>{g.nama}</span>
                  <button className="ckp-tx-delete" onClick={() => removeGoal(g.no)}><Trash2 size={14} /></button>
                </div>
                <ProgressBar pct={pct} small />
                <div className="ckp-dim ckp-small">{fmtRp(g.terkumpul)} / {fmtRp(g.target)} {g.tanggal ? "· target " + fmtDate(g.tanggal) : ""}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="ckp-card">
        <div className="ckp-card-title">
          <span>Investasi</span>
          <button className="ckp-btn-mini" onClick={() => setShowInvForm(true)}><Plus size={14} /> Tambah</button>
        </div>
        <div className="ckp-grid2" style={{ marginBottom: 12 }}>
          <div><span className="ckp-dim ckp-small">Total Nilai Saat Ini</span><div className="ckp-money">{fmtRp(totalNilai)}</div></div>
          <div><span className="ckp-dim ckp-small">Untung / Rugi</span><div className={"ckp-money " + (untungRugi >= 0 ? "pos" : "neg")}>{fmtRp(untungRugi)}</div></div>
        </div>
        <div className="ckp-goal-list">
          {investasi.length === 0 && <div className="ckp-empty">Belum ada catatan investasi.</div>}
          {investasi.map(i => {
            const gain = (Number(i.nilai_sekarang) || 0) - (Number(i.modal) || 0);
            const pctReturn = i.modal > 0 ? (gain / i.modal) * 100 : 0;
            return (
              <div className="ckp-goal-row" key={i.no}>
                <div className="ckp-goal-top">
                  <span>{i.nama} <span className="ckp-dim ckp-small">({i.jenis})</span></span>
                  <button className="ckp-tx-delete" onClick={() => removeInv(i.no)}><Trash2 size={14} /></button>
                </div>
                <div className="ckp-dim ckp-small">
                  Modal {fmtRp(i.modal)} → Sekarang {fmtRp(i.nilai_sekarang)}
                  <span className={gain >= 0 ? "pos" : "neg"}> ({gain >= 0 ? "+" : ""}{pctReturn.toFixed(1)}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="ckp-card">
        <div className="ckp-card-title"><span>Aset Lain-lain (manual)</span></div>
        <label>Contoh: kendaraan, properti, emas fisik
          <input type="number" value={asetLain} onChange={e => setAsetLain(Number(e.target.value) || 0)} />
        </label>
      </section>

      {showGoalForm && (
        <GoalForm onClose={() => setShowGoalForm(false)} onSubmit={(g) => { addGoal(g); setShowGoalForm(false); }} />
      )}
      {showInvForm && (
        <InvForm onClose={() => setShowInvForm(false)} onSubmit={(i) => { addInv(i); setShowInvForm(false); }} />
      )}
    </div>
  );
}

function GoalForm({ onClose, onSubmit }) {
  const [nama, setNama] = useState("");
  const [target, setTarget] = useState("");
  const [terkumpul, setTerkumpul] = useState("");
  const [tanggal, setTanggal] = useState("");

  return (
    <div className="ckp-modal-backdrop" onClick={onClose}>
      <div className="ckp-modal" onClick={e => e.stopPropagation()}>
        <div className="ckp-modal-head"><span>Tambah Target Tabungan</span><button onClick={onClose}><X size={18} /></button></div>
        <label>Nama Target<input value={nama} onChange={e => setNama(e.target.value)} placeholder="Dana darurat, liburan, dll" /></label>
        <label>Target Jumlah<input type="number" value={target} onChange={e => setTarget(e.target.value)} /></label>
        <label>Sudah Terkumpul<input type="number" value={terkumpul} onChange={e => setTerkumpul(e.target.value)} /></label>
        <label>Target Tanggal (opsional)<input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} /></label>
        <button className="ckp-btn-gold ckp-btn-block" onClick={() => {
          if (!nama || !target) return;
          onSubmit({ nama, target: Number(target), terkumpul: Number(terkumpul) || 0, tanggal });
        }}>Simpan</button>
      </div>
    </div>
  );
}

function InvForm({ onClose, onSubmit }) {
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [tanggal, setTanggal] = useState(toISO(new Date()));
  const [modal, setModal] = useState("");
  const [nilaiSekarang, setNilaiSekarang] = useState("");

  return (
    <div className="ckp-modal-backdrop" onClick={onClose}>
      <div className="ckp-modal" onClick={e => e.stopPropagation()}>
        <div className="ckp-modal-head"><span>Tambah Investasi</span><button onClick={onClose}><X size={18} /></button></div>
        <label>Nama Investasi<input value={nama} onChange={e => setNama(e.target.value)} placeholder="Reksadana X, Saham Y, Emas" /></label>
        <label>Jenis<input value={jenis} onChange={e => setJenis(e.target.value)} placeholder="Saham / Reksadana / Emas / lainnya" /></label>
        <label>Tanggal Beli<input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} /></label>
        <label>Modal Awal<input type="number" value={modal} onChange={e => setModal(e.target.value)} /></label>
        <label>Nilai Saat Ini<input type="number" value={nilaiSekarang} onChange={e => setNilaiSekarang(e.target.value)} /></label>
        <button className="ckp-btn-gold ckp-btn-block" onClick={() => {
          if (!nama || !modal) return;
          onSubmit({ nama, jenis, tanggal, modal: Number(modal), nilai_sekarang: Number(nilaiSekarang) || Number(modal) });
        }}>Simpan</button>
      </div>
    </div>
  );
}

/* ============================== LAPORAN TAHUNAN ============================== */

function Laporan({ transaksi }) {
  const years = Array.from(new Set(transaksi.map(t => yearOf(t.tanggal)).filter(Boolean))).sort();
  const now = new Date();
  const [year, setYear] = useState(years.includes(now.getFullYear()) ? now.getFullYear() : (years[years.length - 1] || now.getFullYear()));

  const data = MONTHS.map((label, idx) => {
    const m = idx + 1;
    const t = periodTotals(transaksi, tx => yearOf(tx.tanggal) === year && monthOf(tx.tanggal) === m);
    return { bulan: label, Pemasukan: t.income, Pengeluaran: t.expense, Selisih: t.net };
  });

  const totalIncome = data.reduce((s, d) => s + d.Pemasukan, 0);
  const totalExpense = data.reduce((s, d) => s + d.Pengeluaran, 0);

  return (
    <div className="ckp-page">
      <div className="ckp-toolbar">
        <select value={year} onChange={e => setYear(Number(e.target.value))}>
          {(years.length ? years : [now.getFullYear()]).map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      <section className="ckp-grid2">
        <div className="ckp-card"><span className="ckp-dim ckp-small">Total Pemasukan {year}</span><div className="ckp-money pos ckp-big-num">{fmtRp(totalIncome)}</div></div>
        <div className="ckp-card"><span className="ckp-dim ckp-small">Total Pengeluaran {year}</span><div className="ckp-money neg ckp-big-num">{fmtRp(totalExpense)}</div></div>
      </section>

      <section className="ckp-card" style={{ height: 340 }}>
        <div className="ckp-card-title"><span>Tren Bulanan {year}</span></div>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3a4356" />
            <XAxis dataKey="bulan" stroke="#cfc7b3" fontSize={12} />
            <YAxis stroke="#cfc7b3" fontSize={11} tickFormatter={(v) => (v / 1000) + "k"} />
            <Tooltip formatter={(v) => fmtRp(v)} contentStyle={{ background: "#1f2937", border: "1px solid #3a4356", color: "#f4efe6" }} />
            <Legend />
            <Bar dataKey="Pemasukan" fill="#c99a3e" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Pengeluaran" fill="#b5533c" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="ckp-card">
        <div className="ckp-card-title"><span>Rincian per Bulan</span></div>
        <table className="ckp-table">
          <thead><tr><th>Bulan</th><th>Pemasukan</th><th>Pengeluaran</th><th>Selisih</th></tr></thead>
          <tbody>
            {data.map(d => (
              <tr key={d.bulan}>
                <td>{d.bulan}</td>
                <td className="pos">{fmtRp(d.Pemasukan)}</td>
                <td className="neg">{fmtRp(d.Pengeluaran)}</td>
                <td className={d.Selisih >= 0 ? "pos" : "neg"}>{fmtRp(d.Selisih)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

/* ============================== STYLES ============================== */

const CSS = `
  * { box-sizing: border-box; }
  .ckp-root {
    min-height: 100vh;
    background: #161d29;
    background-image: radial-gradient(circle at 20% 0%, #1c2536 0%, #161d29 55%);
    color: #ece6d8;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    padding-bottom: 32px;
  }
  .ckp-header {
    position: sticky; top: 0; z-index: 20;
    background: #10151f;
    border-bottom: 1px solid #2c3446;
  }
  .ckp-header-inner {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px 10px;
    flex-wrap: wrap; gap: 10px;
  }
  .ckp-brand { display: flex; align-items: center; gap: 10px; }
  .ckp-brand-mark {
    width: 40px; height: 40px; border-radius: 8px;
    background: linear-gradient(135deg, #c99a3e, #8a6a24);
    display: flex; align-items: center; justify-content: center;
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 700; font-size: 13px; color: #1a1206;
    letter-spacing: 0.5px;
  }
  .ckp-brand-title {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 16px; font-weight: 700; color: #f4efe6;
  }
  .ckp-brand-sub { font-size: 11px; color: #8b93a7; margin-top: 1px; }
  .ckp-networth-chip {
    display: flex; flex-direction: column; align-items: flex-end;
    background: #1c2536; border: 1px solid #3a4356; border-radius: 10px;
    padding: 6px 12px;
  }
  .ckp-networth-label { font-size: 10px; color: #8b93a7; text-transform: uppercase; letter-spacing: 0.6px; }
  .ckp-networth-value { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 15px; font-weight: 700; color: #d8b874; }

  .ckp-header-actions { display: flex; align-items: center; gap: 8px; }
  .ckp-icon-btn {
    display: flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; border-radius: 8px;
    background: #1c2536; border: 1px solid #3a4356; color: #d8b874;
    cursor: pointer; flex-shrink: 0;
  }
  .ckp-icon-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .ckp-icon-btn:not(:disabled):active { background: #2a3346; }

  .ckp-tabs {
    display: flex; gap: 4px; overflow-x: auto; padding: 0 12px 10px;
    scrollbar-width: none;
  }
  .ckp-tabs::-webkit-scrollbar { display: none; }
  .ckp-tab {
    display: flex; align-items: center; gap: 6px; white-space: nowrap;
    background: transparent; border: 1px solid transparent; color: #9aa3b8;
    padding: 7px 12px; border-radius: 999px; font-size: 12.5px; cursor: pointer;
    flex-shrink: 0;
  }
  .ckp-tab.active { background: #2a3346; border-color: #c99a3e; color: #f4efe6; }

  .ckp-main { max-width: 720px; margin: 0 auto; padding: 16px; }
  .ckp-page { display: flex; flex-direction: column; gap: 14px; }

  .ckp-card {
    background: #f4efe6; color: #23262b;
    border-radius: 12px; padding: 16px;
    box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 6px 16px rgba(0,0,0,0.25);
    border: 1px solid #d9cfb8;
  }
  .ckp-networth-card { background: linear-gradient(155deg, #f4efe6 0%, #ece0c4 100%); }
  .ckp-ledger-row { display: flex; align-items: flex-start; justify-content: space-between; }
  .ckp-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #86754f; font-weight: 600; }
  .ckp-networth-big { font-family: Georgia, serif; font-size: 30px; font-weight: 700; margin-top: 4px; color: #1e2430; }
  .ckp-gold-icon { color: #b5883a; }
  .ckp-networth-split { display: flex; gap: 24px; margin-top: 14px; }
  .ckp-dim { font-size: 11.5px; color: #7c7563; }
  .ckp-small { font-size: 11px; }
  .ckp-money { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-weight: 700; font-size: 15px; }
  .ckp-money.pos { color: #3d7a4f; }
  .ckp-money.neg { color: #a3402d; }
  .ckp-big-num { font-size: 22px; margin-top: 4px; }

  .ckp-grid4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .ckp-grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  @media (min-width: 640px) { .ckp-grid4 { grid-template-columns: repeat(4, 1fr); } }

  .ckp-summary-card { padding: 12px; }
  .ckp-summary-net { font-family: ui-monospace, monospace; font-size: 18px; font-weight: 700; margin: 4px 0 6px; }
  .ckp-summary-rows { display: flex; flex-direction: column; gap: 2px; font-size: 12.5px; font-family: ui-monospace, monospace; }
  .ckp-summary-rows div { display: flex; align-items: center; gap: 5px; }
  .ckp-pos-icon { color: #3d7a4f; } .ckp-neg-icon { color: #a3402d; }

  .ckp-card-title { display: flex; align-items: center; justify-content: space-between; font-weight: 700; margin-bottom: 10px; font-size: 14px; gap: 8px; flex-wrap: wrap; }

  .ckp-progress { height: 8px; background: #ddd2b3; border-radius: 999px; overflow: hidden; }
  .ckp-progress.small { height: 6px; }
  .ckp-progress-fill { height: 100%; background: linear-gradient(90deg, #c99a3e, #8a6a24); border-radius: 999px; }
  .ckp-progress-fill.over { background: linear-gradient(90deg, #c1543a, #8c2f1c); }

  .ckp-mini-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
  .ckp-mini-row { display: grid; grid-template-columns: 90px 1fr auto; align-items: center; gap: 8px; font-size: 11.5px; }
  .ckp-mini-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ckp-mini-val { font-family: ui-monospace, monospace; white-space: nowrap; font-size: 11px; }

  .ckp-account-strip { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
  .ckp-account-pill {
    flex-shrink: 0; background: #e7dcc0; border: 1px solid #d1c295; border-radius: 8px;
    padding: 8px 12px; display: flex; flex-direction: column; gap: 3px; min-width: 110px;
  }
  .ckp-account-pill span { font-size: 10.5px; color: #7c7563; }
  .ckp-account-pill strong { font-family: ui-monospace, monospace; font-size: 13px; }

  .ckp-toolbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .ckp-toolbar select {
    background: #1c2536; color: #ece6d8; border: 1px solid #3a4356; border-radius: 8px;
    padding: 8px 10px; font-size: 12.5px;
  }
  .ckp-search {
    display: flex; align-items: center; gap: 6px; background: #1c2536; border: 1px solid #3a4356;
    border-radius: 8px; padding: 7px 10px; flex: 1; min-width: 160px; color: #8b93a7;
  }
  .ckp-search input { background: transparent; border: none; outline: none; color: #ece6d8; font-size: 13px; width: 100%; }
  .ckp-btn-gold {
    display: flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #d8b874, #b5883a);
    color: #241a06; border: none; border-radius: 8px; padding: 9px 14px; font-weight: 700; font-size: 13px; cursor: pointer;
  }
  .ckp-btn-block { width: 100%; justify-content: center; margin-top: 6px; }
  .ckp-btn-mini {
    display: flex; align-items: center; gap: 4px; background: #e7dcc0; border: 1px solid #d1c295;
    border-radius: 999px; padding: 5px 10px; font-size: 11.5px; font-weight: 600; cursor: pointer; color: #4a4230;
  }

  .ckp-list-card { padding: 12px 16px; }
  .ckp-list-head { font-size: 11.5px; color: #7c7563; margin-bottom: 6px; }
  .ckp-tx-list { display: flex; flex-direction: column; max-height: 560px; overflow-y: auto; }
  .ckp-tx-row {
    display: flex; align-items: flex-start; gap: 10px; padding: 10px 0;
    border-bottom: 1px dashed #d9cfb8;
  }
  .ckp-tx-row:last-child { border-bottom: none; }
  .ckp-tx-icon { flex-shrink: 0; margin-top: 2px; color: #8b7d55; }
  .ckp-tx-icon.Pemasukan { color: #3d7a4f; }
  .ckp-tx-icon.Pengeluaran { color: #a3402d; }
  .ckp-tx-main { flex: 1; min-width: 0; }
  .ckp-tx-top { display: flex; justify-content: space-between; gap: 8px; font-weight: 600; font-size: 13.5px; }
  .ckp-tx-jumlah { font-family: ui-monospace, monospace; white-space: nowrap; }
  .ckp-tx-jumlah.pos { color: #3d7a4f; } .ckp-tx-jumlah.neg { color: #a3402d; }
  .ckp-tx-bottom { display: flex; flex-direction: column; gap: 1px; font-size: 11px; color: #7c7563; margin-top: 2px; }
  .ckp-tx-note { font-style: italic; }
  .ckp-tx-delete { background: none; border: none; color: #b4a887; cursor: pointer; padding: 4px; }
  .ckp-tx-delete:hover { color: #a3402d; }

  .ckp-empty { font-size: 12.5px; color: #8b7d55; padding: 10px 0; text-align: center; }

  .ckp-modal-backdrop {
    position: fixed; inset: 0; background: rgba(10,13,20,0.6); backdrop-filter: blur(2px);
    display: flex; align-items: flex-end; justify-content: center; z-index: 50;
  }
  .ckp-modal {
    background: #f4efe6; color: #23262b; width: 100%; max-width: 480px;
    border-radius: 16px 16px 0 0; padding: 18px 18px 24px; max-height: 88vh; overflow-y: auto;
    display: flex; flex-direction: column; gap: 10px;
  }
  @media (min-width: 640px) {
    .ckp-modal-backdrop { align-items: center; }
    .ckp-modal { border-radius: 16px; }
  }
  .ckp-modal-head { display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 15px; margin-bottom: 4px; }
  .ckp-modal-head button { background: none; border: none; cursor: pointer; color: #7c7563; }
  .ckp-modal label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: #5a5544; font-weight: 600; }
  .ckp-modal input, .ckp-modal select {
    background: #fff; border: 1px solid #d1c295; border-radius: 8px; padding: 9px 10px; font-size: 13.5px; color: #23262b;
  }
  .ckp-jenis-toggle { display: flex; gap: 6px; margin-bottom: 4px; }
  .ckp-jenis-toggle button {
    flex: 1; padding: 8px; border-radius: 8px; border: 1px solid #d1c295; background: #fff; font-size: 12.5px; cursor: pointer; font-weight: 600;
  }
  .ckp-jenis-toggle button.active { background: #c99a3e; color: #241a06; border-color: #c99a3e; }

  .ckp-rek-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  @media (min-width: 640px) { .ckp-rek-grid { grid-template-columns: repeat(3, 1fr); } }
  .ckp-rek-card { padding: 14px; }
  .ckp-rek-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .ckp-rek-nama { font-weight: 700; font-size: 13.5px; }
  .ckp-rek-saldo { font-family: ui-monospace, monospace; font-size: 17px; font-weight: 700; margin: 8px 0 6px; }
  .ckp-rek-detail { display: flex; flex-direction: column; gap: 2px; font-size: 11px; color: #7c7563; }
  .ckp-rek-detail b { font-family: ui-monospace, monospace; }
  .ckp-rek-detail b.pos { color: #3d7a4f; } .ckp-rek-detail b.neg { color: #a3402d; }

  .ckp-anggaran-list { display: flex; flex-direction: column; gap: 10px; }
  .ckp-anggaran-row { display: grid; grid-template-columns: 1fr; gap: 4px; }
  .ckp-anggaran-label { font-size: 12.5px; font-weight: 600; }
  .ckp-anggaran-nums { display: flex; align-items: center; gap: 4px; font-family: ui-monospace, monospace; font-size: 11.5px; }
  .ckp-anggaran-nums input {
    width: 90px; background: #fff; border: 1px solid #d1c295; border-radius: 6px; padding: 3px 6px; font-size: 11.5px;
    font-family: ui-monospace, monospace;
  }
  .ckp-total-card { border: 2px solid #c99a3e; }

  .ckp-hp-list { display: flex; flex-direction: column; gap: 8px; }
  .ckp-hp-row { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px dashed #d9cfb8; }
  .ckp-hp-row:last-child { border-bottom: none; }
  .ckp-hp-icon .pos { color: #3d7a4f; } .ckp-hp-icon .neg { color: #b4a887; }
  .ckp-hp-main { flex: 1; }
  .ckp-hp-top { display: flex; justify-content: space-between; font-weight: 600; font-size: 13px; }

  .ckp-goal-list { display: flex; flex-direction: column; gap: 12px; }
  .ckp-goal-row { display: flex; flex-direction: column; gap: 4px; }
  .ckp-goal-top { display: flex; justify-content: space-between; font-weight: 600; font-size: 13px; align-items: center; }
  .ckp-goal-top .pos { color: #3d7a4f; } .ckp-goal-top .neg { color: #a3402d; }

  .ckp-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  .ckp-table th { text-align: left; color: #7c7563; font-weight: 600; padding: 6px 4px; border-bottom: 1px solid #d9cfb8; }
  .ckp-table td { padding: 6px 4px; border-bottom: 1px dashed #e2d9c2; font-family: ui-monospace, monospace; }
  .ckp-table td.pos { color: #3d7a4f; } .ckp-table td.neg { color: #a3402d; }

  .ckp-toast {
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: #1c2536; color: #f4efe6; border: 1px solid #c99a3e; padding: 10px 18px;
    border-radius: 999px; font-size: 13px; z-index: 60; box-shadow: 0 6px 20px rgba(0,0,0,0.35);
  }
`;
