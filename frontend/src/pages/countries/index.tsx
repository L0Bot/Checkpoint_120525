import { gql, useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../../api/countries";
import Loader from "../../components/Loader/Loader";
import CountryCard from "../../components/CountryCard/CountryCard";
import { Country } from "../../types/country";
import styles from "./Countries.module.scss";
import AddCountryForm from "../../components/AddCountryForm/AddCountryForm";

const CountriesPage = () => {
  const { data, loading, error } = useQuery(gql(GET_COUNTRIES));

  if (loading) return <Loader />;
  if (error) return <p>Error loading countries</p>;
  console.log(data);
  return (
    <div>
      <AddCountryForm />
      <div className={styles.grid}>
        {data.countries.map((country: Country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountriesPage;
