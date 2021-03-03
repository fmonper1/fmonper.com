import { useEffect, useRef, useState } from "react";

const FadeInSection = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasShown(true);
        }
      });
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible || hasShown ? "is-visible" : ""}`}
      ref={domRef}
    >
      {children}
    </div>
  );
};
export default FadeInSection;
