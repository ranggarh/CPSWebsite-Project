import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import fetchEmployeeData from "../../actions/action";

// Define an interface for the employee data
interface Employee {
    id: string;
    nama: string;
    alamat?: string;
    email: string;
    nohp?: string;
    status: string;
}

const ListEmployee = () => {
    const [records, setRecords] = useState<Employee[]>([]);
    const [search, setSearch] = useState("");

    const columns = [
        {
            name: "ID",
            selector: (row: Employee) => row.id,
            sortable: true,
            width: "60px",
        },
        {
            name: "Nama Lengkap",
            selector: (row: Employee) => row.nama,
            sortable: true,
        },
        {
            name: "Alamat",
            selector: (row: Employee) => row.alamat || "N/A",
            sortable: true,
        },
        {
            name: "Email",
            selector: (row: Employee) => row.email,
            sortable: true,
        },
        {
            name: "No Hp",
            selector: (row: Employee) => row.nohp || "N/A",
            sortable: true,
        },
        {
            name: "Jabatan",
            selector: (row: Employee) => row.status,
            sortable: true,
        },
    ];

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchEmployeeData();
            setRecords(data);
        };

        loadData();
    }, []);

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const filteredRecords = records.filter(row => 
        row.nama.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-screen flex-1 p-7">
            <h1>List Employee</h1>
            <div className="flex float-right text-end m-4">
                <p className="p-2 text-sm font-semibold">Search:</p>
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="p-2 text-sm border border-gray-200 rounded" 
                    value={search}
                    onChange={handleFilter}
                />
            </div>
            <DataTable
                columns={columns}
                data={filteredRecords}
                // selectableRows
                pagination
                fixedHeader
            />
        </div>
    );
};

export default ListEmployee;
