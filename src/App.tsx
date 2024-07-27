
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Home from "./content/home";
import Employee from "./content/employee";
import ListEmployee from "./content/employee/listEmployee";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="flex pt-14 "style={{ backgroundColor: '#F2F4F8', color: '#333' }}>
          <Sidebar />
          <div className="flex-1" style={{ backgroundColor: '#F2F4F8', color: '#333' }}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/employee/list-employee" element={<ListEmployee />} />
              {/* Tambahkan rute-rute lain di sini */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
