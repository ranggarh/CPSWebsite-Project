import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../actions/firebase';
import fetchEmployeeData from '../actions/action';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Card from "../components/card";
import { parse } from 'date-fns';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AbsensiEntry {
  lokasiMasuk: string;
  waktuMasuk: string;
  // Add other properties as needed
}

interface AbsensiData {
  [employeeId: string]: {
    [subKey: string]: AbsensiEntry;
  };
}

const Home = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [absensiData, setAbsensiData] = useState<AbsensiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState('');
  const [filterDate, setFilterDate] = useState<string>('');
  const [filteredData, setFilteredData] = useState<AbsensiEntry[]>([]);
  
  const branches = [
    'Kantor Centralindo Pancasakti',
    'Kantor STO Telkom Karang Pilang',
    'Kantor STO Telkom Bambe',
    'Kantor STO Telkom Kandangan',
    'Kantor STO Telkom Kebalen'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [absensiSnapshot, employeeList] = await Promise.all([
          get(ref(database, 'absensi')),
          fetchEmployeeData()
        ]);

        if (absensiSnapshot.exists()) {
          setAbsensiData(absensiSnapshot.val());
        } else {
          setAbsensiData(null);
        }

        // Set total employees count
        setTotalEmployees(employeeList.length);
      } catch (error) {
        setError('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (absensiData) {
      const filtered = Object.keys(absensiData).flatMap((employeeId) =>
        Object.keys(absensiData[employeeId]).map((subKey) => ({
          employeeId,
          ...absensiData[employeeId][subKey],
        }))
      ).filter((item) => {
        const matchesLocation = filterLocation === '' || item.lokasiMasuk === filterLocation;
        
        // Tambahkan filter tanggal
        const matchesDate = !filterDate || (
          item.waktuMasuk &&
          parse(item.waktuMasuk, 'dd/MM/yyyy HH.mm.ss', new Date()).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
        );
        
        return matchesLocation && matchesDate;
      });

      setFilteredData(filtered);
    }
  }, [filterLocation, filterDate, absensiData]);

  const handleLocationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterLocation(e.target.value);
  };

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };

  const locationCounts = filteredData.reduce((acc, item) => {
    acc[item.lokasiMasuk] = (acc[item.lokasiMasuk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(locationCounts),
    datasets: [
      {
        label: 'Jumlah Absensi',
        data: Object.values(locationCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top' as const,
  
        
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: { label: string; raw: number }) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
      
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const izinData = [
    {
      id: 1,
      name: 'Rangga Raditya Hariyanto',
      startDate: '13 Juli 2024',
      endDate: '13 Juli 2024',
    },
    {
      id: 2,
      name: 'Ahmad Fauzi',
      startDate: '14/09/2024',
      endDate: '15/09/2024',
    },
    {
      id: 3,
      name: 'Ahmad Fauzi',
      startDate: '14 Juli 2024',
      endDate: '15 Juli 2024',
    },
    // Tambahkan lebih banyak data jika diperlukan
  ];

  return (
    <div className="h-screen flex-1 p-7">
      <h1 className="text-2xl font-semibold">Home Page</h1>
      {/* Card */}
      <div className="flex flex-wrap justify-center">
        <Card
          title="Total Karyawan"
          desc={`${totalEmployees} Karyawan`}
          icon="https://via.placeholder.com/300"
        />
        <Card
          title="Absen Masuk"
          desc="Proin ."
          icon="https://via.placeholder.com/300"
        />
        <Card
          title="Absen Alpa"
          desc="Vestibulum ."
          icon="https://via.placeholder.com/300"
        />
        <Card
          title="Absen Izin Kerja"
          desc="Vestibulum "
          icon="https://via.placeholder.com/300"
        />
      </div>
      <div className="flex">
        {/* Box dengan rasio 2:1 */}
        <div className="flex flex-grow h-full shadow-lg m-5 p-3 bg-white rounded-lg">
          <div className="flex-1 m-2 bg-white">
            <div>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="flex-1 m-2 justify-center">
            <div className="flex flex-col p-4">
              <div className=" float-left font-semibold text-sm m-1">Cabang :</div>
              <div className=" left-1">
                <select
                  value={filterLocation}
                  onChange={handleLocationFilterChange}
                  className="w-full border border-gray-300 text-sm rounded px-3 py-1"
                >
                  <option value="">All Locations</option>
                  {branches.map((branch, index) => (
                    <option key={index} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              <div className='mb-2 flex-col space-y-1'>
                <p className='text-sm font-semibold'>Date</p>
                <input
                  type="date"
                  value={filterDate}
                  onChange={handleDateFilterChange}
                  placeholder="Filter by date"
                  className="w-full border border-gray-300 text-sm rounded px-3 py-1"
                />
              </div>
            </div>



            {/* <div className="overflow-x-auto p-3">
              <table className="min-w-full mb-4 bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-blue-100 border-b">
                  <tr>
                    <th className="py-2 px-4 text-left text-gray-700">Status Kehadiran</th>
                    <th className="py-2 px-4 text-left text-gray-700 text-center">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">Masuk</td>
                    <td className="py-2 px-4 text-center">10</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Alpa</td>
                    <td className="py-2 px-4 text-center">0</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Izin Kerja</td>
                    <td className="py-2 px-4 text-center">5</td>
                  </tr>
                  <tr className="border-b bg-blue-100">
                    <td className="py-2 px-4 font-bold">Total Absensi</td>
                    <td className="py-2 px-4 text-center font-bold">15</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        </div>
        <div className="flex-shrink-0 w-1/4 bg-white m-5 rounded-lg">
          <div className="p-3 m-1 max-h-96 overflow-y-auto">
            {izinData.map((izin) => (
              <div key={izin.id} className="w-full bg-white shadow-lg rounded-lg mb-4">
                <div className="p-3">
                  <p className="text-sm mb-2">Pengajuan Izin</p>
                  <h2 className="text-sm font-bold -mt-1">{izin.name}</h2>
                  <hr className="mt-1 mb-1" />
                  <div className="flex">
                    <h2 className="text-sm font-bold mt-2 text-green-500">Mulai:</h2>
                    <h2 className="text-sm font-bold mt-2 ml-2 truncate">{izin.startDate}</h2>
                    <h2 className="text-sm font-bold mt-2 ml-2 text-red-500">Selesai:</h2>
                    <h2 className="text-sm font-bold mt-2 ml-2 truncate">{izin.endDate}</h2>
                  </div>
                  <div className="text-white px-1.5 py-1.5 mt-3 inline-block rounded-md shadow-md hover:bg-blue-600 focus:outline-none" style={{ backgroundColor: '#181059', color: '#ffffff' }}>
                    <p className="text-sm">Lihat Selengkapnya</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

