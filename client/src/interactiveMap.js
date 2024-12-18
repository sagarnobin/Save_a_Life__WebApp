import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents,  Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const InteractiveMap = ({ formData, setFormData }) => {
    const [position, setPosition] = useState({
        lat: formData.latitude, 
        lng: formData.longitude })

    // Update the marker's position when dragged
    const handleMarkerDrag = (event) => {
        const { lat, lng } = event.target.getLatLng();
        setPosition({ lat, lng });
        setFormData((prevData) => ({
            ...prevData,
            latitude: lat,
            longitude: lng,
        }));
    };

    return (
        <MapContainer
            center={[position.lat, position.lng]}
            zoom={15}
            style={{ height: "300px", width: "500px" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
                position={[position.lat, position.lng]}
                draggable={true}
                eventHandlers={{
                    dragend: handleMarkerDrag,
                }}
            >
            <Popup>
              Latitude: {position.lat}, Longitude:{position.lng}
            </Popup>
            </Marker>
         
        </MapContainer>
    );
};

export default InteractiveMap;
