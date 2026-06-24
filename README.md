# 🚖 RideShare

A Full Stack Ride Booking Application built using **React.js, Node.js, Express.js, MongoDB, Socket.io, and Google Maps APIs**.

---

## 📌 Features

### User Features

* User Registration & Login
* JWT Authentication
* Profile Management
* Ride Booking
* Fare Estimation
* Location Search & Suggestions
* Real-time Ride Tracking

### Captain Features

* Captain Registration & Login
* Vehicle Registration
* Ride Acceptance
* Profile Management
* Real-time Ride Updates

### Maps Features

* Address Autocomplete Suggestions
* Distance & Duration Calculation
* Coordinates Retrieval

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* GSAP

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.io

### APIs

* Google Maps API
* Geocoding API
* Places API

---

# 📖 API Documentation

---

## 👤 User Routes

### Register User

**Endpoint**

```http
POST /users/register
```

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "user": {},
  "token": "JWT_TOKEN"
}
```

---

### Login User

**Endpoint**

```http
POST /users/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "user": {},
  "token": "JWT_TOKEN"
}
```

---

### User Profile

**Endpoint**

```http
GET /users/profile
```

### Authentication

```http
Authorization: Bearer <token>
```

---

### Logout User

**Endpoint**

```http
GET /users/logout
```

### Authentication

```http
Authorization: Bearer <token>
```

---

## 🚗 Captain Routes

### Register Captain

**Endpoint**

```http
POST /captains/register
```

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "captain@example.com",
  "password": "123456",
  "vehicle": {
    "color": "Black",
    "plate": "MP09AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response

```json
{
  "captain": {},
  "token": "JWT_TOKEN"
}
```

---

### Login Captain

**Endpoint**

```http
POST /captains/login
```

### Request Body

```json
{
  "email": "captain@example.com",
  "password": "123456"
}
```

---

### Captain Profile

**Endpoint**

```http
GET /captains/profile
```

### Authentication

```http
Authorization: Bearer <token>
```

---

### Logout Captain

**Endpoint**

```http
GET /captains/logout
```

### Authentication

```http
Authorization: Bearer <token>
```

---

## 🗺️ Maps Routes

### Get Coordinates

**Endpoint**

```http
GET /maps/get-coordinates
```

### Query Parameters

| Parameter | Type   | Required |
| --------- | ------ | -------- |
| address   | string | Yes      |

### Example

```http
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway
```

### Response

```json
{
  "lat": 37.4224764,
  "lng": -122.0842499
}
```

---

### Get Distance & Time

**Endpoint**

```http
GET /maps/get-distance-time
```

### Query Parameters

| Parameter   | Type   | Required |
| ----------- | ------ | -------- |
| origin      | string | Yes      |
| destination | string | Yes      |

### Example

```http
GET /maps/get-distance-time?origin=NewYork&destination=LosAngeles
```

---

### Get Suggestions

**Endpoint**

```http
GET /maps/get-suggestions
```

### Query Parameters

| Parameter | Type   | Required |
| --------- | ------ | -------- |
| input     | string | Yes      |

### Example

```http
GET /maps/get-suggestions?input=1600+Amphitheatre
```

---

## 🚕 Ride Routes

### Create Ride

**Endpoint**

```http
POST /rides/create
```

### Authentication

```http
Authorization: Bearer <token>
```

### Request Body

```json
{
  "pickup": "Bhopal",
  "destination": "Indore",
  "vehicleType": "car"
}
```

### Response

```json
{
  "ride": {},
  "fare": 450,
  "distance": 190,
  "duration": 180,
  "otp": "123456"
}
```

---

### Get Fare Estimate

**Endpoint**

```http
GET /rides/getfare
```

### Authentication

```http
Authorization: Bearer <token>
```

### Query Parameters

| Parameter   | Type   | Required |
| ----------- | ------ | -------- |
| pickup      | string | Yes      |
| destination | string | Yes      |

### Example

```http
GET /rides/getfare?pickup=Bhopal&destination=Indore
```

### Response

```json
{
  "auto": 250,
  "car": 350,
  "motorcycle": 180
}
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/RideShare.git
```

### Install Dependencies

```bash
npm install
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in backend:

```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

---

## 👨‍💻 Author

**Ashish Maheshwari**

GitHub: https://github.com/Ashish-1045

LinkedIn: https://www.linkedin.com/in/ashish-maheshwari-1564b325a

Portfolio: https://portfolio-20k7yegu8-ashish-maheshwaris-projects-ac4f06a6.vercel.app
