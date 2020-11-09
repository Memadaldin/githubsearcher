import axios from "axios";
import { SearchPayload } from "../Interfaces/Searcher";
type SearchTerm = string;
type SearchTarget = string;
export const getSearchResults = (
  term: SearchTerm,
  target: SearchTarget
): Promise<SearchPayload> =>
  axios
    .get(`https://api.github.com/search/${target}?q=${term}`)
    .then(({ data }) => data);
