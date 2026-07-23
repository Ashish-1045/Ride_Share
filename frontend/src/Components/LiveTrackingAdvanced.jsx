import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ------------------------------------------------------------------
// Custom marker icons (no external image files or API key needed)
// ------------------------------------------------------------------
const userIcon = new L.DivIcon({
  html: `<div style="
    width:20px;height:20px;border-radius:50%;
    background:#4285F4;border:3px solid #fff;
    box-shadow:0 0 4px rgba(0,0,0,0.4);
  "></div>`,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const captainIcon = new L.DivIcon({
  html: `<div style="
    width:26px;height:26px;border-radius:50%;
    background:#FF6B6B;border:3px solid #fff;
    box-shadow:0 0 4px rgba(0,0,0,0.4);
    display:flex;align-items:center;justify-content:center;
    font-size:13px;
  ">🚗</div>`,
  className: "",
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

// ------------------------------------------------------------------
// Re-centers the map (between user & captain) whenever locations change
// ------------------------------------------------------------------
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [center, map]);
  return null;
};

const DEFAULT_CENTER = [28.6139, 77.209]; // Delhi fallback
const toLatLng = (loc) => (loc ? [loc.lat, loc.lng] : null);

// Haversine distance in km
const calculateDistance = (a, b) => {
  if (!a || !b) return null;
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return (R * c).toFixed(2);
};

const LiveTrackingAdvanced = ({
  userLocation,
  captainLocation,
  onLocationChange,
}) => {
  const [routePath, setRoutePath] = useState([]);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);

  // Build a route trail from the user's own location updates
  useEffect(() => {
    if (userLocation) {
      setLoading(false);
      setRoutePath((prev) => {
        const last = prev[prev.length - 1];
        const point = toLatLng(userLocation);
        if (
          !last ||
          Math.abs(last[0] - point[0]) > 0.0001 ||
          Math.abs(last[1] - point[1]) > 0.0001
        ) {
          return [...prev, point];
        }
        return prev;
      });
      if (onLocationChange) onLocationChange(userLocation);
    }
  }, [userLocation, onLocationChange]);

  // Recompute distance whenever either location changes
  useEffect(() => {
    if (userLocation && captainLocation) {
      setDistance(calculateDistance(userLocation, captainLocation));
    }
  }, [userLocation, captainLocation]);

  const center =
    userLocation && captainLocation
      ? [
          (userLocation.lat + captainLocation.lat) / 2,
          (userLocation.lng + captainLocation.lng) / 2,
        ]
      : toLatLng(userLocation) || toLatLng(captainLocation) || DEFAULT_CENTER;

  if (loading && !userLocation && !captainLocation) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-3"></div>
          <p className="text-gray-600">Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={15}
        style={{ width: "100%", height: "100%", minHeight: "500px" }}
        zoomControl={true}
      >
        {/* Free OpenStreetMap tiles — no API key required */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap center={center} />

        {userLocation && (
          <Marker position={toLatLng(userLocation)} icon={userIcon}>
            <Popup>
              📍 Your Location
              <br />
              Lat: {userLocation.lat.toFixed(4)}, Lng:{" "}
              {userLocation.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}

        {captainLocation && (
          <Marker position={toLatLng(captainLocation)} icon={captainIcon}>
            <Popup>
              🚗 Captain Location
              <br />
              Lat: {captainLocation.lat.toFixed(4)}, Lng:{" "}
              {captainLocation.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}

        {routePath.length > 1 && (
          <Polyline
            positions={routePath}
            pathOptions={{ color: "#4285F4", weight: 4, opacity: 0.7 }}
          />
        )}
      </MapContainer>

      {distance && (
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-[1000]">
          <div className="text-sm">
            <p className="text-gray-600 font-semibold">Distance to Captain</p>
            <p className="text-2xl font-bold text-blue-600">{distance} km</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTrackingAdvanced;
