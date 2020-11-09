import React, { useEffect, useReducer } from "react";
import TextField from "../../Components/FormElements/TextField/TextField";
import Select from "../../Components/FormElements/Select/Select";
import styles from "./GitHubSearcher.module.scss";
import { useSelector, useDispatch } from "react-redux";
import gitHubLogo from "../../images/GitHub-Mark-64px.png";
import debounce from "lodash/debounce";
import {
  fetchSearchResults,
  resetSearchResults,
  getSearchResultStart,
  setSearchResult,
} from "../../redux/Slices/SearchResultsSlice";
import { RootState } from "../../redux/rootReducer";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import EmptyMessage from "../../Components/EmptyMessage/EmptyMessage";
import { useRetryVariable } from "../../utils/custom-hooks";
import CardList from "../CardList/CardList";

const GitHubSearcher = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.searchResults
  );
  const cachedResults = useSelector(
    (state: RootState) => state.cachedSearchResults
  );

  const [{ searchTerm, searchTarget }, setValues] = useReducer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (base: any, point: any) => ({ ...base, ...point }),
    {
      searchTerm: "",
      searchTarget: "repositories",
    }
  );
  const [retryCounter, forceRetry] = useRetryVariable();

  useEffect(() => {
    const debouncedFetch = debounce(
      () => dispatch(fetchSearchResults(searchTerm, searchTarget)),
      3000
    );
    const currentCachedResult = cachedResults[`${searchTarget}-${searchTerm}`];
    if (searchTerm.length < 3) {
      dispatch(resetSearchResults());
    } else if (currentCachedResult) {
      dispatch(setSearchResult(currentCachedResult));
    } else {
      dispatch(getSearchResultStart());
      debouncedFetch();
    }
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm, searchTarget, dispatch, cachedResults, retryCounter]);

  return (
    <div className={styles.container}>
      <div className={styles["searcher-container"]}>
        <div className={styles["searcher-header"]}>
          <img src={gitHubLogo} alt="github-icon" />
          <div className={styles["searcher-title"]}>
            <h3>GitHub Searcher</h3>
            <span>Search users or repositories below</span>
          </div>
        </div>
        <form className={styles["form-container"]}>
          <TextField
            value={searchTerm}
            placeholder="Start trying to search .."
            onChange={(e) => {
              setValues({ searchTerm: e.target.value });
            }}
          />
          <Select
            value={searchTarget}
            onChange={(e) => {
              dispatch(resetSearchResults());
              setValues({ searchTarget: e.target.value });
            }}
          />
        </form>
      </div>

      <CardList
        data-testid="card-list"
        isLoading={isLoading}
        items={items}
        searchTarget={searchTarget}
      />
      {searchTerm.length > 2 && !items.length && !isLoading ? (
        <EmptyMessage />
      ) : null}
      {error ? <ErrorMessage onClick={forceRetry} /> : null}
    </div>
  );
};

export default GitHubSearcher;
