import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// ---------------- User Icon ----------------

const userIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],

  iconAnchor: [12, 41],
});

// ---------------- Captain Icon ----------------

const captainIcon = new L.DivIcon({
  html: `
    <div style="
      width:32px;
      height:32px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:22px;
    ">
      🚗
    </div>
  `,

  className: "",

  iconSize: [32, 32],

  iconAnchor: [16, 16],
});

// ---------------- Change Map View ----------------

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 16, {
        animate: true,
      });
    }
  }, [center, map]);

  return null;
}

// ---------------- Live Tracking ----------------

export default function LiveTracking({ userLocation, captainLocation }) {
  console.log("User Location:", userLocation);

  console.log("Captain Location:", captainLocation);

  // Safe validation

  const hasUserLocation =
    userLocation?.lat !== undefined && userLocation?.lng !== undefined;

  const hasCaptainLocation =
    captainLocation?.lat !== undefined && captainLocation?.lng !== undefined;

  // Default center

  const center = hasUserLocation
    ? [userLocation.lat, userLocation.lng]
    : hasCaptainLocation
      ? [captainLocation.lat, captainLocation.lng]
      : [23.2599, 77.4126];

  return (
    <div className="w-full h-full">
      <MapContainer
        center={center}
        zoom={16}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_4t5t_1_58ce9a7e7b7d4834ca8669c2"
          subdomains="abcd"
          maxZoom={20}
        />
        <ChangeView center={center} />

        {/* USER LOCATION */}

        {hasUserLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          />
        )}

        {/* CAPTAIN LOCATION */}

        {hasCaptainLocation && (
          <Marker
            key={`${captainLocation?.lat}-${captainLocation?.lng}`}
            position={[captainLocation.lat, captainLocation.lng]}
            icon={captainIcon}
          />
        )}

        {/* ROUTE */}

        {hasUserLocation && hasCaptainLocation && (
          <Polyline
            positions={[
              [userLocation.lat, userLocation.lng],

              [captainLocation.lat, captainLocation.lng],
            ]}
            pathOptions={{
              color: "#000",

              weight: 5,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
