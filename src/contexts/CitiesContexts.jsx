import axios from "axios";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const CitiesContext = createContext();
const BASE_URL = "http://localhost:3000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        const { data } = await axios.get(`${BASE_URL}/cities`);
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      const { data } = await axios.get(`${BASE_URL}/cities/${id}`);
      setCurrentCity(data);
    } catch (error) {
      throw new Error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      const { data } = await axios.post(`${BASE_URL}/cities`, newCity);
      setCities((cities) => [...cities, data]);
    } catch (error) {
      throw new Error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/cities/${id}`);
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  console.log(context);
  return context;
}

export { CitiesProvider, useCities };
