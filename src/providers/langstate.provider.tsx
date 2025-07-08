import React, {
  useContext,
  useReducer,
  Dispatch,
  ReducerAction,
  ReducerState,
  PropsWithChildren,
} from 'react';

export const Action = {
  UPDATE_LANG: 'UPDATE_LANG',
};

export type LangDTO = {
  home: {
    map: string;
    airport: string;
    airline: string;
    shop: string;
    food: string;
    trans: string;
    hotel: string;
    duty_fee: string;
    gift: string;
    massage: string;
  };
};

export type ILangState = {
  key: string | null;
  name: string | null;
  lang: LangDTO;
};

type IAction = {
  type: string;
  payload: ILangState;
};

const defaultLang: LangDTO = {
  home: {
    map: 'Map',
    airport: '',
    airline: '',
    shop: '',
    food: '',
    trans: '',
    hotel: '',
    duty_fee: '',
    gift: '',
    massage: '',
  },
};
const LangStateValue: ILangState = {
  key: null,
  name: null,
  lang: defaultLang,
};

const customReducer = (state: ILangState, action: IAction): ILangState => {
  switch (action.type) {
    case Action.UPDATE_LANG:
      return {
        ...state,
        ...action.payload,
      };

    default:
      throw Error();
  }
};

const LangStateContext = React.createContext<
  [
    ReducerState<typeof customReducer>,
    Dispatch<ReducerAction<typeof customReducer>>,
  ]
>([LangStateValue, () => null]);

const LangStateProvider: React.FC<PropsWithChildren> = props => {
  const reducer = useReducer(customReducer, LangStateValue);
  return (
    <LangStateContext.Provider value={reducer}>
      {props.children}
    </LangStateContext.Provider>
  );
};

export const useLangState = () => {
  return useContext(LangStateContext);
};

export default LangStateProvider;
