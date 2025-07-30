import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message"
import CityItem from "./CityItem";

function CityList({ city, loading }) {
  if (loading) return <Spinner />;

  if (!city.length) return <Message mesage = 'Add your city by clicking on the map !!!'/>;
  return (
    <ul className={styles.cityList}>
      {city.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
