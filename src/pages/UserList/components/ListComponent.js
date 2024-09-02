import React, { useState } from "react";
import styles from "../styles.module.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ListComponent = ({ data, toast }) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState(false);
  const toggle = () => setModal(!modal);

  const deleteUserDataAsync = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
      });
      alert("User has been deleted");
      window.location.reload();
      console.log(response.json());
    } catch (error) {
      alert("Error");
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>Sure do you wanna delete this Account ?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => deleteUserDataAsync(email)}>
            Delete Account
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

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

                <span className={styles.idText}>{item.email}</span>
                <span className={styles.idText}>Rol-{item.type}</span>
                <span className={styles.idText}>
                  Pais-{item.country ?? "-"}
                </span>

                <div style={{ width: "100%" }}>
                  <Button
                    onClick={() => {
                      toggle();
                      setEmail(item.email);
                    }}
                    className={styles.bottom}
                  >
                    delete user
                  </Button>
                </div>
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
