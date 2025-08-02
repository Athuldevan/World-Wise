import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import Button from "../components/Button";
import { useEffect, useState } from "react";

import { useCities } from "../contexts/CitiesContexts";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [mapLat, mapLng] = useUrlPosition();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // ✅ Update mapPosition from URL
  useEffect(() => {
    if (
      mapLat !== null &&
      mapLng !== null &&
      !isNaN(mapLat) &&
      !isNaN(mapLng)
    ) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  // ✅ Update mapPosition from geolocation
  useEffect(() => {
    if (
      geolocationPosition?.lat !== undefined &&
      geolocationPosition?.lng !== undefined
    ) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities
          ?.filter(
            (city) =>
              city?.position?.lat !== undefined &&
              city?.position?.lng !== undefined
          )
          .map((city) => (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>

      <button
        onClick={() => {
          setSearchParams({ lat: 100, lng: 200 });
        }}
      >
        Change position
      </button>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
