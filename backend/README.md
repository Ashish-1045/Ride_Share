# Backend API Documentation

## Overview

This backend powers the RideShare app with authentication, ride handling, and map-based location services.

### Implemented features

- User registration, login, profile, and logout
- Captain registration, login, profile, and logout
- Ride creation and fare calculation
- Address lookup and route distance/time estimation
- Place suggestions from the maps service

## Tech stack

- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- express-validator for request validation
- Axios for external API calls

## Environment variables

Create a `.env` file in the backend folder with:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEOAPIFY_API_KEY=your_geoapify_key
NODE_ENV=development
```

## Getting started

```bash
cd backend
npm install
npm start
```

The server will run on `http://localhost:3000`.

---

## Authentication

Most protected routes require a valid JWT token.

You can send it in either of these ways:

- `Authorization: Bearer <token>`
- Cookie named `token`

---

## User routes

### `POST /users/register`

Registers a new user.

#### Request body

```json
{
  "fullname": {
    "firstname": "Aman",
    "lastname": "Sharma"
  },
  "email": "aman@example.com",
  "password": "123456"
}
```

#### Response

```json
{
  "user": {
    "id": "...",
    "email": "aman@example.com",
    "fullname": {
      "firstname": "Aman",
      "lastname": "Sharma"
    }
  }
}
```

### `POST /users/login`

Logs in an existing user.

#### Request body

```json
{
  "email": "aman@example.com",
  "password": "123456"
}
```

### `GET /users/profile`

Returns the current authenticated user's profile.

### `POST /users/logout`

Logs out the current user and blacklists the active token.

---

## Captain routes

### `POST /captains/register`

Registers a new captain.

#### Request body

```json
{
  "fullname": {
    "firstname": "Ravi",
    "lastname": "Patel"
  },
  "email": "ravi@example.com",
  "password": "123456",
  "vehicle": {
    "color": "Black",
    "plate": "MP09AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### `POST /captains/login`

Logs in an existing captain.

### `GET /captains/profile`

Returns the authenticated captain profile.

### `GET /captains/logout`

Logs out the captain and invalidates the active token.

---

## Ride routes

### `POST /rides/create`

Creates a ride request for the authenticated user.

#### Query/body values

- `pickup`: pickup location string
- `destination`: destination location string
- `vehicleType`: `auto`, `car`, or `motorcycle`

Example:

```http
POST /rides/create?pickup=Indore&destination=Bhopal&vehicleType=car
```

### `POST /rides/getfare`

Calculates an estimated fare between two locations.

Example:

```http
POST /rides/getfare?pickup=Indore&destination=Bhopal
```

---

## Maps routes

### `GET /maps/getCoordinates`

Gets latitude and longitude for a given address.

Example:

```http
GET /maps/getCoordinates?address=Bhopal
```

### `GET /maps/getDistanceTime`

Returns approximate distance and travel duration between two addresses.

Example:

```http
GET /maps/getDistanceTime?origin=Bhopal&destination=Indore
```

### `GET /maps/get-suggestions`

Returns location suggestions for a typed input string.

Example:

```http
GET /maps/get-suggestions?input=bhopal
```

### `GET /maps/test`

Simple health check endpoint for the maps route.

---

## Notes

- Validation is enforced for required fields and minimum lengths.
- Logout routes blacklist the current token for future auth checks.
- The map suggestions feature uses the Geoapify API and depends on `GEOAPIFY_API_KEY` being configured.
