
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/students";

function App() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalStudents, setTotalStudents] = useState(0);
    const [limit, setLimit] = useState(5);

    const [form, setForm] = useState({
        name: "",
        email: "",
        age: "",
        course: ""
    });

    const [editId, setEditId] = useState(null);

 // Fetch students from the backend   
const fetchStudents = async (
    searchValue = search,
    pageValue = currentPage
) => {
    try {
        const response = await axios.get(
            "http://localhost:5000/api/students",
            {
                params: {
                    search: searchValue,
                    page: pageValue,
                    limit: limit
                }
            }
        );

        setStudents(response.data.students);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setTotalStudents(response.data.totalStudents);

    } catch (error) {
        console.error("Error fetching students:", error);
    }
};

    // Fetch students whenever the search term changes
    useEffect(() => {
    fetchStudents(search, currentPage);
}, [search, currentPage, limit]);

    useEffect(() => {
        fetchStudents();
    }, []);

    // Handle input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // CREATE and UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(`${API}/${editId}`, form);
                alert("Student updated successfully");
            } else {
                await axios.post(API, form);
                alert("Student added successfully");
            }

            setForm({
                name: "",
                email: "",
                age: "",
                course: ""
            });

            setEditId(null);
            fetchStudents();

        } catch (error) {
            alert(error.response?.data?.message || "Operation failed");
        }
    };

    // EDIT
    const handleEdit = (student) => {
        setForm({
            name: student.name,
            email: student.email,
            age: student.age,
            course: student.course
        });

        setEditId(student._id);
    };

    // DELETE
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            try {
                await axios.delete(`${API}/${id}`);
                alert("Student deleted successfully");
                fetchStudents();
            } catch (error) {
                alert("Delete failed");
            }
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setEditId(null);
        setForm({
            name: "",
            email: "",
            age: "",
            course: ""
        });
    };

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Student Management System
            </h2>
            <div className="mb-3 mt-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search student by name..."
                value={search}
                onChange={(e) => {
                   setSearch(e.target.value);
                   setCurrentPage(1);
               }}
            />
            </div>

            {/* Student Form */}

            <div className="card p-4 mb-4">

                <h4>
                    {editId ? "Update Student" : "Add Student"}
                </h4>

                <form onSubmit={handleSubmit}>

                    <input
                        className="form-control mb-3"
                        type="text"
                        name="name"
                        placeholder="Enter student name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        type="number"
                        name="age"
                        placeholder="Enter age"
                        value={form.age}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        type="text"
                        name="course"
                        placeholder="Enter course"
                        value={form.course}
                        onChange={handleChange}
                        required
                    />

                    <button className="btn btn-primary me-2">
                        {editId ? "Update Student" : "Add Student"}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>

            {/* Student Table */}

            <h4>Student List</h4>

            <table className="table table-bordered table-striped">

                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {students.length > 0 ? (
                    students.map((student) => (

                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.age}</td>
                            <td>{student.course}</td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(student)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(student._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>

                    ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No students found
                            </td>
                        </tr>
                    )}
                    {students.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No students found
                            </td>
                        </tr>
                    )}
                
                </tbody>

            </table>

{/* PAGINATION */}
<div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-3">

    {/* Student count */}
    <div>
        Showing {students.length} of {totalStudents} students
    </div>

    {/* Pagination buttons */}
    <div className="d-flex gap-2">
        
<select
    className="form-select"
    style={{ width: "110px" }}
    value={limit}
    onChange={(e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
    }}
>
    <option value={5}>5 rows</option>
    <option value={10}>10 rows</option>
    <option value={15}>15 rows</option>
    <option value={20}>20 rows</option>
</select>

        {/* Previous button */}
        <button
            className="btn btn-outline-primary"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
        >
            Previous
        </button>

        {/* Page numbers */}
        {Array.from(
            { length: totalPages },
            (_, index) => index + 1
        ).map((page) => (
            <button
                key={page}
                className={`btn ${
                    currentPage === page
                        ? "btn-primary"
                        : "btn-outline-primary"
                }`}
                onClick={() => setCurrentPage(page)}
            >
                {page}
            </button>
        ))}

        {/* Next button */}
        <button
            className="btn btn-outline-primary"
            disabled={currentPage >= totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
        >
            Next
        </button>

    </div>

</div>


        </div>
    );
}

export default App;
