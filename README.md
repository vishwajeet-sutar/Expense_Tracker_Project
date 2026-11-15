# 💰 Expense Tracker Project

A web-based Expense Tracker application designed to help users manage their personal finances by recording, organizing, and monitoring income and expenses.

The project is divided into two main parts: **Frontend** and **Backend**, making the application easier to develop, maintain, and extend.

---

## 📌 Table of Contents

1. About the Project
2. Features
3. Technologies Used
4. Project Structure
5. Prerequisites
6. Installation and Setup
7. Running the Project
8. Environment Configuration
9. Application Workflow
10. Troubleshooting
11. Future Improvements
12. Contributing
13. Author
14. License

---

## 📖 About the Project

Expense Tracker is a personal finance management application that helps users keep track of their daily financial activities.

Managing money is an important part of everyday life. This project aims to make expense management easier by providing a centralized application for recording and monitoring financial transactions.

Users can use the application to manage their financial records and better understand their spending habits.

## ✨ Features

- **Expense Management:** Maintain records of expenses.
- **Income Management:** Keep track of income.
- **Transaction Tracking:** Organize financial transactions.
- **Frontend and Backend Architecture:** Separate client-side and server-side code.
- **Personal Finance Management:** Maintain financial records in one place.
- **Easy Setup:** Run the frontend and backend independently.
---

## 🛠️ Technologies Used

The project uses a separate frontend and backend architecture.

## 🛠️ Technologies Used

The project is developed using the following technologies:

| Technology | Purpose |
|---|---|
| HTML | Creates the structure of web pages. |
| CSS | Styles and designs the user interface. |
| JavaScript | Adds interactive functionality to the application. |
| React.js | Builds dynamic and reusable UI components. |
| Python | Handles backend programming and application logic. |
| Flask | Develops backend APIs and handles server-side operations. |
| NPM | Manages frontend packages and dependencies. |
| pip | Installs and manages Python libraries. |
| Git & GitHub | Used for version control and source code management. |
| Visual Studio Code | Used for writing and editing project code. |

---

## 📂 Project Structure

Expense_Tracker_Project/
│
├── backend/
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── expense.py
│   │   └── report.py
│   │
│   ├── app.py
│   ├── config.py
│   ├── extensions.py
│   ├── models.py
│   ├── requirements.txt
│   ├── run.py
│   └── utils.py
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AddExpense.jsx
│   │   │   ├── Calendar.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ExpenseGraph.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── RecentExpenses.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Report.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

**Folder Description:**

- `backend/` – Contains server-side code, API logic, and backend configuration.
- `frontend/` – Contains the user interface and client-side code.
- `package.json` – Contains project dependencies and available scripts.
- `.env` – Stores environment variables and configuration.
- `.gitignore` – Specifies files that should not be uploaded to GitHub.
- `README.md` – Contains project documentation.

---

## 💻 Prerequisites

Before running this project, make sure you have installed the following software.

### 1. Node.js

Node.js is required if your frontend and backend use Node.js.

Download: https://nodejs.org/

### 2. npm

npm is generally installed automatically with Node.js.

Check installation:

```bash
node -v
npm -v
```

### 3. Git

Git is required to clone the repository.

Download: https://git-scm.com/

Check installation:

```bash
git --version
```

### 4. Visual Studio Code

Download: https://code.visualstudio.com/

VS Code is recommended for editing and managing the project.

---

## ⚙️ Installation and Setup

Follow these steps to download and configure the project on your computer.

### Step 1: Clone the Repository

Open your terminal or PowerShell and execute:

```bash
git clone https://github.com/vishwajeet-sutar/Expense_Tracker_Project.git
```

### Step 2: Navigate to the Project Folder

```bash
cd Expense_Tracker_Project
```

### Step 3: Open the Project in VS Code

```bash
code .
```

### Step 4: Install Frontend Dependencies

Open a terminal in VS Code.

