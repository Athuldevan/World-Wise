import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";

function CountriesList({ city, loading }) {
  if (loading) return <Spinner />;

  // if (!city.length)
  //   return <Message mesage="Add your city by clicking on the map !!!" />;
 const countries = city.reduce((arr, cityItem) => {
  if (!arr.map((el) => el.country).includes(cityItem.country)) {
    return [...arr, { country: cityItem.country }];
  }
 else  return arr;
}, []);

  return (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
