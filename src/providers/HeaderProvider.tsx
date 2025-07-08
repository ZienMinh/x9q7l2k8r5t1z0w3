import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';
import Header from '../components/Header';

type ContextState = {
  canGoBack: boolean;
  title: string;
  hidden?: boolean;
};

type ContextValue = Dispatch<SetStateAction<ContextState>>;
const HeaderContext = createContext((() => {}) as ContextValue);

export const useHeaderContext = () => useContext(HeaderContext);

const HeaderContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [header, setHeader] = useState<ContextState>({
    canGoBack: false,
    title: '',
    hidden: false,
  });

  return (
    <HeaderContext.Provider value={setHeader}>
      <Header
        title={header.title}
        hidden={header.hidden}
        canGoBack={header.canGoBack}
      />
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContextProvider;
