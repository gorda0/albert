import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";

import useWashStore from "@store/useWashStore";

import { WashStore } from "@models/wash";

const initialState: WashStore = {
  washes: [],
  errors: [],
};

const emptyTempMethod = {
  method: () => {
    return;
  },
};

const useStateWrapper = () => {
  const [tempMethod, setTempMethod] = useState(emptyTempMethod);

  const { setWashState, ...washState } = useWashStore(initialState);

  const updateTempMethod = (method: () => void) => setTempMethod({ method });
  const resetTempMethod = () => setTempMethod(emptyTempMethod);

  useEffect(() => {
    washState.fetchWashes();
    washState.listAvailableCalendar();
  }, []);

  return {
    ...washState,
    tempMethod,
    updateTempMethod,
    resetTempMethod,
  };
};

export const WashContext = createContext(initialState as ReturnType<typeof useStateWrapper>);

export const WashProvider: FC<PropsWithChildren> = ({ children }) => (
  <WashContext.Provider value={useStateWrapper()}>{children}</WashContext.Provider>
);
