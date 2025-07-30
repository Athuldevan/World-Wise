import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import City from "./components/City";
import CityList from "./components/CityList";
import CountriesList from "./components/CountryList";
import Form from "./components/Form";

const URL = " http://localhost:3000";
function App() {
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch th e city data
  useEffect(() => {
    async function fetchCity() {
      try {
        setLoading(true);
        const data = await axios.get(`${URL}/cities`);
        setCity(data.data);
        console.log({ city });
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCity();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate />} />
          <Route
            path="cities"
            element={<CityList city={city} loading={loading} />}
          />

          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountriesList city={city} loading={loading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
