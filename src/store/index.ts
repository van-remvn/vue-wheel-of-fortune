import { createStore, createLogger } from 'vuex'
// import { authModule } from './modules/auth/index' // Part 2
// import { Store } from './types' // Part 2
// import { RootState } from './types'
import VuexPersist from 'vuex-persist';
// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];
// Plug in session storage based persistence
const vuexLocalStorage = new VuexPersist({
key: 'vuex', // The key to store the state on in the storage provider.
storage: window.localStorage, // or window.sessionStorage or localForage
// Function that passes the state and returns the state with only the objects you want to store.
// reducer: state => state,
// Function that passes a mutation and lets you decide if it should update the state in localStorage.
// filter: mutation => (true)
})
plugins.push(vuexLocalStorage.plugin)
// Create a new store instance.
export const store = createStore<any>({
strict: process.env.NODE_ENV !== 'production',
plugins,
modules: {
// authModule, // Part 2
}
});
// Part 2
// export function useStore(): Store {
// return store as Store;
// }