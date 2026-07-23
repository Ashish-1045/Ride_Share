import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

const useLocationTracking = (userId, userType = "user") => {
  const [userLocation, setUserLocation] = useState(null);
  const [captainLocation, setCaptainLocation] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

  // Initialize Socket connection
  useEffect(() => {
    if (!userId) return;

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      query: { userId, userType },
    });

    // Connection events
    newSocket.on("connect", () => {
      console.log("🔗 Socket connected:", newSocket.id);
      setIsConnected(true);

      // Join room with user info
      newSocket.emit("join", { userId, userType });
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError(err.message);
    });

    // Location events
    newSocket.on("location-update", (data) => {
      if (data.userType === "user") {
        setUserLocation({ lat: data.latitude, lng: data.longitude });
      } else if (data.userType === "captain") {
        setCaptainLocation({ lat: data.latitude, lng: data.longitude });
      }
    });

    newSocket.on("captain-location", (data) => {
      setCaptainLocation({ lat: data.latitude, lng: data.longitude });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId, userType]);

  // Send location updates
  const sendLocation = useCallback(
    (latitude, longitude) => {
      if (socket && isConnected) {
        socket.emit("send-location", {
          userId,
          userType,
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
        });
      }
    },
    [socket, isConnected, userId, userType],
  );

  // Watch user's current position
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        sendLocation(latitude, longitude);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [sendLocation]);

  return {
    userLocation,
    captainLocation,
    socket,
    isConnected,
    error,
    sendLocation,
  };
};

export default useLocationTracking;
