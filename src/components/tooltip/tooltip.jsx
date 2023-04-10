import * as React from 'react';


const Tooltip = ({ children, content }) => {
  const [show, setShow] = React.useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
    <div className="tooltip-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {show && <div className="tooltip-content">{content}</div>}
    </div>
  );
};

export default Tooltip;
