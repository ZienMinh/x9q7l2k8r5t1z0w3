import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

type GlobalState = {
  languageLoaded: boolean;
  setLanguageLoaded: (languageLoaded: boolean) => void;
};

const GlobalContext = createContext<GlobalState>({} as GlobalState);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [languageLoaded, setLanguageLoaded] = useState(false);

  const contextValue = useMemo(
    () => ({
      languageLoaded,
      setLanguageLoaded,
    }),
    [languageLoaded, setLanguageLoaded],
  );
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;
