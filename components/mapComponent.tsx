"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { PiCornersOutLight } from "react-icons/pi";
import L from "leaflet";

const customMarkerIcon = L.icon({
  iconUrl: "/pin-car.svg",
  iconSize: [40, 65], 
  iconAnchor: [20, 65],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapComponent () {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        console.log('position', position)
      },
    });

    return position ? <Marker position={position} icon={customMarkerIcon}/> : null;
  };

  return (
    <MapContainer 
      center={[-34.603722, -58.381592]} // Buenos Aires como punto inicial
      zoom={14} 
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;