import { getModule } from '../utils/getModule';

const PowerMagager = getModule('PowerMagager');

export const shutdown = (): Promise<void> => {
  return PowerMagager.shutdown();
};
