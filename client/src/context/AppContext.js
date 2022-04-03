import { createContext } from 'react';

const AppContext = createContext({
    user: null,
    setUser: () => {},
    logout: () => {},
    nightMode: false,
    toggleNightMode: () => {},
});

export default AppContext;