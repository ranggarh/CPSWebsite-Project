
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Home from "./content/home";
import ListEmployee from "./content/employee/listEmployee";
import IzinPegawai from "./content/employee/izinPegawai";
import AbsensiPegawai from "./content/employee/absensiPegawai";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="flex pt-14  "style={{ backgroundColor: '#F2F4F8', color: '#333' }}>
          <Sidebar />
          <div className="flex-1" style={{ backgroundColor: '#F2F4F8', color: '#333' }}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/employee/list-employee" element={<ListEmployee />} />
              <Route path="/employee/izin-pegawai" element={<IzinPegawai />} />
              <Route path="/employee/absensi-pegawai" element={<AbsensiPegawai />} />
              {/* Tambahkan rute-rute lain di sini */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
