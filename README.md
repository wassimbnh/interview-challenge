# 🚀 Documentation

Hi! 👋 This documentation will help us understand the project structure, endpoints, and routes.

---

## 🎯 Running the Project

**Backend:**

```bash
cd backend
npm install
npm run start:dev
```

Access on `http://localhost:8080/api`.

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Access on `http://localhost:3000`.

The SQLite database is located at `backend/database.sqlite`.

---

## 📩 Backend Endpoint

👤 Patients Endpoints

| Method | Endpoint           | Query Params | Description                |
| ------ | ------------------ | ------------ | -------------------------- |
| POST   | `/patients/create` | –            | Create a new patient       |
| GET    | `/patients/all`    | –            | Retrieve all patients      |
| GET    | `/patients/one`    | `patientId`  | Retrieve one patient by ID |
| PUT    | `/patients/update` | `patientId`  | Update a patient by ID     |
| DELETE | `/patients/delete` | `patientId`  | Delete a patient by ID     |

💊 Medications Endpoints

| Method | Endpoint              | Query Params   | Description                   |
| ------ | --------------------- | -------------- | ----------------------------- |
| POST   | `/medications/create` | –              | Create a new medication       |
| GET    | `/medications/all`    | –              | Retrieve all medications      |
| GET    | `/medications/one`    | `medicationId` | Retrieve one medication by ID |
| PUT    | `/medications/update` | `medicationId` | Update a medication by ID     |
| DELETE | `/medications/delete` | `medicationId` | Delete a medication by ID     |

📋 Assignments Endpoints

| Method | Endpoint                            | Query Params                | Description                  |
| ------ | ----------------------------------- | --------------------------- | ---------------------------- |
| POST   | `/assign/medication/patient`        | `patientId`                 | Assign medication patient    |
| GET    | `/assign/get/medication-by-patient` | `patientId`                 | Get medications of patient   |
| GET    | `/assign/get/by-patient`            | `patientId`                 | Get all assignment of patient|
| GET    | `/assign/get/remain/treatment-days` | –                           | Get remaining treatment day  |
| DELETE | `/assign/delete`                    | `patientId`, `medicationId` | Delete specific assignment   |



## 📩 Frontend Routes

| Route                   | Description                     | 
| ------------------------| --------------------------------| 
| `/`                     | Main page                       | 
| `/medication`           | Access to medications operations| 
| `/patient`              | Access to patients operations   |  
| `/assignment`           | Access to assignments operations| 


Thank you for your interest.
