import React, { createContext, useState, useEffect, useContext } from "react";
import DragSelect from "dragselect";

type ProviderProps = {
  children: React.ReactNode;
  settings?: ConstructorParameters<typeof DragSelect>[0];
};

const Context = createContext<DragSelect<any> | undefined>(undefined);

function DragSelectProvider({ children, settings = {} }: ProviderProps) {
  const [ds, setDS] = useState<DragSelect<any>>();

  useEffect(() => {
    setDS((prevState) => {
      if (prevState) return prevState;
      return new DragSelect({});
    });
    return () => {
      if (ds?.stop) {
        // ds?.stop();
        setDS(undefined);
      }
    };
  }, [ds]);

  useEffect(() => {
    if (ds?.setSettings && settings) {
      // ds?.setSettings(settings);
    }
  }, [ds, settings]);

  return <Context.Provider value={ds}>{children}</Context.Provider>;
}

function useDragSelect() {
  return useContext(Context);
}

export { DragSelectProvider, useDragSelect };
