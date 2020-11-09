import React from "react";
import styles from "./EmptyMessage.module.scss";
import notFoundLogo from "../../images/notfound.png";

const EmptyMessage = (): React.ReactElement => {
  return (
    <div className={styles["message-container"]}>
      <div className={styles["empty-message"]}>
        <img src={notFoundLogo} alt="not-found" />
        <span>No results found, maybe something else.</span>
      </div>
    </div>
  );
};

export default EmptyMessage;
