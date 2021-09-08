---
title: 'useLocalStorage Hook'
date: '2020-09-00T00:00:00.0000Z'
tags:
- react
- typescript
- context
---

This mimicks a useState hook where the data is persisted to the LocalStorae of the browser

```tsx
import { useState } from 'react';

/**
 * This mimicks a useState hook where the data is persisted to the LocalStorae of the browser
 * @param key - the key of the data in the localstorage
 * @param initialValue - fallback data if nothing is defined in LS
 */
export function useLocalStorage<T = any>(
    key: string,
    initialValue: T
): [T, (x: T) => void] {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
}
```
