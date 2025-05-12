import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Checkpoint : frontend</h1>
      <Link className={styles.link} to="countries">
        Countries
      </Link>
    </header>
  );
};

export default Header;
