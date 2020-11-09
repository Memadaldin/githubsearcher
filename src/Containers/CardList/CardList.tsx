import React from "react";
import RepoCard from "../../Components/RepoCard/RepoCard";
import SkeletonCard from "../../Components/Skeleton/SkeletonCard";
import UserCard from "../../Components/UserCard/UserCard";
import { Repo } from "../../Interfaces/Repo";
import { User } from "../../Interfaces/User";
import { navigate } from "../../utils/helpers";
import styles from "./CardList.module.scss";

interface CardListProps {
  isLoading: boolean;
  items: Array<Repo | User>;
  searchTarget: string;
}

const CardList = ({
  isLoading,
  items,
  searchTarget,
}: CardListProps): React.ReactElement => {
  return (
    <div className={styles["list-container"]} data-testid="card-list">
      {isLoading
        ? Array.from(Array(12)).map(() => <SkeletonCard />)
        : items.map((item) =>
            searchTarget === "users" ? (
              <UserCard
                key={(item as User).id}
                item={item as User}
                onClick={() => navigate(item.html_url, "_blank")}
              />
            ) : (
              <RepoCard
                key={(item as Repo).id}
                item={item as Repo}
                onClick={() => navigate(item.html_url, "_blank")}
              />
            )
          )}
    </div>
  );
};

export default CardList;
