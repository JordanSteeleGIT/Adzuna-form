import React, { useState } from "react";
import MessageForm from "./MessageForm";
import Submitted from "./Submitted";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // boolean to determine what component is being shown. False is the form and true is the "thank you" message

  return (
    <div className="page-container">
      <div className="form-container">
        {
          //if "isSubmitted" is not equal to true then it shows the form else (meaning "isSubmitted === true") it shows the Submitted component
          !isSubmitted ? (
            <MessageForm updateView={(state) => setIsSubmitted(state)} /> // Here im passing the useState to the component so it has the ability to change it
          ) : (
            <Submitted updateView={(state) => setIsSubmitted(state)} />
          )
        }
      </div>
    </div>
  );
};

export default Form;
