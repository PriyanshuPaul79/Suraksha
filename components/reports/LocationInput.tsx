import { useState, useEffect } from "react";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onCoordinatesChange?: (lat: number | null, lng: number | null) => void;
}

export default function LocationInput({ value, onChange, onCoordinatesChange }: LocationInputProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 3) {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const getLocation = async () => {
    setIsGettingLocation(true);
    setLocationError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          onCoordinatesChange?.(latitude, longitude);

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          onChange?.(data.display_name);
          setSelectedLocation(data.display_name);
          setIsGettingLocation(false);
        },
        (error) => {
          setLocationError(error.message);
          setIsGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } catch (error) {
      setLocationError(error instanceof Error ? error.message : "Unknown error");
      setIsGettingLocation(false);
    }
  };

  const fetchSuggestions = async (query: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await response.json();
    setSuggestions(data);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-400">Location</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange?.(e.target.value);
            setSearchQuery(e.target.value);
          }}
          placeholder="Enter location or use pin"
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 pl-4 pr-12 py-3.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        />
        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-zinc-900 rounded-xl border border-zinc-800 text-white overflow-hidden">
            {suggestions.map((item) => (
              <li
                key={item.place_id}
                onClick={() => {
                  onChange?.(item.display_name);
                  onCoordinatesChange?.(parseFloat(item.lat), parseFloat(item.lon));
                  setSelectedLocation(item.display_name);
                  setSuggestions([]);
                }}
                className="p-2 hover:bg-zinc-800 cursor-pointer"
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={getLocation}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isGettingLocation}
          title="Get current location"
        >
          {isGettingLocation ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
      {selectedLocation && (
        <p className="text-sm text-green-400 mt-2">Selected Location: {selectedLocation}</p>
      )}
      {locationError && (
        <p className="text-sm text-red-400 flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {locationError}
        </p>
      )}
    </div>
  );
}