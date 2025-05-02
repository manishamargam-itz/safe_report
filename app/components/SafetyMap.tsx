// src/components/SafetyMap.tsx
'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';

export function SafetyMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly'
      });

      const { Map } = await loader.importLibrary('maps');
      const { Marker } = await loader.importLibrary('marker');

      // Default location or use geolocation API
      const position = {
        lat: 40.7128,
        lng: -74.0060
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 14,
        mapId: 'SAFETY_MAP',
        disableDefaultUI: true,
        styles: [
          // Custom map styling
        ]
      };

      const map = new Map(mapRef.current!, mapOptions);

      // Add markers for police stations, hospitals, etc.
      new Marker({
        position,
        map,
        title: 'Local Police Station'
      });
    };

    initMap();
  }, []);

  return (
    <div className="h-[400px] rounded-2xl overflow-hidden border border-gray-800">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}