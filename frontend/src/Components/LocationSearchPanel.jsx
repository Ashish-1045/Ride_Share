import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = ({
  
  suggestions = [],
  isLoading,
  onSelectLocation,
  setPanelOpen,
}) => {
  return (

    <div className="w-full h-screen bg-white rounded-t-3xl px-4 space-y-3 pb-4 overflow-y-auto ">
      {isLoading ? (
        <div className="py-3 text-sm text-gray-500">Loading suggestions...</div>
      ) : suggestions.length > 0 ? (
        suggestions.map((location, idx) => (
          <div
            key={idx}
            onClick={() => {
              onSelectLocation(location.fullAddress || location.displayName);

              setPanelOpen(true);
            }}
            className="py-3 bg-zinc-100 border-2 border-gray-300 hover:border-black flex gap-4 rounded-lg items-center px-4 cursor-pointer"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300">
              <i className="ri-map-pin-fill text-lg"></i>
            </div>

            <div>
              <h3 className="font-semibold">{location.displayName}</h3>

              <p className="text-sm text-gray-500">
                {location.fullAddress || location.displayName}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="py-3 text-sm text-gray-500">
          Type a location to see suggestions
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
