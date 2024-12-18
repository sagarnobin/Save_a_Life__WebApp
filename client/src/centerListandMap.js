import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import L from "leaflet";




delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const CenterListandMap = ({results})=>{

return(
   
    <div className="contianerList">
         <div className="containerList1">
             <h2>List of nearby donation centers</h2>
             <h3 className="p11"> Found {results.length} donation centers nearby</h3>
                <table className="centerList">
                     <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Name</th>
                            <th>Contact No</th>
                        </tr>
                     </thead>
                    <tbody id="table-body">
                        {results.length > 0 ? (
                            results.map((result, index) => (
                                 <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{result.name}</td>
                                    <td>{result.contactNo}</td>
                                </tr>
                            ))
                         ) : (
                                <tr>
                                     <td colSpan="3">No results found</td>
                                </tr>
                         )}
                    </tbody>
                </table>
        </div>
        <div className="containerList2">
            <div className="mapContainer">
            <MapContainer
                center={[
                    results.length > 0 ? results[0].latitude : 0,
                    results.length > 0 ? results[0].longitude : 0
                         ]}// Center on the first location
                zoom={14}
                style={{ height: "350px", width: "450px" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             />

            {results.map((location, index) => (
            <Marker
                key={index}
                position={[location.latitude, location.longitude]}
            >
                <Popup>{location.name}</Popup>
            </Marker>
            ))}
            </MapContainer>
         </div>
         <h5>Map of Nearby Donation Centers</h5>

        </div>
    </div>
);
};
export default CenterListandMap;