import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
 import Message from './Message.jsx';
 import { useCities } from "../contexts/CitiesContexts.jsx";

 
function CityList() {
  const {cities, isLoading} = useCities()
  if (isLoading) return <Spinner />;
  if(!cities.length) return <Message message = "Add your first city by clicking a city on the map "/>
  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
