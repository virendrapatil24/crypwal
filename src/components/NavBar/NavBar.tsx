import styles from "./Navbar.module.css";

const NavBar = () => {
  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_box}>
        <div className={styles.nav}>
          <span id={styles.app_name}>CrypWal</span>
          <span>create wallet</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
