# 💊 Pharmacy Inventory Management System

A **full-stack Pharmacy Inventory Management System** designed to efficiently manage medicine inventory through a secure, user-friendly dashboard. The system helps pharmacies maintain accurate stock levels, track expiry dates, and ensure secure access to sensitive inventory data.

---

## 🚀 Key Features

* ➕ **Create, Update, and Delete** medicine records
* 💰 **Price management** for medicines
* ⏳ **Expiry date tracking** to reduce wastage and improve safety
* 📦 **Real-time stock and inventory monitoring**
* 🔐 **Secure authentication** using JWT
* 🛡️ **Protected REST APIs** for authorized access only

---

## 🛠️ Technology Stack

### Frontend

* **React.js** – Dynamic and component-based UI
* **Axios** – API communication
* **CSS** – Styling and layout

### Backend

* **Django** – Backend framework
* **Django REST Framework (DRF)** – RESTful API development

### Authentication

* **JSON Web Tokens (JWT)** – Secure user authentication and authorization

### Database

* **SQLite** – Development database (can be extended to PostgreSQL/MySQL)

---

## 🏗️ System Architecture

* **React Frontend** communicates with backend via REST APIs using Axios
* **Django REST API** handles business logic, authentication, and validation
* **JWT** secures endpoints and user sessions
* **SQLite** stores medicine and user data

---

## 📂 Project Structure

```
pharmacy-inventory-management/
│
├── frontend/              # React.js application
│
├── backend/               # Django project
│   ├── api/               # REST API apps
│   ├── models.py          # Database models
│   ├── serializers.py     # DRF serializers
│   ├── views.py           # API views
│   └── urls.py            # API routes
│
└── db.sqlite3             # SQLite database (development)
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js (v16 or later)
* Python 3.9+
* pip
* Virtualenv (recommended)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/pharmacy-inventory-management-system.git
cd pharmacy-inventory-management-system
```

---

### 2️⃣ Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend will run at: `http://localhost:8000`

---

### 3️⃣ Frontend Setup (React.js)

```bash
cd frontend
npm install
npm start
```

Frontend will run at: `http://localhost:3000`

---

## 🔐 Authentication Flow

1. User logs in with credentials
2. Backend issues a **JWT access token**
3. Token is sent in request headers for protected endpoints
4. Unauthorized access is blocked automatically

---

## 📸 Screenshots (Optional)

*Add screenshots or demo GIFs to showcase the dashboard and features.*

---

## 🌱 Future Enhancements

* Role-based access control (Admin / Pharmacist)
* Low-stock alerts and notifications
* Supplier and purchase management
* Reports and analytics dashboard
* Deployment with PostgreSQL and Docker

---

## 🤝 Contributing

Contributions are welcome! Fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Pathirage**
Full-Stack Developer

If you find this project useful, consider giving it a ⭐
