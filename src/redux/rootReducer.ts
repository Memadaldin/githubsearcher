import { combineReducers } from "@reduxjs/toolkit";
import SearchResultsSlices from "./Slices/SearchResultsSlice";
const rootReducer = combineReducers(SearchResultsSlices);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
