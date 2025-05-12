import styles from "./Home.module.scss";
const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Click in the nav link to see all countries !
      </h1>
    </div>
  );
};

export default HomePage;
