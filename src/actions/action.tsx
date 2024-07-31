import { database, ref, get } from "./firebase";

// Define an interface for the employee data
interface Employee {
    id: string;
    nama: string;
    alamat?: string;
    email: string;
    nohp?: string;
    status: string;
}



// Function to fetch employee data from the Realtime Database
export const fetchEmployeeData = async (): Promise<Employee[]> => {
    const dbRef = ref(database, 'users'); // Assuming root reference
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
};


// Export the functions
export default fetchEmployeeData;
