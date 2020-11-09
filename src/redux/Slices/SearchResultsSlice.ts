import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { getSearchResults } from "../../api/githubAPI";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {
  SearchState,
  SearchPayload,
  CachPayload,
} from "../../Interfaces/Searcher";

const persistConfig = {
  key: "cache",
  storage,
};

const seachInitialState: SearchState = {
  items: [],
  key: "",
  isLoading: false,
  error: null,
};

const cacheInitialState: any = {};

function startLoading(state: SearchState) {
  state.isLoading = true;
}

function loadingFailed(state: SearchState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.items = [];
  state.error = action.payload;
}

const items = createSlice({
  name: "searchItems",
  initialState: seachInitialState,
  reducers: {
    getSearchResultStart: startLoading,
    setSearchResult(state, { payload }: PayloadAction<SearchPayload>) {
      state.isLoading = false;
      state.error = null;
      state.items = payload.items;
    },
    getSearchResultFailure: loadingFailed,

    resetSearchResults(state) {
      state.isLoading = false;
      state.error = null;
      state.items = [];
    },
  },
});

const cachedItems = createSlice({
  name: "cachedSearchItems",
  initialState: cacheInitialState,
  reducers: {
    updatedCachedItems(state, { payload }: PayloadAction<CachPayload>) {
      state[payload.key] = payload.searchResults;
    },
  },
});

export const {
  getSearchResultStart,
  setSearchResult,
  getSearchResultFailure,
  resetSearchResults,
} = items.actions;

const { updatedCachedItems } = cachedItems.actions;

export const fetchSearchResults = (
  searchTerm: string,
  searchTarget: string
): AppThunk => async (dispatch) => {
  try {
    const searchResults = await getSearchResults(searchTerm, searchTarget);
    dispatch(setSearchResult(searchResults));
    dispatch(
      updatedCachedItems({
        key: `${searchTarget}-${searchTerm}`,
        searchResults,
      })
    );
  } catch (err) {
    dispatch(getSearchResultFailure(err.toString()));
  }
};

const searchSlices = {
  searchResults: items.reducer,
  cachedSearchResults: persistReducer(persistConfig, cachedItems.reducer),
};

export default searchSlices;
