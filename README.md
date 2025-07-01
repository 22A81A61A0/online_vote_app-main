# 🗳️ Online Voting System

This is a full-stack web application for secure and efficient online voting.  
- **Backend**: Spring Boot (using H2 Database for demo)  
- **Frontend**: React.js  

---

## 📁 Project Structure

```
/online-voting-system     ← Spring Boot (Java)
/online-voting-system-frontend    ← ReactJS (JavaScript)
```

---

## ⚙️ Prerequisites

Before running the application, make sure the following are installed:

- [Java JDK 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Spring Tool Suite (STS)](https://spring.io/tools)
- [Node.js & npm](https://nodejs.org/) (v16+ recommended)
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
- A web browser (e.g., Chrome or Firefox)

---

## 🔻 Download and Set Up the Project

1. Go to the GitHub repository:  
   https://github.com/Reshmitj/online_vote_app

2. Click on the green **"Code"** button → Select **Download ZIP**

3. Unzip the downloaded file to a location of your choice

---

## 🛠️ Run Backend (Spring Boot with H2 DB)

> Run using **Spring Tool Suite (STS) IDE only**

1. Open **STS IDE**

2. Go to **File → Import → Existing Maven Projects**

3. Browse to the `/online-voting-system` folder inside the unzipped project

4. Select the project and finish importing

5. Run the application:
   - Right-click the project → **Run As → Spring Boot App**

6. Backend will start on:  
   `http://localhost:8080`

---

## 💻 Run Frontend (React.js)

> Use **Visual Studio Code (VS Code)**

1. Open **VS Code**

2. Click on **File → Open Folder** and select the `online-voting-system-frontend` folder from the unzipped project

3. Open the integrated terminal in VS Code:  
   - Click **Terminal → New Terminal**

4. Run the following commands in the terminal:

```bash
npm install
npm start
```

5. Wait for the development server to start.  
   The frontend will be available at:  
   `http://localhost:3000`

---

## 🔐 Default Test Credentials

| Role     | Username      | Password |
|----------|---------------|----------|
| Admin    | admin@gmail.com	         | admin |
| Voter    | register newly        | create password |

---

## 🧪 API Endpoints

### 🌐 Frontend Routes (for Testing)

These are the main frontend pages used for accessing the application:

| Page               | URL                                         | Description             |
|--------------------|----------------------------------------------|-------------------------|
| Admin Login        | [http://localhost:3000/admin-login](http://localhost:3000/admin-login) | Login page for Admins   |
| Voter Login        | [http://localhost:3000/](http://localhost:3000/)                         | Login page for Voters   |
| Voter Registration | [http://localhost:3000/register](http://localhost:3000/register)         | New Voter Registration  |

---

### 🗄️ H2 Database Console (Backend)

You can access the H2 in-memory database from the following URL:

- **H2 Console URL**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

**Login Credentials:**

```
Driver Class: org.h2.Driver
JDBC URL: jdbc:h2:file:./data/onlinevotingdb
Username: sa
Password:
```


---

## 📦 Tech Stack Used

- **Backend**: Spring Boot, Spring Security, JWT, H2 Database
- **Frontend**: React.js, Axios, Bootstrap
- **Dev Tools**: STS IDE, VS Code, Postman, Git

---

