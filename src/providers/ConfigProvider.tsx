import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getFSPath } from '../lib/utils';
import { readFile, exists } from 'react-native-fs';
import defaultConfig from '../config/defaultConfig.json';

type ConfigState = {
  config: {
    motion: {
      Opening?: string;
      right?: string;
    };
  } | null;
  isLoaded: boolean;
  isLoading: boolean;
  error: Error | null;
};

const ConfigContext = createContext<ConfigState>({} as ConfigState);

const useConfigContext = () => {
  return useContext(ConfigContext);
};

const ConfigProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<ConfigState['config'] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadConfig = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const filePath = getFSPath('config.json');
    try {
      let _config;
      if (await exists(filePath)) {
        const data = await readFile(filePath, 'utf8');
        _config = JSON.parse(data);
        console.log('Loaded config from external', _config);
      } else {
        console.warn(`Config file not found at ${filePath}, using default config`);
        _config = defaultConfig;
      }
      setConfig(_config);
      setIsLoaded(true);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const contextValue = useMemo(() => {
    return {
      config,
      isLoaded,
      isLoading,
      error,
    };
  }, [config, isLoaded, isLoading, error]);

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigProvider, useConfigContext };