Navigate to the frontend folder:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install
```

This command installs all dependencies listed in the frontend's `package.json` file.

### Step 5: Install Backend Dependencies

Open another terminal in VS Code.

Navigate to the backend folder:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

This command installs all dependencies listed in the backend's `package.json` file.

**Important:** Run `npm install` separately inside the frontend and backend folders. Do not run it in the repository's root directory unless a root-level `package.json` exists.

---

## 🚀 How to Run the Project

The frontend and backend should be started in separate terminals.

### Terminal 1: Start the Backend

Navigate to the backend folder:

```bash
cd backend
```

Start the backend using the script configured in `backend/package.json`.

For example, if the project has a `dev` script:

```bash
npm run dev
```

If it has a `start` script:

```bash
npm start
```

### Terminal 2: Start the Frontend

Navigate to the frontend folder:

```bash
cd frontend
```

Start the frontend using the script configured in `frontend/package.json`.

For example:

```bash
npm run dev
```

Or, if the project uses a `start` script:

```bash
npm start
```

### Step 3: Open the Application

Once both servers are running, open the local URL displayed in your frontend terminal.

For example:

```text
http://localhost:5173
```

The actual URL and port depend on your frontend configuration.

---

## 🔐 Environment Configuration

Some applications require environment variables to connect the frontend, backend, and database.

If your backend uses environment variables, create a `.env` file inside the backend directory.

Example:

```env
PORT=5000
DATABASE_URL=your_database_connection_string
```

If your frontend requires a backend API URL, configure it using the environment variable format supported by your frontend framework.

For example, a Vite frontend may use:

```env
VITE_API_URL=http://localhost:5000
```

**Important:**
- Use the actual variable names required by your source code.
- Never upload passwords, database credentials, API keys, or secret tokens to GitHub.
- Add `.env` to `.gitignore`.
- Create a `.env.example` file containing placeholder values if needed.

---

## 🔄 Application Workflow

The general architecture of the application is:

```text
          USER
            |
            v
      FRONTEND
            |
            v
       API REQUEST
            |
            v
       BACKEND
            |
            v
        DATABASE
            |
            v
      API RESPONSE
            |
            v
       FRONTEND
            |
            v
       USER OUTPUT
```

1. The user interacts with the frontend.
2. The frontend sends requests to the backend.
3. The backend processes the requested operation.
4. The backend communicates with the configured database, if applicable.
5. The backend returns a response.
6. The frontend displays the result to the user.

---

## 🐛 Troubleshooting

### Problem 1: package.json not found

**Error:**

```text
npm error code ENOENT
npm error enoent Could not read package.json
```

**Solution:**

Make sure you are inside the correct project directory.

For frontend:

```bash
cd frontend
npm install
```

For backend:

```bash
cd backend
npm install
```

### Problem 2: npm command not recognized

**Solution:**

Install Node.js and restart your terminal.

Check:

```bash
node -v
npm -v
```

### Problem 3: Port already in use

**Solution:**

Another application may already be using the required port.

Stop the other application or configure a different available port.

### Problem 4: Module not found

**Solution:**

Navigate to the relevant frontend or backend directory and execute:

```bash
npm install
```

### Problem 5: Database connection error

**Solution:**

- Verify that the database service is running.
- Check the database connection string.
- Verify environment variable names.
- Ensure the database credentials are correct.

---

## 🔮 Future Improvements

The following features can be considered for future development:

- Monthly and yearly expense reports.
- Interactive financial dashboards.
- Expense categorization.
- Budget management.
- Income and expense analytics.
- Graphical representation of spending habits.
- Downloadable financial reports.
- User authentication and authorization.
- Responsive design for mobile devices.

---

## 🤝 Contributing

Contributions are welcome!

If you want to contribute to this project:

1. Fork this repository.
2. Create a new branch.

```bash
git checkout -b feature-name
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push your branch.

```bash
git push origin feature-name
```

6. Open a Pull Request.

---

## 👨‍💻 Author

**Vishwajeet Sutar**

- GitHub: https://github.com/vishwajeet-sutar
- Project Repository: https://github.com/vishwajeet-sutar/Expense_Tracker_Project

---

## 📄 License

This project is intended for educational and learning purposes.

A formal open-source license can be added to the repository by including a `LICENSE` file.

---

⭐ If you find this project useful, consider giving it a star on GitHub!

**Thank you for visiting the Expense Tracker Project!**
