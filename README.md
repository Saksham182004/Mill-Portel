# Mill Portal

A full-stack order management web application built for a real-world grain mill business. Customers can browse pricing, place orders, and pay online via UPI. Admins manage orders, pricing, payments, and customer feedback through a dedicated dashboard.

**Live Demo:** [mill-portal-frontend.onrender.com](https://mill-portal-frontend.onrender.com)

---

## Features

### Customer
- Register & log in securely
- View current grain pricing (Rice, Wheat, Flour)
- Place orders with quantity selection
- Pay online via Razorpay UPI
- Track order status in real time
- Submit feedback

### Admin
- Dashboard with order and revenue overview
- Manage all customer orders & update delivery status
- Track payment status across all orders
- Update item pricing
- View all customer feedback

---

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router DOM
- Material UI + Bootstrap
- AG Grid + Recharts

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Razorpay SDK

**Deployed On**
- Render (frontend static site + backend web service)
- MongoDB Atlas (cloud database)

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local) or MongoDB Atlas URI

### Clone the repo

```bash
git clone https://github.com/Saksham182004/Mill-Portel.git
cd Mill-Portel
```

### Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

```bash
npm run dev
```

### Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file in `/client`:

```env
VITE_API_URL=http://localhost:8080
```

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:8080`.

---

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `PORT` | server/.env | Backend port |
| `MONGO_URL` | server/.env | MongoDB connection string |
| `JWT_SECRET` | server/.env | Secret key for JWT signing |
| `RAZORPAY_KEY_ID` | server/.env | Razorpay API key |
| `RAZORPAY_KEY_SECRET` | server/.env | Razorpay secret key |
| `VITE_API_URL` | client/.env | Backend base URL |

---

## API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | None | Register new customer |
| POST | `/api/auth/login` | None | Login & receive JWT |
| GET | `/api/orders` | Admin | Get all orders |
| POST | `/api/orders` | Customer | Place new order |
| GET | `/api/orders/my` | Customer | Get own orders |
| PUT | `/api/orders/:id/status` | Admin | Update order status |
| POST | `/api/payments/create-order` | Customer | Create Razorpay order |
| POST | `/api/payments/verify` | Customer | Verify payment signature |
| GET | `/api/pricing` | Any | Get all item prices |
| PUT | `/api/pricing` | Admin | Update item price |
| POST | `/api/feedback` | Customer | Submit feedback |
| GET | `/api/feedback` | Admin | View all feedback |

---

## Project Structure

```
mill-portel/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   └── vite.config.js
└── server/          # Express backend
    └── src/
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        └── routes/
```

---

## Deployment

Both services are deployed on **Render** with automatic deploys on every push to `main`.

- **Frontend** — Render Static Site (build: `npm run build`, publish: `dist/`)
- **Backend** — Render Web Service (start: `npm start`)
- **Database** — MongoDB Atlas M0 free cluster

---

## Author

Built by **Saksham** for a real family mill business.
