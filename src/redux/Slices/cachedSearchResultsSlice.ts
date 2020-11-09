import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CachPayload } from "../../Interfaces/Searcher";

const cacheInitialState: any = {};

const cachedItems = createSlice({
  name: "cachedSearchItems",
  initialState: cacheInitialState,
  reducers: {
    updatedCachedItems(state, { payload }: PayloadAction<CachPayload>) {
      state[payload.key] = payload.searchResults;
    },
  },
});

export default cachedItems;
