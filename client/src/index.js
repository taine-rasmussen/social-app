import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './State';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
    persistReducer,
    persistStore,
    REHYDRATE,
    REGISTER,
    PERSIST,
    FLUSH,
    PAUSE,
    PURGE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// https://www.npmjs.com/package/redux-persist/v/5.5.0

const persistConfig = {  key: "root", storage, version: 1};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [REHYDRATE, REGISTER, PERSIST, FLUSH, PAUSE, PURGE]
        }
      })
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
