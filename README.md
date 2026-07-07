# 🚖 RideShare

RideShare is a full-stack ride booking app built with React, Vite, Node.js, Express, MongoDB, Socket.IO, and Google Maps APIs. It supports user and captain flows for booking rides, estimating fares, and receiving real-time ride updates.

---

## ✨ Features

### User Features

- User registration and login
- JWT-based authentication
- Ride booking and fare estimation
- Location search and suggestions
- Real-time ride confirmation updates

### Captain Features

- Captain registration and login
- Vehicle details registration
- Ride acceptance flow
- Real-time new ride notifications
- Live captain location updates

### Real-Time Features

- Socket.IO-based join events
- New ride events for captains
- Ride confirmation events for users
- Captain location updates

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- GSAP
- Socket.IO Client
- Remix Icon

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO

### APIs

- Google Maps API
- Geocoding API
- Places API

---

## 📁 Project Structure

```text
RideShare/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── Routes/
│   ├── services/
│   ├── app.js
│   ├── server.js
│   └── socketio.js
└── Frontend/
    ├── src/
    │   ├── Components/
    │   ├── context/
    │   ├── pages/
    │   └── main.jsx
    └── package.json
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ashish-1045/Ride_Share.git
cd RideShare
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Start the backend server:

```bash
node server.js
```

### 3. Frontend setup

```bash
cd ../Frontend
npm install
npm run dev
```

Create a `.env` file inside the Frontend folder if needed:

```env
VITE_BASE_URL=http://localhost:4000
```

---

## 📖 API Routes

### User Routes

#### Register User

```http
POST /users/register
```

Request body:

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

#### Login User

```http
POST /users/login
```

#### Get User Profile

```http
GET /users/profile
```

#### Logout User

```http
GET /users/logout
```

### Captain Routes

#### Register Captain

```http
POST /captains/register
```

#### Login Captain

```http
POST /captains/login
```

#### Get Captain Profile

```http
GET /captains/profile
```

#### Logout Captain

```http
GET /captains/logout
```

### Maps Routes

#### Get Coordinates

```http
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway
```

#### Get Distance & Time

```http
GET /maps/get-distance-time?origin=NewYork&destination=LosAngeles
```

#### Get Suggestions

```http
GET /maps/get-suggestions?input=1600+Amphitheatre
```

### Ride Routes

#### Create Ride

```http
POST /rides/create
```

#### Get Fare Estimate

```http
GET /rides/getfare
```

#### Confirm Ride

```http
POST /rides/confirm
```

---

## 🔌 Socket Events

The app uses Socket.IO for real-time communication.

### Client to Server

- `join` — joins a user or captain room using their user id
- `update-location-captain` — sends captain live location

### Server to Client

- `new-ride` — sent to nearby captains when a ride is created
- `ride-confirmed` — sent to the user when a captain accepts the ride

---

## 👨‍💻 Author

**Ashish Maheshwari**

GitHub: https://github.com/Ashish-1045

LinkedIn: https://www.linkedin.com/in/ashish-maheshwari-1564b325a

Portfolio: https://portfolio-20k7yegu8-ashish-maheshwaris-projects-ac4f06a6.vercel.app
