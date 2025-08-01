import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [SearchParams, setSearchParams] = useSearchParams();
  const lat = SearchParams.get("lat");
  const lng = SearchParams.get("lng");
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("form")} className={styles.mapContainer}>
      <h2>Map</h2>;<p>lat: {lat}</p>
      <p>lng : {lng} </p>
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

export default Map;
