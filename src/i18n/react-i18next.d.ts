// import the original type declarations
import 'react-i18next';
import { StoreItem } from '../types';
// import all namespaces (for the default language, only)
import en from './lang/en.json';

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'common';
    // custom resources type
    resources: typeof en & {
      shopping: {
        'navbar.title': string;
        stores: StoreItem[];
      };
      directions: {
        'label.navigate': string;
        'label.menu': string;
        'navbar.title': string;
        'places.group1': DirectionItem[];
        'places.group2': DirectionItem[];
      };
    };
  }
}
