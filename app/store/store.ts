import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  configureStore,
  createListenerMiddleware,
  combineReducers,
  Reducer,
  AnyAction,
} from '@reduxjs/toolkit';
import { appointmentSlice } from './appointment/appointmentSlice';
import { userSlice } from './user/userSlice';
import { authSlice } from './auth/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from './syncStorage';

// Listener middleware con manejo de errores
const listenerMiddlewareInstance = createListenerMiddleware({
  onError: (error) => console.error('Middleware error:', error),
});

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'appointments'], // Específica qué reducers persistir
};

// Reducers combinados
const appReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  appointments: appointmentSlice.reducer,
});

// Root reducer con manejo de reinicio
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/reset') {
    // Limpia el almacenamiento persistente al hacer un reset
    storage.removeItem('persist:root');
    state = {} as RootState;
  }
  return appReducer(state, action);
};

// Reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración del store con serializableCheck modificado
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignorar acciones no serializables
        ignoredPaths: ['register', 'rehydrate'], // Ignorar estas rutas específicas
      },
    }).prepend(listenerMiddlewareInstance.middleware), // Agregar listenerMiddleware
});

// Configuración del persistor
const persistor = persistStore(store);

export { store, persistor };

// Tipos auxiliares para Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;