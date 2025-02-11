// src/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import formReducer from './formSlice';
// import { PersistGate } from 'redux-persist/integration/react';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedFormReducer = persistReducer(persistConfig, formReducer);

// const store = configureStore({
//   reducer: {
//     form: persistedFormReducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// const persistor = persistStore(store);

// export { store, persistor };
  
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
