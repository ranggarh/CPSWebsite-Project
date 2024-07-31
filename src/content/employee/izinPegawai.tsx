import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../actions/firebase';
import fetchEmployeeData from '../../actions/action';
import DataTable from 'react-data-table-component';

// Define types for sub-collection entries
interface SubCollection {
  hari: string;
  status: string;
  jabatan: string;
  alasan: string;
  buktiFoto: string;
}

// Define types for the first-level collection
interface Absensi {
  [subKey: string]: SubCollection;
}

type AbsensiData = Record<string, Absensi>;

const IzinPegawai = () => {
  const [absensiData, setAbsensiData] = useState<AbsensiData | null>(null);
  const [employeeData, setEmployeeData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const columns = [
    {
      name: 'No',
      selector: (row: any, index: number) => `${index + 1}`,
      sortable: true,
      width: '70px',
    },
    {
      name: 'Nama Pegawai',
      selector: (row: any) => employeeData[row.employeeId] || 'Unknown',
      sortable: true,
    },
    {
      name: 'Jabatan',
      selector: (row: any) => row.jabatan,
      sortable: true,
    },
    {
      name: 'Alasan',
      selector: (row: any) => row.alasan,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: 'Bukti',
      cell: (row: any) => (
        row.buktiFoto
          ? <button onClick={() => window.open(row.buktiFoto, '_blank')} className="btn btn-link p-2 rounded bg-blue-100">Bukti Izin</button>
          : 'No Photo'
      ),
      sortable: false,
    },
  ];

  const data = absensiData
    ? Object.keys(absensiData).flatMap((employeeId) =>
        Object.keys(absensiData[employeeId])
          .filter((subKey) => absensiData[employeeId][subKey].status === 'Izin')
          .map((subKey) => ({
            employeeId,
            ...absensiData[employeeId][subKey],
          }))
      )
    : [];

  return (
    <div className="h-screen flex-1 p-8">
      <h1>Data Absensi Pegawai - Status Izin</h1>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default IzinPegawai;
