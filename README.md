# 🏥 Healthcare Backend API

A secure and modular REST API built using **Node.js**, **Express**, **Sequelize**, and **PostgreSQL**, designed for managing users, patients, doctors, and their relationships in a healthcare system.

---
---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sahil3M3/healthcare-backend.git
cd healthcare-backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up `.env`

Create a `.env` file in the root directory:

```env
PORT=5000
DB_USER=postgres
DB_PASS=manager
DB_NAME=healthcare_db
DB_HOST=127.0.0.1
JWT_SECRET=supersecretkey

```

### 4. Set up PostgreSQL database

```sql
-- In PostgreSQL shell or pgAdmin:
CREATE DATABASE healthcare;
CREATE USER your_db_user WITH PASSWORD 'your_db_password';
GRANT ALL PRIVILEGES ON DATABASE healthcare TO your_db_user;
```

### 5. Run the server

```bash
npm start
```

> Sequelize will automatically sync models with the database (no CLI used).

---

## 🧪 API Testing

All protected routes require an `Authorization` header:

```
Authorization: Bearer <your_token>
```

---

## 🔐 Auth APIs

### Register

`POST /api/auth/register`

```json
{
  "name": "Sahil Meshram",
  "email": "sahil@sunbeam.com",
  "password": "Sahil@1234"
}
```

### Login

`POST /api/auth/login`

```json
{
  "email": "sahil@sunbeam.com",
  "password": "Sahil@1234"
}
```

Returns a JWT token.

---

## 👨‍⚕️ Doctor APIs

> Auth required

* `POST /api/doctors/` – Add doctor
* `GET /api/doctors/` – List all doctors
* `GET /api/doctors/:id` – Get a specific doctor
* `PUT /api/doctors/:id` – Update a doctor
* `DELETE /api/doctors/:id` – Delete a doctor

**Sample Add Doctor:**

```json
{
  "name": "Dr. Sahil Meshram",
  "specialization": "Heart Splity",
  "contactNumber": "8999172773",
  "email": "sahil@sunbeam.com"
}
```

---

## 👨‍💼 Patient APIs

> Auth required

* `POST /api/patients/` – Add patient
* `GET /api/patients/` – List all patients for logged-in user
* `GET /api/patients/:id` – Get a patient
* `PUT /api/patients/:id` – Update patient
* `DELETE /api/patients/:id` – Delete patient

**Sample Add Patient:**

```json
{
  "name": "Adtiya Tirpude",
  "age": 35,
  "gender": "male",
  "contactNumber": "+120034",
  "address": "123 Main St, Anytown, USA",
  "medicalHistory": "Allergic to penicillin, history of asthma"
}
```

---

## 🔗 Patient-Doctor Mapping APIs

> Auth required

* `POST /api/mappings/` – Assign a doctor to a patient
* `GET /api/mappings/` – List all mappings
* `GET /api/mappings/:patientId` – List doctors assigned to a patient
* `DELETE /api/mappings/:id` – Remove a mapping

**Sample Mapping:**

```json
{
  "patientId": 2,
  "doctorId": 4
}
```


---

## 👨‍💻 Author

* **Sahil Meshram**
* GitHub: [@Sahil3M3](https://github.com/Sahil3M3)

---

