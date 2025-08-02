import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}
export const CitiesContext = createContext();
const BASE_URL = "http://localhost:3000";

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/cities`);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "OOps! Failed to fetch the cities!",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      const { data } = await axios.get(`${BASE_URL}/cities/${id}`);
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "OOps! Failed to fetch the cities!",
      });
    }
  }

  async function createCity(newCity) {
    try {
      const { data } = await axios.post(`${BASE_URL}/cities`, newCity);
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "OOps! Failed to fetch the cities!",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/cities/${id}`);
      const filteredCity = cities?.filter((city) => city.id !== id);
      dispatch({ type: "cities/deleted", payload: filteredCity });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "OOps! Failed to fetch the cities!",
      });
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
