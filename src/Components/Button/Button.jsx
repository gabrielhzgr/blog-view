function Button({ children, className, onClick, disabled }) {
  function pushed(e) {
    e.target.classList.remove("lift");
    e.target.classList.add("pushed");
  }

  function lift(e) {
    e.target.classList.remove("pushed");
    e.target.classList.add("lift");
  }

  if (disabled !== undefined) {
    return (
      <button
        className={`clickable button ${className ? className : ""}`}
        onTouchStart={pushed}
        onMouseDown={pushed}
        onTouchEnd={lift}
        onMouseUp={lift}
        onClick={onClick}
        disabled
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        className={`clickable button ${className ? className : ""}`}
        onTouchStart={pushed}
        onMouseDown={pushed}
        onTouchEnd={lift}
        onMouseUp={lift}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
export default Button;
