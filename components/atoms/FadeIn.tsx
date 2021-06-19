import { useIntersectionObserver } from "../../hooks/use-intersection-observer";
import classNames from "classnames";
import animations from "@styles/animations.module.css";

const FadeInSection = ({ children }) => {
  const [setRef, isIntersecting, hasIntersected] =
    useIntersectionObserver<HTMLElement>();

  const className = classNames({
    [animations.scale__base]: true,
    [animations.scale__entered]: isIntersecting || hasIntersected,
  });

  return (
    <div className={className} ref={setRef}>
      {children}
    </div>
  );
};
export default FadeInSection;
