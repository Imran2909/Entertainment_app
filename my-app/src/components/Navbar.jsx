import React from "react";
import { LuSearch } from "react-icons/lu";
import styles from "./navbar.module.css";

function Navbar(props) {
  const handleInputChange = (event) => {
    props.onSearchChange(event.target.value);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.search}>
          <LuSearch />
        </div>
        <div className={styles.input}>
          <input
            type="text"
            placeholder={`Search for ${props.text}`}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
