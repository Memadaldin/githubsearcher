import { Repo } from "./Repo";
import { User } from "./User";

export interface SearchState {
  items: Array<Repo | User>;
  isLoading: boolean;
  error: string | null;
  key: string;
}

export interface SearchPayload {
  items: Array<Repo | User>;
  key: string;
}

export interface CachPayload {
  key: string;
  searchResults: SearchPayload;
}
