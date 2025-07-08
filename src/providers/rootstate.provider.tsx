import React, {
  useContext,
  useReducer,
  Dispatch,
  ReducerAction,
  ReducerState,
} from 'react';

const Action = {
  UPDATE_USER: 'update-user',
  UPDATE_TOKEN: 'update-token',
  UPDATE_ALL: 'update-all',
};

export type IRootState = {
  userInfor?: {
    userId: string;
    fullName: string;
    email: string;
    numberPhone: string;
    avatar: string;
  } | null;
  accessToken?: string | null;
};

type IAction = {
  type: string;
  payload: IRootState;
};

const RootStateValue: IRootState = {
  userInfor: null,
  accessToken: null,
};

const customReducer = (state: any, action: IAction): IRootState => {
  switch (action.type) {
    case Action.UPDATE_USER:
      return {
        ...state,
        userInfor: action.payload.userInfor,
      };

    case Action.UPDATE_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };

    case Action.UPDATE_ALL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      throw Error();
  }
};

const RootStateContext = React.createContext<
  [
    ReducerState<typeof customReducer>,
    Dispatch<ReducerAction<typeof customReducer>>,
  ]
>([RootStateValue, () => null]);

const RootStateProvider = (props: any) => {
  const reducer = useReducer(customReducer, RootStateValue);
  return (
    <RootStateContext.Provider value={reducer}>
      {props.children}
    </RootStateContext.Provider>
  );
};

export const useRootState = () => {
  return useContext(RootStateContext);
};

export default RootStateProvider;
