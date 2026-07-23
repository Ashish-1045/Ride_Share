# 🗺️ Live Tracking Implementation Guide

## Overview

This is a complete real-time location tracking system using Google Maps and Socket.io for a ride-sharing application. Users and captains can see each other's real-time locations on an interactive map.

## 📁 Files Created

### Frontend Components

- **`LiveTracking.jsx`** - Basic live tracking component with markers and route visualization
- **`LiveTrackingAdvanced.jsx`** - Advanced component with distance calculation, info windows, and loading states
- **`useLocationTracking.js`** - Custom React hook for managing location updates via Socket.io
- **`LiveTrackingExample.jsx`** - Integration examples showing how to use the components

### Backend

- **`socketio.js`** - Updated with location tracking event handlers

### Documentation

- **`LIVE_TRACKING_SETUP.md`** - Setup guide and troubleshooting
- **`.env.example`** - Environment variables template
- **`LIVE_TRACKING_README.md`** - This file

## 🚀 Quick Start

### 1. Environment Setup

Create `.env.local` in the Frontend directory:

```env
VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
VITE_SOCKET_URL=http://localhost:3000
```

**Get Google Maps API Key:**

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Maps JavaScript API
   - Directions API
   - Distance Matrix API
4. Create an API key and add to `.env.local`

### 2. Install Dependencies

Dependencies are already installed:

- `@react-google-maps/api` - Google Maps React wrapper
- `socket.io-client` - WebSocket client for real-time updates

### 3. Usage in Components

**Basic Usage:**

```jsx
import LiveTracking from "./Components/LiveTracking";
import useLocationTracking from "./hooks/useLocationTracking";

function MyRidePage() {
  const { userLocation, captainLocation } = useLocationTracking(userId, "user");

  return (
    <LiveTracking
      userLocation={userLocation}
      captainLocation={captainLocation}
    />
  );
}
```

**Advanced Usage:**

```jsx
import LiveTrackingAdvanced from "./Components/LiveTrackingAdvanced";

function MyRidePage() {
  const { userLocation, captainLocation } = useLocationTracking(userId, "user");

  return (
    <LiveTrackingAdvanced
      userLocation={userLocation}
      captainLocation={captainLocation}
      onLocationChange={(location) =>
        console.log("Location updated:", location)
      }
    />
  );
}
```

## 🛠️ Components & Hooks

### LiveTracking Component

Basic map display with user and captain locations.

**Props:**

- `userLocation` - Object `{lat, lng}` - User's current location
- `captainLocation` - Object `{lat, lng}` - Captain's current location

**Features:**

- Real-time marker display
- Route visualization with polylines
- Auto-centering map
- Custom marker icons
- Location permissions handling

### LiveTrackingAdvanced Component

Enhanced version with additional features.

**Props:**

- `userLocation` - Object `{lat, lng}` - User's location
- `captainLocation` - Object `{lat, lng}` - Captain's location
- `onLocationChange` - Callback function when location updates

**Features:**

- Distance calculation (km)
- Info windows on marker click
- Loading states
- Route polylines
- Distance display card
- Better UX with animations

### useLocationTracking Hook

Custom hook for managing location tracking logic.

**Usage:**

```javascript
const {
  userLocation, // User's current location
  captainLocation, // Captain's location
  socket, // Socket.io instance
  isConnected, // Connection status
  error, // Error messages
  sendLocation, // Function to manually send location
} = useLocationTracking(userId, "user");
```

**Parameters:**

- `userId` - User ID for identification
- `userType` - 'user' or 'captain'

**Features:**

- Automatic geolocation tracking
- Socket.io connection management
- Real-time location broadcasting
- Error handling
- Connection status tracking

## 📡 Socket.io Events

### Client → Server

**`join`** - Register user/captain on connect

```javascript
socket.emit("join", { userId, userType });
```

**`send-location`** - Send user's current location

```javascript
socket.emit("send-location", {
  userId,
  userType,
  latitude,
  longitude,
  timestamp,
});
```

**`captain-location`** - Send captain's location (for ride tracking)

```javascript
socket.emit("captain-location", {
  userId,
  latitude,
  longitude,
});
```

### Server → Client

**`location-update`** - Broadcast location updates

```javascript
socket.on("location-update", (data) => {
  // {userId, userType, latitude, longitude, timestamp}
});
```

**`captain-location`** - Broadcast captain's location

```javascript
socket.on("captain-location", (data) => {
  // {captainId, latitude, longitude, timestamp}
});
```

## 🎯 Implementation Steps

### Step 1: Update Your Ride Page

Replace the LiveTracking placeholder in your ride page:

```jsx
import LiveTrackingAdvanced from "./Components/LiveTrackingAdvanced";
import useLocationTracking from "./hooks/useLocationTracking";

export default function CaptainRiding() {
  const { user } = useContext(UserDataContext);
  const { userLocation, captainLocation } = useLocationTracking(
    user._id,
    "captain",
  );

  return (
    <div className="h-screen">
      <LiveTrackingAdvanced
        userLocation={userLocation}
        captainLocation={captainLocation}
      />
    </div>
  );
}
```

