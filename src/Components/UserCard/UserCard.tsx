import React from "react";
import { User } from "../../Interfaces/User";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  item: User;
  onClick?: () => void;
}

const UserCard = ({ item, onClick }: UserCardProps): React.ReactElement => {
  return (
    <div className={styles.container}>
      {/* <div className={styles["card-upper-decoration"]}></div> */}
      <div className={styles.header}>
        <img className={styles.avatar} src={item.avatar_url} />
        <span className={styles.title}>{item.login}</span>
      </div>
      <div className={styles.footer}>
        <button onClick={onClick}>View Profile</button>
      </div>
    </div>
  );
};

export default UserCard;
