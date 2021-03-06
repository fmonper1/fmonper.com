---
title: 'useWindowSize'
date: '2020-03-16T05:35:07.322Z'
tags:
  - react
  - hook
---

This simple hook returns the screen size as well as a series of booleans isXs, isSm, isMd similar to those of MaterialUI.

```jsx
import { useEffect, useState } from "react";

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    isXs: undefined,
    isSm: undefined,
    isMd: undefined,
  });

  useEffect(() => {
    function handleResize() {
      const isXs = window.innerWidth < 640;
      const isSm = !isXs && window.innerWidth < 768;
      const isMd = !isSm && window.innerWidth < 1024;
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isXs,
        isSm,
        isMd,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { ...windowSize };
};

export default useWindowSize;
```
