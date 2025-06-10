import { useState, useEffect, useRef } from "react";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onCoordinatesChange?: (lat: number | null, lng: number | null) => void;
}

export function LocationInput({
  value,
  onChange,
  onCoordinatesChange,
}: LocationInputProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions from MapTiler
  useEffect(() => {
    if (value.length > 2) {
      const timer = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://api.maptiler.com/geocoding/${encodeURIComponent(value)}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`
          );
          const data = await response.json();
          setSuggestions(data.features || []);
        } catch (error) {
          console.error("Geocoding error:", error);
        }
      }, 300); // Debounce 300ms

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const getLocation = async () => {
    setIsGettingLocation(true);
    setLocationError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            (error) => {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  reject(
                    new Error(
                      "Please allow location access in your browser settings"
                    )
                  );
                  break;
                case error.POSITION_UNAVAILABLE:
                  reject(new Error("Location information is unavailable"));
                  break;
                case error.TIMEOUT:
                  reject(new Error("Location request timed out"));
                  break;
                default:
                  reject(new Error("An unknown error occurred"));
              }
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
        }
      );

      const { latitude, longitude } = position.coords;
      onCoordinatesChange?.(latitude, longitude);
      onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    } catch (error) {
      console.error("Location error:", error);
      setLocationError(
        error instanceof Error ? error.message : "Unable to get your location"
      );
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSelectSuggestion = (suggestion: any) => {
    onChange(suggestion.place_name);
    if (suggestion.center && onCoordinatesChange) {
      onCoordinatesChange(suggestion.center[1], suggestion.center[0]);
    }
    setShowSuggestions(false);
    inputRef.current?.focus();
  };
// ...existing code...
  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Enter location or use pin"
          className="w-full rounded-xl bg-white border border-gray-200 pl-4 pr-12 py-3.5
                   text-gray-900 transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="px-4 py-2 hover:bg-sky-50 cursor-pointer text-gray-900"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={getLocation}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5
                   rounded-lg bg-sky-500/10 text-sky-500 
                   hover:bg-sky-500/20 transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isGettingLocation}
          title="Get current location"
        >
          {isGettingLocation ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>
      </div>
      {locationError && (
        <p className="text-sm text-red-500 flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {locationError}
        </p>
      )}
    </div>
  );
// ...existing code...
}