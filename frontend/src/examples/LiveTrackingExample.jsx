import React, { useContext, useEffect, useState } from "react";
import LiveTracking from "../Components/LiveTracking";
import LiveTrackingAdvanced from "../Components/LiveTrackingAdvanced";
import useLocationTracking from "../hooks/useLocationTracking";
import { UserDataContext } from "../context/UserContext";

/**
 * EXAMPLE: How to integrate Live Tracking in your ride pages
 *
 * This file shows two implementations:
 * 1. Basic LiveTracking - Simple map with location markers
 * 2. Advanced LiveTracking - Includes distance, route visualization, and status
 */

// ============================================================
// EXAMPLE 1: Basic Implementation (Simple)
// ============================================================
export const RidingPageBasic = () => {
  const { user } = useContext(UserDataContext);
  const { userLocation, captainLocation } = useLocationTracking(
    user._id,
    "user",
  );

  return (
    <div className="h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg h-full">
        <LiveTracking
          userLocation={userLocation}
          captainLocation={captainLocation}
        />
      </div>
    </div>
  );
};

// ============================================================
// EXAMPLE 2: Advanced Implementation (With Features)
// ============================================================
export const RidingPageAdvanced = () => {
  const { user } = useContext(UserDataContext);
  const { userLocation, captainLocation, isConnected, error } =
    useLocationTracking(user._id, "user");

  const [rideDetails, setRideDetails] = useState(null);

  const handleLocationChange = (newLocation) => {
    console.log("User location updated:", newLocation);
    // You can use this callback to trigger other actions
    // For example: update ride details, calculate ETA, etc.
  };

  return (
    <div className="h-screen bg-gray-100 p-4 flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-lg shadow-md p-4 mb-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Live Tracking</h1>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {isConnected ? "Connected" : "Connecting..."}
            </span>
          </div>
        </div>
        {error && <p className="text-sm text-red-600 mt-2">⚠️ {error}</p>}
      </div>

      {/* Map Container */}
      <div className="flex-1 bg-white shadow-lg rounded-b-lg overflow-hidden">
        <LiveTrackingAdvanced
          userLocation={userLocation}
          captainLocation={captainLocation}
          onLocationChange={handleLocationChange}
        />
      </div>

      {/* Ride Details Card */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600 text-sm">User Location</p>
            <p className="text-sm font-mono">
              {userLocation
                ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
                : "Getting location..."}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Captain Location</p>
            <p className="text-sm font-mono">
              {captainLocation
                ? `${captainLocation.lat.toFixed(4)}, ${captainLocation.lng.toFixed(4)}`
                : "Waiting..."}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Status</p>
            <p className="text-sm font-semibold text-green-600">On the way</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// EXAMPLE 3: Minimal Implementation (For Compact Screens)
// ============================================================
export const RidingPageMinimal = () => {
  const { user } = useContext(UserDataContext);
  const { userLocation, captainLocation } = useLocationTracking(
    user._id,
    "user",
  );

  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
      <LiveTracking
        userLocation={userLocation}
        captainLocation={captainLocation}
      />
    </div>
  );
};

export default RidingPageAdvanced;
