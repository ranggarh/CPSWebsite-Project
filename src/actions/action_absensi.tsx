// useFetchAbsensi.ts
import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from './firebase'; // Pastikan ini mengarah ke konfigurasi Firebase yang benar

// Tentukan tipe data
interface Absensi {
  nama: string;
  waktu: string;
  alasan: string;
  buktiFoto: string;
  jabatan: string;
  lokasiPulang: string;
  status: string;
  waktuPulang: string;
}

type AbsensiData = Record<string, Absensi>;

const useFetchAbsensi = () => {
  const [absensiData, setAbsensiData] = useState<AbsensiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const absensiRef = ref(database, 'absensi');
        const snapshot = await get(absensiRef);
        if (snapshot.exists()) {
          setAbsensiData(snapshot.val() as AbsensiData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        setError('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { absensiData, loading, error };
};

export default useFetchAbsensi;
