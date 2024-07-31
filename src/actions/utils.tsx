// filterUtils.ts

import { SubCollection } from '../../src/content/employee/absensiPegawai'; // Pastikan path sesuai dengan lokasi file Anda

/**
 * Menghitung jumlah absensi per lokasi dari data absensi yang telah difilter.
 * @param data - Data absensi yang telah difilter.
 * @returns - Objek yang berisi jumlah absensi per lokasi.
 */
export const countAbsensiByLocation = (data: SubCollection[]): { [key: string]: number } => {
  return data.reduce((counts, item) => {
    const location = item.lokasiMasuk;
    counts[location] = (counts[location] || 0) + 1;
    return counts;
  }, {} as { [key: string]: number });
};
