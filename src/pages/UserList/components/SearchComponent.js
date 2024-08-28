import React from "react";
import styles from "../styles.module.scss";
const SearchComponent = ({ setSearch, search, setFilterList, data }) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Chercher"
        value={search}
        className={styles.input}
        onInput={(e) => setSearch(e.target.value)}
        onChange={(e) =>
          setFilterList(
            data.filter((user) => {
              const fullName =
                (user?.name || "") + " " + (user?.lastName || "");
              return fullName
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            })
          )
        }
      />
    </div>
  );
};

export default SearchComponent;
