import React from "react";
import styles from "../styles.module.scss";
import SearchComponent from "./SearchComponent";
const HeaderComponent = ({ setSearch, search, setFilterList, data }) => {
  return (
    <>
      <div>
        <h1 style={{ fontWeight: "bold" }}>Liste de clients</h1>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <SearchComponent
            setSearch={setSearch}
            search={search}
            setFilterList={setFilterList}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
