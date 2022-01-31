---
title: "Context Starter"
date: "2020-01-31"
tags:
  - react
  - typescript
---

```typescript
import React, { createContext, useContext, useState } from "react";

interface Context {
  state: ContextState;
  setState: React.Dispatch<React.SetStateAction<ContextState>>;
}

interface ContextState {
  place: string;
}

const MapContext = createContext<Context | null>(null);

interface ProviderProps {
  initialData?: ContextState;
  children: React.ReactNode;
}

export const MapProvider = ({ initialData, children }: ProviderProps) => {
  const [state, setState] = useState(
    initialData ?? {
      place: "La Orotava",
    }
  );

  return (
    <MapContext.Provider value={{ state, setState }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const ctx = useContext(MapContext);
  if (!ctx) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }

  const { state, setState } = ctx;

  const reducer = {
    setPlace: (place: ContextState["place"]) =>
      setState((old) => ({ ...old, place })),
  };

  return { state, reducer };
};
```
