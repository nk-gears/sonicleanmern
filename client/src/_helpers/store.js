import { compose, createStore,applyMiddleware } from 'redux';
import { cacheEnhancer } from 'redux-cache';
import rootReducer from 'modules';
import thunk from 'redux-thunk'
import apiMiddleware from 'middleware/api'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {parse, stringify} from 'flatted/esm';


export default function configureStore(preloadedState) {

  const middlewares = [
    thunk,
    apiMiddleware
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  const composeEnhancers =
    (
      process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ) ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
      compose

    const transformCircular = createTransform(
        (inboundState, key) => stringify(inboundState),
        (outboundState, key) => parse(outboundState),
    )
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: [],
    transforms: [transformCircular]
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(
    persistedReducer,
    composeEnhancers(...enhancers)
  )

  let persistor = persistStore(store)

  return { store, persistor };
}

export const { store, persistor } = configureStore();
