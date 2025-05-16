"use client"

import React from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"

// Create a custom marker icon
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
})

// Component to handle map clicks and update marker position
function LocationMarker({ position, setPosition, onLocationSelect }) {
  const map = useMapEvents({
    click(e) {
      const newPosition = e.latlng
      setPosition(newPosition)
      if (onLocationSelect) {
        onLocationSelect(newPosition)
      }
      map.flyTo(newPosition, map.getZoom())
    },
  })

  return position === null ? null : <Marker position={position} icon={customIcon} />
}

interface MapComponentProps {
  onLocationSelect?: (location: { lat: number; lng: number }) => void
  initialPosition?: { lat: number; lng: number }
  height?: string
}

const MapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  initialPosition = { lat: -33.4489, lng: -70.6693 }, // Santiago, Chile default
  height = "400px",
}) => {
  const [position, setPosition] = React.useState<{ lat: number; lng: number } | null>(initialPosition)

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition)
    if (onLocationSelect) {
      onLocationSelect(newPosition)
    }
  }

  return (
    <div style={{ height, width: "100%", borderRadius: "0.5rem", overflow: "hidden" }}>
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <LocationMarker position={position} setPosition={handlePositionChange} onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  )
}

export default MapComponent
