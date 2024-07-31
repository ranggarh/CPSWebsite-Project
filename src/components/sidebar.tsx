import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation dari react-router-dom
import IconPersonLinesFill from './icon/employee';
import IconFileDocument from './icon/document';
import IconOfficeBuildingMarkerOutline from './icon/office';
import IconViewDashboardEditOutline from './icon/dashboard';
import IconBuilding from './icon/building';
import IconFingerprintLine from './icon/fingerprint';
import IconFileDocumentEditOutline from './icon/izin';

interface Menu {
  title: string;
  src: React.ReactNode; // Mengubah src menjadi React.ReactNode untuk mendukung komponen ikon
  gap?: boolean;
  path: string; // Tambahkan properti path untuk menentukan rute yang dituju
}


const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk dropdown
  const location = useLocation(); // Mendapatkan rute saat ini

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Definisikan menu dengan properti path untuk masing-masing halaman
  const Menus: Menu[] = [
    { title: "Dashboard", src: <IconViewDashboardEditOutline className="w-6 h-6" />, path: "/home" }, 
    { title: "Pegawai", src: <IconPersonLinesFill className='w-6 h-6'/> },
    { title: "Rekap Laporan", src: <IconFileDocument className="w-6 h-6" />, path: "/rekap" }, 
    { title: "Daftar Kantor", src: <IconOfficeBuildingMarkerOutline className="w-6 h-6" />, path: "/kantor" }, 
  ];

  return (
    <div
      className={`${open ? "w-41 bg-white" : "w-20 bg-white"} h-screen p-5 pt-8 relative duration-300`}
    >
      <img
        src="./src/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={toggleSidebar}
      />
      <div className="flex items-center gap-x-4">
        <IconBuilding className={`w-6 h-6 ${open ? 'block' : 'hidden'} duration-300`} />
        <h1
          className={`text-gray-800 origin-left font-medium text-md duration-200 ${!open && "scale-0"}`}
        >
          PT. Centralindo <br />Pancasakti
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <React.Fragment key={index}>
            {menu.title === "Pegawai" ? (
              <>
                <li
                  className={`flex items-center rounded-md p-2 cursor-pointer hover:bg-blue-50 hover:text-gray-800 text-sm gap-x-4 
                  ${menu.path === location.pathname ? "bg-blue-200 font-medium" : ""} ${menu.gap ? "mt-9" : "mt-2"}`}
                  onClick={toggleDropdown}
                >
                  <div className="w-6 h-6">{menu.src}</div>
                  <Link
                    to={menu.path}
                    className={`ml-2 ${!open && "hidden"} origin-left duration-200 flex items-center`}
                  >
                    {menu.title}
                  </Link>
                  <span className={`ml-auto ${isDropdownOpen ? 'rotate-180' : ''} transition-transform`}>
                    {/* Icon panah atau simbol dropdown */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="w-4 h-4"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </span>
                </li>
                <ul className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isDropdownOpen ? 'max-h-40' : 'max-h-0'}`}>
                  <li className={`flex items-center rounded-md p-2 pl-8 cursor-pointer hover:bg-blue-50 text-sm`}>
                    <IconFingerprintLine className='w-4 h-4 mr-2 '/>
                    <Link to="/employee/absensi-pegawai" className="flex items-center text-gray-600">
                      Absensi Pegawai
                    </Link>
                  </li>
                  <li className={`flex items-center rounded-md p-2 pl-8 cursor-pointer hover:bg-blue-50 text-sm`}>
                    <IconFileDocumentEditOutline className='w-4 h-4 mr-2'/>
                    <Link to="/employee/izin-pegawai" className="flex items-center text-gray-600">
                      Izin Pegawai
                    </Link>
                  </li>
                  <li className={`flex items-center rounded-md p-2 pl-8 cursor-pointer hover:bg-blue-50 text-sm`}>
                    <IconFingerprintLine className='w-4 h-4 mr-2 '/>
                    <Link to="/employee/list-employee" className="flex items-center text-gray-600">
                      List Pegawai
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <li
                key={index}
                className={`flex items-center rounded-md p-2 cursor-pointer hover:bg-blue-50 hover:text-gray-800 text-sm gap-x-4 
                ${menu.path === location.pathname ? "bg-blue-200 font-medium" : ""} ${menu.gap ? "mt-9" : "mt-2"}`}
              >
                <div className="w-6 h-6">{menu.src}</div>
                <Link
                  to={menu.path}
                  className={`ml-2 ${!open && "hidden"} origin-left duration-200 flex items-center`}
                >
                  {menu.title}
                </Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
