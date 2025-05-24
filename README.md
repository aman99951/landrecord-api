
# 📄 Land Record API Documentation

A **Node.js API** for generating **land record PDFs** using data retrieved from a **MySQL** database.

---

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Setup Instructions](#setup-instructions)  
3. [Database Configuration](#database-configuration)  
4. [API Endpoint](#api-endpoint)  
5. [Testing the API](#testing-the-api)  
6. [Viewing PDF Outputs](#viewing-pdf-outputs)  
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

- **Node.js** (v14+)
- **MySQL** (v5.7+)
- **Git** (optional)

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aman99951/landrecord-api.git
   cd landrecord-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` File**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=land_records
   PORT=3000
   ```

---

## 🗃️ Database Configuration

1. **Initialize the Database**
   ```sql
   CREATE DATABASE land_records;
   USE land_records;

   CREATE TABLE land_parcels (
       id INT AUTO_INCREMENT PRIMARY KEY,
       parcel_id VARCHAR(50) UNIQUE,
       plot_number VARCHAR(50),
       owner_name VARCHAR(100),
       area DECIMAL(10,2),
       location VARCHAR(255),
       registration_date DATE
   );
   ```

2. **Insert Sample Data**
   ```sql
   INSERT INTO land_parcels (parcel_id, plot_number, owner_name, area, location, registration_date) VALUES
     ('DL1001', 'PLOT-123', 'Aman Sharma', 120.5, 'Delhi', '2020-01-15'),
     ('DL1002', 'PLOT-456', 'Rahul Verma', 200.0, 'Noida', '2019-05-20'),
     ('DL1003', 'PLOT-789', 'Priya Singh', 150.75, 'Gurgaon', '2021-03-10');
   ```

3. **Verify the Data**
   ```sql
   SELECT * FROM land_parcels;
   ```

---

## 🔌 API Endpoint

### `POST /api/search`

**Description:**  
Generates a PDF for the land parcel using `parcel_id`.

**Request Body (JSON):**
```json
{
  "parcel_id": "DL1001"
}
```

**Response:**  
Returns a downloadable PDF file containing land parcel details.

---

## 🧪 Testing the API

1. **Start the Server**
   ```bash
   node app.js
   ```

2. **Send a Request (PowerShell - Windows)**
   ```powershell
   curl.exe -X POST http://localhost:3000/api/search `
     -H "Content-Type: application/json" `
     -d "{\"parcel_id\":\"DL1001\"}" `
     -o land_record.pdf
   ```

---

## 📄 Viewing PDF Outputs

After a successful request, open the downloaded PDF using:

```powershell
Start-Process land_record.pdf
```

---

## 🛠️ Troubleshooting

- **Connection Refused:** Ensure MySQL server is running and credentials are correct in `.env`.
- **No Data Found:** Check if the `parcel_id` exists in the database.
- **Port in Use:** Change the `PORT` value in `.env` if 3000 is occupied.
