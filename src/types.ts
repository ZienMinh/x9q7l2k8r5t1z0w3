export type StoreItem = {
  icon: string;
  name: string;
  instruction: string;
  actions?: string;
  fileName: string;
  imgBackground?: string;
  categories: {
    name: string;
    menu: string[];
  }[];
};

export type DirectionItem = {
  icon: string;
  name: string;
  fileName: string;
  instruction: string;
};
