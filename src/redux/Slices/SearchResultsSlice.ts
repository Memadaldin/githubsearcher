import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { getSearchResults } from "../../api/githubAPI";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { SearchState, SearchPayload } from "../../Interfaces/Searcher";
import cachedItemsSlice from "./cachedSearchResultsSlice";

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

function startLoading(state: SearchState) {
  state.isLoading = true;
}

function loadingFailed(state: SearchState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.items = [];
  state.error = action.payload;
}
//slice for items got by axios request
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

export const {
  getSearchResultStart,
  setSearchResult,
  getSearchResultFailure,
  resetSearchResults,
} = items.actions;

const { updatedCachedItems } = cachedItemsSlice.actions;

//here is where we handle our request, caching and error handling
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

//it's not accoustomed while using redux-persist to persist a specific reducer and not the root
//but in our case we only need to persist the cachedItemsReducer
//whitch begs the question if we needed the data from server in redux anyway.
const searchSlices = {
  searchResults: items.reducer,
  cachedSearchResults: persistReducer(persistConfig, cachedItemsSlice.reducer),
};

export default searchSlices;
