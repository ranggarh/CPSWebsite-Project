import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../actions/firebase';
import fetchEmployeeData from '../../actions/action';
import DataTable from 'react-data-table-component';
import { parse } from 'date-fns';


// Definisi tipe data untuk entri absensi dalam subkoleksi kedua
export interface SubCollection {
  hari: string;
  lokasiMasuk: string;
  lokasiPulang: string;
  status: string;
  waktuMasuk: string;
  waktuPulang: string;
}

// Definisi tipe data untuk absensi pada tingkat pertama
interface Absensi {
  [subKey: string]: SubCollection;
}

type AbsensiData = Record<string, Absensi>;

// Daftar lokasi
const locations = [
  { name: 'Kantor Centralindo Pancasakti', latitude: -7.3222706, longitude: 112.6507618, address: 'Jl. Raya Bangkingan No.89, Bangkingan, Kec. Lakarsantri, Surabaya, Jawa Timur 61177' },
  { name: 'Kantor STO Telkom Karang Pilang', latitude: -7.3330869, longitude: 112.6955663 , address: 'Jl. Balas Klumprik No.3, Balas Klumprik, Kec. Karangpilang, Surabaya, Jawa Timur 60222'},
  { name: 'Kantor STO Telkom Bambe', latitude: -7.3654041, longitude: 112.6254287, address: 'Jl. Raya Cangkir No.4, Dusun Wates, Cangkir, Kec. Driyorejo, Kabupaten Gresik, Jawa Timur 61177' },
  { name: 'Kantor STO Telkom Kandangan', latitude: -7.2683754, longitude: 112.6651055, address:'Jl. Wonorejo I No.1A, Manukan Kulon, Kec. Tandes, Surabaya, Jawa Timur 60185' },
  { name: 'Kantor STO Telkom Kebalen', latitude: -7.2314511, longitude: 112.7347862, address: 'Jl. Kalisosok Jl. Dapuan Bend. Gg. I No.12, Krembangan Sel., Kec. Krembangan, Surabaya, Jawa Timur 60175' },
];

// Daftar status absensi
const statuses = [
  'Masuk',
  'Alpa',
  'Izin'
];


const AbsensiPegawai = () => {
  const [absensiData, setAbsensiData] = useState<AbsensiData | null>(null);
  const [employeeData, setEmployeeData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [absensiSnapshot, employeeList] = await Promise.all([
          get(ref(database, 'absensi')),
          fetchEmployeeData()
        ]);

        if (absensiSnapshot.exists()) {
          setAbsensiData(absensiSnapshot.val() as AbsensiData);
        } else {
          setAbsensiData(null);
        }

        const employeeMap = employeeList.reduce((acc, employee) => {
          acc[employee.id] = employee.nama;
          return acc;
        }, {} as { [key: string]: string });

        setEmployeeData(employeeMap);
      } catch (error) {
        setError('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
  };

  const handleLocationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterLocation(e.target.value);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  }

  const filteredData = absensiData
    ? Object.keys(absensiData).flatMap((employeeId) =>
        Object.keys(absensiData[employeeId]).map((subKey) => ({
          employeeId,
          ...absensiData[employeeId][subKey],
        }))
      ).filter((item) => {
        // Date filter
        const matchesDate = !filterDate || (
          item.waktuMasuk && 
          parse(item.waktuMasuk, 'dd/MM/yyyy HH.mm.ss', new Date()).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
        );

        // Name filter
        const employeeName = employeeData[item.employeeId] || 'Unknown';
        const matchesName = !filterName || employeeName.toLowerCase().includes(filterName.toLowerCase());

        // Location filter
        const matchesLocation = !filterLocation || item.lokasiMasuk === filterLocation;

        // Status filter
        const matchesStatus = !filterStatus || item.status === filterStatus;

        return matchesDate && matchesName && matchesLocation && matchesStatus;
      })
    : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const columns = [
    { 
        name: 'Nomor', 
        selector: (row: any, index: number) => `${index + 1}`, 
        sortable: true,
        width: "60px",
    },
    { 
        name: 'Nama Pegawai', 
        selector: (row: any) => employeeData[row.employeeId] || 'Unknown', 
        sortable: true 
    },
    { 
        name: 'Hari', 
        selector: (row: any) => row.hari, 
        sortable: true 
    },
    { 
        name: 'Lokasi Masuk', 
        selector: (row: any) => row.lokasiMasuk, 
        sortable: true 
    },
    { 
        name: 'Waktu Masuk', 
        selector: (row: any) => row.waktuMasuk, 
        sortable: true 
    },
    { 
        name: 'Lokasi Pulang', 
        selector: (row: any) => row.lokasiPulang || "Tidak Absen Pulang", 
        sortable: true 
    },
    { 
        name: 'Waktu Pulang', 
        selector: (row: any) => row.waktuPulang || "Tidak Absen Pulang", 
        sortable: true 
    },
    { 
        name: 'Status', 
        selector: (row: any) => row.status, 
        sortable: true 
    }
  ];

  return (
    <div className="h-screen flex-1 p-8 ">
      <h1 className='mb-4 text-lg font-semibold'>Data Absensi Pegawai</h1>
      <div className="mb-2 flex justify-end space-x-4">
        <div className='flex-col space-y-1 w-full '>
          <p className='text-sm font-semibold '>Name</p>
          <input
            type="text"
            value={filterName}
            onChange={handleNameFilterChange}
            placeholder="Filter by name"
            className="w-full border border-gray-300 text-sm rounded px-3 py-1"
          />
        </div>
        <div className='mb-2 flex-col space-y-1'>
          <p className='text-sm font-semibold '>Date</p>
          <input
            type="date"
            value={filterDate}
            onChange={handleDateFilterChange}
            placeholder="Filter by date"
            className="w-80 border border-gray-300 text-sm rounded px-3 py-1"
          />
        </div>
        <div className='mb-2 flex-col space-y-1'>
          <p className='text-sm font-semibold'>Location</p>
          <select
            value={filterLocation}
            onChange={handleLocationFilterChange}
            className="w-60 border border-gray-300 text-sm rounded px-3 py-1"
          >
            <option value="">All Locations</option>
            {locations.map((location, index) => (
              <option key={index} value={location.name}>{location.name}</option>
            ))}
          </select>
        </div>
        <div className='mb-2 flex-col space-y-1'>
          <p className='text-sm font-semibold'>Status</p>
          <select
            value={filterStatus}
            onChange={handleStatusFilterChange}
            className="w-60 border border-gray-300 text-sm rounded px-3 py-1"
          >
            <option value="">All Statuses</option>
            {statuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        
      />
      
    </div>
  );
};

export default AbsensiPegawai;
