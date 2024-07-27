
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, TooltipItem } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Bali'],
    datasets: [
      {
        label: 'Jumlah Karyawan Absen',
        data: [10, 5, 15, 7, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 1)', // Warna bar untuk Jakarta
          'rgba(54, 162, 235, 1)', // Warna bar untuk Bandung
          'rgba(255, 206, 86, 1)', // Warna bar untuk Surabaya
          'rgba(75, 192, 192, 1)', // Warna bar untuk Medan
          'rgba(153, 102, 255, 1)' // Warna bar untuk Bali
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Border warna bar untuk Jakarta
          'rgba(54, 162, 235, 1)', // Border warna bar untuk Bandung
          'rgba(255, 206, 86, 1)', // Border warna bar untuk Surabaya
          'rgba(75, 192, 192, 1)', // Border warna bar untuk Medan
          'rgba(153, 102, 255, 1)' // Border warna bar untuk Bali
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jumlah Karyawan Absen',
          color: 'rgba(0, 0, 0, 1)', // Warna teks judul sumbu Y hitam
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.7)', // Warna teks angka sumbu Y hitam dengan transparansi
        },
      },
      x: {
        title: {
          display: true,
          text: 'Lokasi Kantor',
          color: 'rgba(0, 0, 0, 1)', // Warna teks judul sumbu X hitam
        },
        ticks: {
          color: 'rgba(0, 0, 0, 1)', // Warna teks angka sumbu X hitam dengan transparansi
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(0, 0, 0, 1)', // Warna teks legend hitam
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(tooltipItem: TooltipItem<'bar'>) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        },
      },
    },
    maintainAspectRatio: false,
  } as const;

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
