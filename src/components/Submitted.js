import React, { useState } from "react";
import { BsArrowBarLeft } from "react-icons/bs"; // Importing icon from react-icons

const Submitted = ({ updateView }) => {
  const [hover, setHover] = useState(false); // if mouse is hovering over the icon this is set to true and the color changes
  //Simple component that displays a thank you message.
  return (
    <>
      <div className="submitted-wrapper">
        <button
          className="back-button"
          onMouseOver={() => setHover(true)} // on mouse hover set hover to true
          onMouseLeave={() => setHover(false)} // on mouse leave set hover to false
          onClick={() => updateView(false)} // this changes the useState in the form component to false. When its false it displays the form
        >
          <BsArrowBarLeft
            size="55px"
            color="white"
            style={hover ? { color: "#e0e0e0", cursor: "pointer" } : {}} // if hover equals true change color and change cursor
          />
        </button>
        <div className="submitted-content">
          <h1>Thank you</h1>
        </div>
      </div>
    </>
  );
};

export default Submitted;
