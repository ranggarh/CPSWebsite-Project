import DataTable from "react-data-table-component";
import React, {useState} from "react";

// Define an interface for the employee data
interface Employee {
    id: number;
    nama: string;
    alamat: string;
    email: string;
    nohp: string;
    status: string; // If this represents a position or role, you may want to rename it to 'jabatan' for consistency
}

const ListEmployee = () => {
    
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
            selector: (row: Employee) => row.alamat,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row: Employee) => row.email,
            sortable: true,
        },
        {
            name: "No Hp",
            selector: (row: Employee) => row.nohp,
            sortable: true,
        },
        {
            name: "Jabatan",
            selector: (row: Employee) => row.status, // or row.jabatan if you rename it
            sortable: true,
        },
    ];
    const data: Employee[] = [
        {
            id: 1,
            nama: "Rangga Raditya Hariyanto",
            alamat: "Jl. Cempaka Putih No. 12 Jakarta",
            email: "2KUeh@example.com",
            nohp: "08223123123",
            status: "Staff IT",
        },
        {
            id: 2,
            nama: "Ahmad Fauzi",
            alamat: "Jl. Cempaka Putih No. 12 Jakarta",
            email: "2KUeh@example.com",
            nohp: "08223123123",
            status: "Staff IT",
        }
    ];
    const [records, setRecords] = useState(data);
    function handleFilter(event: React.ChangeEvent<HTMLInputElement>){
        const newData = data.filter(row => {
            return row.nama.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setRecords (newData)
    }

    return (
        <div className="h-screen flex-1 p-7">
            <h1>List Employee</h1>
            <div  className="flex float-right text-end m-4">
                <p className="p-2 text-sm font-semibold">Search:</p>
                <input type="text" placeholder="Search" className="p-2 text-sm border border-gray-200 rounded" onChange={handleFilter}/>
            </div>
            <DataTable
                columns={columns}
                data={records}
                selectableRows
                pagination
                fixedHeader
            />
        </div>
    );
}

export default ListEmployee;
