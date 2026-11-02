import { Link as RouterLink } from "react-router";
function Link({ to, children, className, target }) {
  function pushed(e) {
    e.target.classList.remove("lift");
    e.target.classList.add("pushed");
  }

  function lift(e) {
    e.target.classList.remove("pushed");
    e.target.classList.add("lift");
  }

  return (
    <RouterLink
      to={to}
      target={target}
      className={`clickable ${className ? className : ""}`}
      onTouchStart={pushed}
      onMouseDown={pushed}
      onTouchEnd={lift}
      onMouseUp={lift}
    >
      {children}
    </RouterLink>
  );
}
export default Link;
