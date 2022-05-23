import React, { ReactNode, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { IPAddressInterface } from "./Header";

interface MapProps {
  children?: ReactNode;
  ipAddress?: IPAddressInterface;
}

// CHANGE TO PROCESS.ENV BEFORE BUILD
const mapbox_key = process.env.REACT_APP_MAPBOX_KEY;

const Map: React.FC<MapProps> = ({ children, ipAddress }) => {
  const [latitude, setLatitude] = useState<number>(51.505);
  const [longitude, setLongitude] = useState<number>(-0.09);
  const location = `${ipAddress?.city}, ${ipAddress?.countryCode} ${ipAddress?.zip}`;

  useEffect(() => {
    if (ipAddress) {
      setLatitude(ipAddress?.lat);
      setLongitude(ipAddress?.lon);
    }
  }, [ipAddress]);

  function ChangeView() {
    const map = useMap();
    map.setView([latitude, longitude]);
    return null;
  }

  return (
    <>
      <MapContainer center={[latitude, longitude]} zoom={10}>
        <ChangeView></ChangeView>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapbox_key}`}
          tileSize={512}
          zoomOffset={-1}
        />
        {ipAddress ? (
          <Marker position={[latitude, longitude]}>
            <Popup>
              <div className="flex flex-col items-center">
                <h4 className="font-bold">{ipAddress.query}</h4>
                <h4>{location}</h4>
              </div>
            </Popup>
          </Marker>
        ) : (
          ""
        )}
      </MapContainer>
    </>
  );
};

export default Map;
