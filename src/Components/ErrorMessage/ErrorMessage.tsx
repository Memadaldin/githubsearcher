import React from "react";
import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  onClick: () => void;
}

const ErrorMessage = ({ onClick }: ErrorMessageProps): React.ReactElement => {
  return (
    <div className={styles["error-container"]}>
      <div className={styles["error-message"]}>
        <span>Oops!</span>
        Something went wrong.
        <button onClick={onClick} className={styles["retry-button"]}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
