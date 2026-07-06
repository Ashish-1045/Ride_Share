// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useRef,
//   useCallback,
// } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// // eslint-disable-next-line react-refresh/only-export-components
// export const useSocket = () => useContext(SocketContext);

// const SocketContextProvider = ({ children }) => {
//   const socketRef = useRef(null);
//   const [isConnected, setIsConnected] = useState(false); // ✅ reactive state
//   const socketUrl = import.meta.env.VITE_BASE_URL;

//   useEffect(() => {
//     const socket = io(socketUrl, {
//       transports: ["websocket"],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("Socket connected:", socket.id);
//       setIsConnected(true); // ✅ triggers re-render with correct state
//     });

//     socket.on("disconnect", () => {
//       console.log("Socket disconnected");
//       setIsConnected(false); // ✅ reflects real status
//     });

//     socket.on("connect_error", (error) => {
//       console.error("Socket connection error:", error);
//       setIsConnected(false);
//     });

//     return () => {
//       socket.disconnect();
//       socketRef.current = null;
//       setIsConnected(false);
//     };
//   }, [socketUrl]);

//   const sendMessageToEvent = useCallback((eventName, data) => {
//   console.log(
//     "📤 Event:",
//     eventName,
//     "| Connected:",
//     socketRef.current?.connected
//   );

//   if (!socketRef.current?.connected) {
//     return false; // warning hata do
//   }

//   socketRef.current.emit(eventName, data);
//   return true;
// },[]);

//  const receiveMessageFromEvent = useCallback((eventName, callback) => {
//    const socket = socketRef.current;

//    if (!socket) return () => {};

//    socket.on(eventName, callback);

//    return () => {
//      socket.off(eventName, callback);
//    };
//  }, []);

//   const value = {
//     socket: socketRef,
//     isConnected, // ✅ now actually reactive
//     sendMessageToEvent,
//     receiveMessageFromEvent,
//   };

//   return (
//     <SocketContext.Provider value={value}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketContextProvider;

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);

const SocketContextProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const socketUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    console.log("Socket URL:", socketUrl);

    const socket = io(socketUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket Connected:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.log("🚫 Socket Error:", err.message);
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [socketUrl]);

  // ==========================
  // EMIT EVENT
  // ==========================
  const sendMessageToEvent = useCallback((eventName, data) => {
    const socket = socketRef.current;

    if (!socket || !socket.connected) {
      console.log("Socket not connected");
      return false;
    }

    socket.emit(eventName, data);
    return true;
  }, []);

  // ==========================
  // RECEIVE EVENT
  // ==========================
  const receiveMessageFromEvent = useCallback((eventName, callback) => {
    const socket = socketRef.current;

    if (!socket) return () => {};

    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  }, []);

  const value = {
    isConnected,
    sendMessageToEvent,
    receiveMessageFromEvent,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;