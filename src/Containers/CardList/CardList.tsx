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

//here we handle the rendering of eather a list of card or a list of skeleton loaders

const CardList = ({
  isLoading,
  items,
  searchTarget,
}: CardListProps): React.ReactElement => {
  return (
    <div className={styles["list-container"]} data-testid="card-list">
      {isLoading
        ? Array.from(Array(12)).map((_, index) => <SkeletonCard key={index} />)
        : items.map((item) =>
            searchTarget === "users" ? (
              <UserCard
                key={item.id}
                item={item as User}
                onClick={() => navigate(item.html_url, "_blank")}
              />
            ) : (
              <RepoCard
                key={item.id}
                item={item as Repo}
                onClick={() => navigate(item.html_url, "_blank")}
              />
            )
          )}
    </div>
  );
};

export default CardList;
