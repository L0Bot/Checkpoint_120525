import { useParams } from "react-router-dom";
import { Country } from "../../types/country";
import styles from "./CountryDetail.module.scss";
import { gql, useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../../api/countries";
import Loader from "../../components/Loader/Loader";

const CountryDetailPage = () => {
  const { code } = useParams<{ code: string }>();
  const { data, loading, error } = useQuery(gql(GET_COUNTRY), {
    variables: { code },
  });

  if (loading) return <Loader />;
  if (error) return <p>Erreur lors du chargement du pays.</p>;

  const country: Country = data.country;
  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.title}>
        <span>{country.name}</span>
        <span>{country.emoji}</span>
      </h1>
      <p className={styles.info}>
        <strong>Code : </strong>
        {country.code}
      </p>
      <p className={styles.info}>
        <strong>Continent : </strong>
        {country.continent?.name || "Non renseigné"}
      </p>
    </div>
  );
};

export default CountryDetailPage;