### Step 2: Verify Backend Socket Events

Ensure your backend is emitting location events:

```javascript
socket.on("send-location", (data) => {
  // Broadcast to all connected clients
  io.emit("location-update", data);
});
```

### Step 3: Test in Browser

1. Start your backend server (default port: 3000)
2. Start your frontend (npm run dev)
3. Open browser DevTools (F12)
4. Check Console for location updates
5. Allow location permission when prompted

## 🔍 Debugging

### Check Socket Connection

```javascript
// In browser console
socket; // Should show socket instance
socket.connected; // Should be true
```

### Check Location Updates

```javascript
// In browser console
navigator.geolocation.getCurrentPosition((pos) => {
  console.log("Location:", pos.coords);
});
```

### Check Google Maps API

```javascript
// In browser console
google; // Should be defined
google.maps.Map; // Should exist
```

## 📊 Data Flow

```
┌─────────────────────────────────────────────────┐
│                   Frontend                      │
│  ┌──────────────────────────────────────────┐   │
│  │ useLocationTracking Hook                 │   │
│  │ ├─ Gets geolocation                      │   │
│  │ ├─ Connects to Socket.io                 │   │
│  │ └─ Emits 'send-location'                 │   │
│  └──────────────────────────────────────────┘   │
│                      ↓                          │
│  ┌──────────────────────────────────────────┐   │
│  │ LiveTracking Components                  │   │
│  │ ├─ Displays Google Map                   │   │
│  │ ├─ Shows user marker                     │   │
│  │ ├─ Shows captain marker                  │   │
│  │ └─ Visualizes route                      │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      ↕️ (Socket.io)
┌─────────────────────────────────────────────────┐
│                    Backend                      │
│  ┌──────────────────────────────────────────┐   │
│  │ Socket.io Server (socketio.js)           │   │
│  │ ├─ Receives 'send-location'              │   │
│  │ ├─ Stores in activeSocketConnections     │   │
│  │ ├─ Updates database                      │   │
│  │ └─ Broadcasts 'location-update'          │   │
│  └──────────────────────────────────────────┘   │
│                      ↓                          │
│  ┌──────────────────────────────────────────┐   │
│  │ Database (MongoDB)                       │   │
│  │ ├─ User/Captain collection               │   │
│  │ └─ Location coordinates                  │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## ⚙️ Configuration

### Customize Map Appearance

Edit in `LiveTracking.jsx` or `LiveTrackingAdvanced.jsx`:

```javascript
const mapOptions = {
  zoom: 15, // Change zoom level
  streetViewControl: false, // Show street view button
  fullscreenControl: true, // Show fullscreen button
  zoomControl: true, // Show zoom buttons
  mapTypeControl: true, // Show map type selector
  styles: [
    // Custom map styling
    {
      featureType: "water",
      stylers: [{ color: "#b3d9ff" }],
    },
  ],
};
```

### Customize Geolocation Tracking

Edit in `useLocationTracking.js`:

```javascript
{
  enableHighAccuracy: true,     // Use GPS if available
  timeout: 10000,               // Wait 10 seconds for position
  maximumAge: 0,                // Always get fresh position
}
```

### Customize Marker Icons

Create custom SVG icons:

```javascript
const userMarkerIcon = {
  url: "data:image/svg+xml;base64,...",
  scaledSize: new google.maps.Size(32, 32),
};
```

## 🐛 Troubleshooting

### Map Not Loading

- ❌ API key is invalid or not enabled
- ✅ Check Google Cloud Console
- ✅ Enable Maps JavaScript API

### Location Not Updating

- ❌ Browser location permission denied
- ✅ Grant location permission
- ✅ Check browser privacy settings

### Socket Connection Issues

- ❌ Backend server not running
- ✅ Start backend: `npm start` in backend folder
- ✅ Check VITE_SOCKET_URL matches backend

### Markers Not Showing

- ❌ Location data is null or invalid
- ✅ Check console for errors
- ✅ Verify location format: `{lat: number, lng: number}`

## 🔐 Security & Privacy

- Always use HTTPS in production (required for geolocation)
- Store API key securely (never in public code)
- Request location permission from users
- Allow users to disable tracking
- Comply with data protection laws (GDPR, etc.)

## 📈 Performance Tips

1. **Limit update frequency** - Don't update location too often
2. **Use clustering** - Show clustered markers for many locations
3. **Optimize polylines** - Limit route path history
4. **Lazy load maps** - Load map only when needed
5. **Cache API responses** - Reduce API calls

## 📚 Additional Resources

- [Google Maps API Documentation](https://developers.google.com/maps)
- [React Google Maps Documentation](https://react-google-maps-api-docs.netlify.app/)
- [Socket.io Documentation](https://socket.io/docs/)
- [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

## 💡 Future Enhancements

- [ ] Route optimization (best path)
- [ ] ETA calculation
- [ ] Traffic layer overlay
- [ ] Turn-by-turn directions
- [ ] Speed calculation
- [ ] Ride history
- [ ] Emergency alerts
- [ ] Offline support

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready
