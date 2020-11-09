import React from "react";
import styles from "./SkeletonCard.module.scss";

const SkeletonCard = (): React.ReactElement => (
  <div className={styles["skeleton-card"]}></div>
);

export default SkeletonCard;
