import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
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
    width:24px;height:24px;border-radius:50%;
    background:#FF6B6B;border:3px solid #fff;
    box-shadow:0 0 4px rgba(0,0,0,0.4);
    display:flex;align-items:center;justify-content:center;
    font-size:12px;
  ">🚗</div>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// ------------------------------------------------------------------
// Helper component: re-centers the map whenever `center` changes
// (MapContainer's `center` prop only applies on first render)
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

const LiveTracking = ({ userLocation, captainLocation }) => {
  const [routePath, setRoutePath] = useState([]);

  // Build a simple route trail from the user's own location updates
  useEffect(() => {
    if (userLocation) {
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
    }
  }, [userLocation]);

  const center =
    toLatLng(userLocation) || toLatLng(captainLocation) || DEFAULT_CENTER;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={15}
        style={{ width: "100%", height: "100%", minHeight: "400px" }}
        zoomControl={true}
      >
        {/* Free OpenStreetMap tiles — no API key required */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap center={center} />

        {userLocation && (
          <Marker position={toLatLng(userLocation)} icon={userIcon} />
        )}

        {captainLocation && (
          <Marker position={toLatLng(captainLocation)} icon={captainIcon} />
        )}

        {routePath.length > 1 && (
          <Polyline
            positions={routePath}
            pathOptions={{ color: "#4285F4", weight: 4, opacity: 0.7 }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LiveTracking;
