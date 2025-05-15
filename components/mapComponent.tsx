"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { PiCornersOutLight } from "react-icons/pi";
import L from "leaflet";

const customMarkerIcon = L.icon({
  iconUrl: "/pin-car.svg",
  iconSize: [40, 55], 
  iconAnchor: [40, 55],
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
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      {/* <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" /> */}
      {/* <TileLayer url="https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png" /> */}

      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;