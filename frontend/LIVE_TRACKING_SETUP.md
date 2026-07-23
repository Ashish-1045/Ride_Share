# Live Tracking Setup Guide

## Required Environment Variables

Create a `.env.local` file in the `Frontend` directory with the following variables:

```env
# Google Maps API Key
# Get your key from: https://console.cloud.google.com/
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE

# Socket.io Server URL
VITE_SOCKET_URL=http://localhost:3000
```

## Setup Steps

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Directions API
   - Distance Matrix API
4. Create an API key (Credentials > Create Credentials > API Key)
5. Copy the API key and add it to `.env.local`

### 2. Install Dependencies

```bash
cd Frontend
npm install @react-google-maps/api
npm install socket.io-client  # Already installed
```

### 3. Update Backend (socketio.js)

Ensure your backend is sending location updates via Socket.io:

```javascript
socket.on("send-location", (data) => {
  // Broadcast location to ride participants
  io.to(`ride-${rideId}`).emit("location-update", data);
});
```

### 4. Usage in Components

```jsx
import LiveTracking from "./Components/LiveTracking";
import useLocationTracking from "./hooks/useLocationTracking";

function YourComponent() {
  const { userLocation, captainLocation } = useLocationTracking(userId, "user");

  return (
    <LiveTracking
      userLocation={userLocation}
      captainLocation={captainLocation}
    />
  );
}
```

## Features

✅ Real-time location tracking with Socket.io
✅ Google Maps integration with custom markers
✅ Route visualization with polylines
✅ Automatic location updates via Geolocation API
✅ Captain/Driver location display
✅ Connection status handling
✅ Error handling for location services

## Troubleshooting

- **"API key not valid"**: Check that your Google Maps API key is correctly set in `.env.local`
- **Location not updating**: Ensure geolocation permissions are granted in your browser
- **Socket not connecting**: Verify backend Socket.io server is running and accessible
- **Map not loading**: Check browser console for CORS errors and ensure API is enabled

## Browser Permissions

Users may need to grant location permission when first using the app. Some browsers show a location access popup.
