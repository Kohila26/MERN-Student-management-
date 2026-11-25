# MERN-Student-management
# Student Management System – MERN Stack

## 📌 Project Description

The Student Management System is a web application developed using React.js and Node.js. It allows users to manage student details easily through CRUD operations.

Users can add, view, update, delete, and search student records. The application also provides pagination to display student records page by page.

## 🚀 Features

### 1. Add Student
- Add a new student.
- Enter student name, email, age, and course.

### 2. View Students
- Display all student details in a table.
- Show student name, email, age, and course.

### 3. Update Student
- Edit existing student information.
- Update student details using the edit option.
- Cancel the editing process.

### 4. Delete Student
- Delete student records.
- Confirmation message before deleting.

### 5. Search Student
- Search students by name.
- Display matching student records.

### 6. Pagination
- Display student records page by page.
- Previous and Next buttons.
- Select the number of records per page:
  - 5 rows
  - 10 rows
  - 15 rows
  - 20 rows
- Display the total number of students.

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Bootstrap
- Axios
- React Hooks (`useState`, `useEffect`)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## 📂 Project Structure

```text
MERN-Student-management/
│
├── backend/
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── studentRoute.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Kohila26/MERN-Student-management-.git
```

### Step 2: Navigate to the Project Folder

```bash
cd MERN-Student-management-
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 4: Configure MongoDB

Create a `.env` file inside the backend folder.

Add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Step 5: Start Backend Server

```bash
node server.js
```

### Step 6: Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### Step 7: Start Frontend Application

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## 🔗 API Endpoint

Base URL:

```text
http://localhost:5000/api/students
```

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Add a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

### Search and Pagination

The GET API supports query parameters:

```text
/api/students?search=John&page=1&limit=5
```

- `search` – Search students by name.
- `page` – Select the current page.
- `limit` – Number of students per page.

## 📊 Application Workflow

1. User enters student details.
2. React sends data to the backend using Axios.
3. Express.js handles the API request.
4. Mongoose communicates with MongoDB.
5. Student records are returned to React.
6. Users can search, edit, delete, and navigate student records.

## 🔐 Security

- Keep MongoDB credentials inside the `.env` file.
- Do not upload `.env` or `node_modules` to GitHub.

## 👩‍💻 Author

**Kohila**

## 📄 License

This project is developed for learning and educational purposes.