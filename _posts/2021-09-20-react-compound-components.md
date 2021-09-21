---
title: Compound components in React
subtitle: Creating the Popover button
tags:
- react
- compositon
- typescript
excerpt: We explore how to create a Compound component with React and Typescript
---

A compound component is one of the advanced patterns of React which makes use of an interesting way to communicate the relationship between UI components and share implicit state by leveraging an explicit parent-child relationship. [Smashing Magazine](smashingmagazine.com/2021/08/compound-components-react/)

## Why compound components

Using compound components makes it easy to group toghether small components that are meant to be used toghether .

A common use case for this would be the Dialog component from Material-UI. The MUI library uses 4 components to build a dialog: `<Dialog />`, `<DialogTitle />`, `<DialogContent />` and `<DialogActions />`.

If I were to implement this same dialog components using the compound component approach, I would only export the `<Dialog />` component.

What about the other 3 components?

Well, this would be accesible from the `<Dialog />`, you would have to use `<Dialog.Title />`, `<Dialog.Content />` and `<Dialog.Actions />`

## Creating our popover

The `<Dialog />` example is a pretty basic one because our title, content and actions would be mereley presentational components. They would just set some common styles for the different parts of our dialog (at least in my implementations).

Lets create a more complex component which uses a context under the hood to share some state.

We will extend the [popover from headlessui](https://headlessui.dev/react/popover) so 

Firstly we create our context and a hook to access the context. (We dont want to manipulate the context directly)
```js
const PopoverContext = createContext(undefined);

const Popover= ({ children }) => {
  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState();

  const toggle = useCallback(() => setOpen((open) => !open), [setOpen]);
  const setClose = useCallback(() => setOpen(false), [setOpen]);

  const value = useMemo(
    () => ({ open, toggle, setClose, referenceElement, setReferenceElement }),
    [setClose, toggle, open, referenceElement]
  );

  return (
    <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
  );
};

const usePopoverContext = () => {
    const context = useContext(PopoverContext);
    if (!context) {
        throw new Error(
            `Toggle compound components cannot be rendered outside the Popover component`
        );
    }

    return context;
};
```

```js
import { Popover as HLPopover } from "@headlessui/react";

const PopoverPanel = ({
  config = {},
  children
}) => {
  const { open, toggle, referenceElement } = usePopoverContext();

  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    config
  );

  if (typeof children === "undefined") {
    throw new Error("<Popover> must contain a child component.");
  }

  if (!open) return null;
  return (
    <div>
      <HLPopover>
        <div>
          <HLPopover.Panel
            static
            ref={setPopperElement}
            style={{ ...styles.popper, maxWidth: "250px" }}
            className="z-20 "
            {...attributes.popper}
          >
            <div className="overflow-hidden rounded-lg bg-white border shadow-paper ring-1 ring-black ring-opacity-5">
              <div className="relative grid gap-2 lg:grid-cols-1">
                {children}
              </div>
            </div>
          </HLPopover.Panel>
        </div>
      </HLPopover>
    </div>
  );
};
```

Lets create a custom title for our popover.

```js
const PopoverTitle = ({
  children,
  icon,
  customIcon
}) => {
    return (
        <div className="flex items-center p-2 overflow-hidden transition duration-150 ease-in-out border-b">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-white sm:h-10 sm:w-10">
                {icon && !customIcon && (
                    <Icon path={icon} className={"text-gray-500"} size={1.4} />
                )}
                {customIcon && !icon && <div>{customIcon}</div>}
            </div>
            <p className="mx-2 text-base font-semibold text-black truncate">
                {children}
            </p>
        </div>
    );
};
```

And now lets create a component that uses the context we created before.

We want to close our popover after clicking on our option, just like in headless-ui. To do this we must use the `setClose()` function from our context.

```js
const PopoverOption = ({
  name,
  icon,
  type,
  style = "default",
  size = "default",
  onClick,
  disabled
}) => {
    const { setClose } = usePopoverContext();
    const handleClick = () => {
        if (disabled) return;
        if (onClick) onClick();
        setClose();
    };
    return (
        <div
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleClick();
                }
            }}
            role="button"
            tabIndex={0}
            key={name}
            className={clsx(
                "flex items-center px-2 py-1 transition duration-150 ease-in-out",
                size === "default" && "",
                !disabled && "hover:bg-blue-100",
                " focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer select-none"
            )}
        >
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 sm:h-10 sm:w-10">
                <Icon
                    path={icon}
                    size={1}
                    className={clsx(
                        !disabled && [
                            style === "default" && "text-secondary",
                            style === "primary" && "text-primary",
                            style === "secondary" && "text-secondary",
                            style === "error" && "text-red-500",
                            type === "error" && "text-red-500"
                        ],
                        disabled && "text-black-500"
                    )}
                />
            </div>
            <p
                className={clsx(
                    "px-2 text-base font-normal ",
                    !disabled && [
                        style === "default" && "text-secondary",
                        style === "primary" && "text-primary",
                        style === "secondary" && "text-secondary",
                        style === "error" && "text-red-500",
                        type === "error" && "text-red-500"
                    ],
                    disabled && "text-black-500"
                )}
            >
                {name}
            </p>
        </div>
    );
};
```

And finally lets create our own version of the button
```js
const PopoverButton = ({ children }) => {
  const { toggle, setReferenceElement } = usePopoverContext();
  return React.cloneElement(children, {
    ref: setReferenceElement,
    onClick: toggle
  });
};
```

Join the components and export the `<Popover />`

```js
Popover.Button = PopoverButton;
Popover.Option = PopoverOption;
Popover.Title = PopoverTitle;
Popover.Panel = PopoverPanel;

export default Popover;
```

## Putting it all toghether

<iframe src="https://codesandbox.io/embed/vibrant-yonath-2uuip?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="Compound Componenent Popover Example"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
/>
