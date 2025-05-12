import { Link } from "react-router-dom";
import { Country } from "../../types/country";
import styles from "./CountryCard.module.scss";

type CountryCardPropsType = {
  country: Country;
};

const CountryCard = ({ country }: CountryCardPropsType) => {
  return (
    <Link className={styles.link} to={`/countries/${country.code}`}>
      <div className={styles.card}>
        <span className={styles.flag}>{country.emoji}</span>
        <h2 className={styles.name}>{country.name}</h2>
      </div>
    </Link>
  );
};

export default CountryCard;
