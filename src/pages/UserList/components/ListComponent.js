import React from "react";
import styles from "../styles.module.scss";

const ListComponent = ({ data }) => {
  return (
    <>
      <div style={{ paddingTop: 20 }} className={styles.ListContainer}>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <div className={styles.listContainer}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className={styles.textContainer}>
                    <span
                      style={{ paddingRight: 5 }}
                      className={styles.nameText}
                    >
                      {item.name ?? "-"}
                    </span>
                    <span className={styles.nameText}>
                      {item.lastName ?? "-"}{" "}
                    </span>
                  </div>
                </div>

                <span className={styles.idText}>Rol-{item.email}</span>
                <span className={styles.idText}>Rol-{item.type}</span>
                <span className={styles.idText}>
                  Pais-{item.country ?? "-"}
                </span>
              </div>

              {data.length !== index + 1 && (
                <div style={{ paddingBlock: 10 }}>
                  <div className={styles.line} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListComponent;
