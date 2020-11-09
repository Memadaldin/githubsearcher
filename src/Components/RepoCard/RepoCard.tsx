import React from "react";
import { Repo } from "../../Interfaces/Repo";
import styles from "./RepoCard.module.scss";

interface RepoCardProps {
  item: Repo;
  onClick?: () => void;
}

const RepoCard = ({ item, onClick }: RepoCardProps): React.ReactElement => (
  <div onClick={onClick} className={styles.container} data-testid="repo-card">
    <div className={styles.header}>
      <span className={styles.title}>{item.full_name}</span>
      <span className={styles.owner}>
        {" "}
        <i className="fa fa-book"></i>
        {item.owner.login}
      </span>
    </div>
    <div className={styles.footer}>
      <div className={styles["statistics-icon"]}>
        <i className={`${styles.star} fa fa-star`}></i>
        <span>{item.stargazers_count}</span>
      </div>
      <div className={styles["statistics-icon"]}>
        <i className={`${styles.language} fa fa-circle`}></i>
        <span>{item.language}</span>
      </div>
      <div className={styles["statistics-icon"]}>
        <i className={`${styles.watchers} fa fa-eye`}></i>
        <span>{item.watchers_count}</span>
      </div>
    </div>
    <div className={styles["updated-at"]}>
      <span>Updated on </span>
      <span>{new Date(item.updated_at).toLocaleDateString()}</span>
    </div>
  </div>
);

export default RepoCard;
