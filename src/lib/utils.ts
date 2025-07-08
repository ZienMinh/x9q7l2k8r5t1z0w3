const FOLDER = '/sdcard';

export const getFSPath = (
  fileName: string,
  type?: 'videos' | 'images' | 'i18n',
) => {
  if (!fileName) {
    return `${FOLDER}/cruzr_launcher/assets/${type}`;
  }
  if (!type) {
    return `${FOLDER}/cruzr_launcher/${fileName}`;
  }
  return `${FOLDER}/cruzr_launcher/${type}/${fileName}`;
};

export const waitPromise = (ms: number) => {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
};
