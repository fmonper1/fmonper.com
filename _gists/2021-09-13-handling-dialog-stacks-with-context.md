---
title: "Handling dialog stacks with React Context API"
date: "2020-09-00T00:00:00.0000Z"
tags:
  - react
  - typescript
  - context
---

In some apps we have handled dialog stacks using the Context API from React.

This has allowed us to `push` and `pop` dialogs from any part of our application as well as allowing us to create separate dialog-related logic to its own consumer.

Below you can find both the `<DialogProvider>` which can take an initialValue for easier testing, and as `useDialogContext()` hook to interact with the context.

```tsx
// dialog-context.tsx
import * as React from "react";

export interface DialogConfig {
  component: React.ReactElement<any, any>;
}

/**
 * Index will start at 0 and be set to -1 when the stack has been cleared
 */
type DialogContextState = {
  index: number;
  dialog: DialogConfig[];
};

type ReducerAction =
  | {
      type: "CREATE_STACK";
      dialog: DialogConfig[];
    }
  | {
      type: "PUSH_DIALOG";
      dialog: React.ReactElement;
    }
  | { type: "INCREASE_INDEX" }
  | { type: "REDUCE_INDEX" }
  | { type: "POP_DIALOG" }
  | { type: "CLEAR_STACK" };

const DialogsContextState = React.createContext<DialogContextState | undefined>(
  undefined
);
const DialogsContextReducer = React.createContext<
  React.Dispatch<ReducerAction> | undefined
>(undefined);

const dialogReducer = (
  state: DialogContextState,
  action: ReducerAction
): DialogContextState => {
  switch (action.type) {
    case "CREATE_STACK": {
      return {
        index: 0,
        dialog: action.dialog,
      };
    }
    case "INCREASE_INDEX": {
      return {
        ...state,
        index: state.index + 1,
      };
    }
    case "REDUCE_INDEX": {
      return {
        ...state,
        index: state.index - 1 >= 0 ? state.index - 1 : 0,
      };
    }
    case "PUSH_DIALOG": {
      return {
        ...state,
        dialog: [
          ...state.dialog,
          {
            component: action.dialog,
          },
        ],
      };
    }
    case "POP_DIALOG": {
      return {
        ...state,
        dialog: state.dialog.slice(1),
      };
    }
    case "CLEAR_STACK": {
      return {
        index: -1,
        dialog: [],
      };
    }
  }
};

const DialogProvider: React.FC<{ initialValue?: DialogContextState }> = (
  props
) => {
  const [state, dispatch] = React.useReducer(
    dialogReducer,
    props.initialValue ?? {
      index: -1,
      dialog: [],
    }
  );

  return (
    <DialogsContextState.Provider value={state}>
      <DialogsContextDispatch.Provider value={dispatch}>
        {props.children}
      </DialogsContextDispatch.Provider>
    </DialogsContextState.Provider>
  );
};

/**
 * Split the context into two providers to avoid rerendering components
 * that only push dialogs to the context
 */
function useDialogContextState() {
  const context = React.useContext(DialogsContextDispatch);
  if (!context) {
    throw new Error(`useDialogContext must be used within a DialogProvider`);
  }
  const state = context;

  return state;
}

function useDialogContext() {
  const context = React.useContext(DialogsContextDispatch);
  if (!context) {
    throw new Error(`useDialogContext must be used within a DialogProvider`);
  }
  const dispatch = context;

  const pushDialog = (dialog: React.ReactElement) => {
    dispatch({
      type: "PUSH_DIALOG",
      dialog,
    });
  };

  const popDialog = () => {
    dispatch({
      type: "POP_DIALOG",
    });
  };

  const clearDialogStack = () => {
    console.log("clearing dialog stack");
    dispatch({
      type: "CLEAR_STACK",
    });
  };

  const createDialogStack = (dialogs: DialogConfig[]) => {
    dispatch({
      type: "CREATE_STACK",
      dialog: dialogs,
    });
  };

  const showNextDialog = () => {
    dispatch({
      type: "INCREASE_INDEX",
    });
  };

  const showPreviousDialog = () => {
    dispatch({
      type: "REDUCE_INDEX",
    });
  };

  return {
    dispatch,
    pushDialog,
    popDialog,
    clearDialogStack,
    createDialogStack,
    showNextDialog,
    showPreviousDialog,
  };
}

export { DialogProvider, useDialogContext, useDialogContextState };
```

The `<DialogConsumer>` clones the dialogs from the stack and provides some default props to our dialog component.

(We could modify it to take in only the content of the dialog to also decouple our dialogs from our forms/user flows)

```tsx
// dialog-consumer.tsx
import React from "react";

import { useDialogContext, DialogConfig } from "./dialog-context";

/**
 * Gets the dialog component from the state and creates a copy
 * of it to be displayed on the page.
 */
const DialogConsumer: React.FC = () => {
  const { showPreviousDialog, clearDialogStack } = useDialogContext();
  const { index, dialog } = useDialogContextState();

  return (
    <>
      {dialog.map((theDialog: DialogConfig, i: number) => {
        return React.cloneElement(
          theDialog.component,
          {
            ...theDialog.component.props,
            key: i,
            open: i === index, // only open the last one
            title: theDialog.component.props.title, //only debug
            onClose: () => {
              showPreviousDialog();
              console.log(theDialog.component.props.title + " closed");
            },
            /** Dialogs from the context clear the stack when clicking the cross icon */
            onCloseCrossClick: clearDialogStack,
          },
          theDialog.component.props.children
        );
      })}
    </>
  );
};

export default DialogConsumer;
```

A more advanced example would handle dialog-flows utilizing DAG's or FSM's such as [X-State](https://xstate.com/).
