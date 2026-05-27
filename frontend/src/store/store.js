import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import communityReducer from "./slices/communitySlice";
import mutualFundReducer from "./slices/mutualFundSlice";
import searchReducer from "./slices/searchSlice";
import themeRedurcer from "./slices/themeSlice";

const mutualFundPersistConfig = {
  key: "mutualFund",
  version: 1,
  storage,
  whitelist: ["recentlyViewedFunds"],
};

const rootReducer = combineReducers({
  theme: themeRedurcer,
  search: searchReducer,
  mutualFund: persistReducer(mutualFundPersistConfig, mutualFundReducer),
  community: communityReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
