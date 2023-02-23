import { STORE } from "../constants/key";

export const localStorageGetReduxState = () => {
    const serializedState = localStorage.getItem(STORE);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
};
export const localStorageSaveReduxState = (state) => {
    const serializedState = JSON.stringify(state);
    return localStorage.setItem(STORE, serializedState);
};