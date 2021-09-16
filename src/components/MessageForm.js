import React, { useState, useEffect } from "react";
import { responseSchema } from "../validations/ResponseValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const MessageForm = ({ updateView }) => {
  const [text, setText] = useState(""); // this store the text within the textarea
  const [textLength, setTextLength] = useState({
    words: 0,
    chars: 0,
  }); // useState to store amount of characters and words

  const countWords = (str) => {
    //This was taken from online. Didnt realize until too late that my implementation counted return as a word
    str = str.replace(/(^\s*)|(\s*$)/gi, ""); //exclude  start and end white-space
    str = str.replace(/[ ]{2,}/gi, " "); //2 or more space to 1
    str = str.replace(/\n /, "\n"); // exclude newline with a start spacing
    return str.split(" ").filter(String).length;
  };
  //Destructuring the useForm hook . Register = what fields are part of the validation, handlesubmit = function used to submit form, errors = an object to store the error messages
  //The resolver is used to connect hookform to yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(responseSchema),
  });

  useEffect(() => {
    //Everytime the text useState is changed this runs.
    if (text.length === 0) {
      //Without this the useState that handles the count stays at 1 even if there isn't anything in the textarea
      setTextLength({
        ...textLength,
        words: 0,
        chars: 0,
      });
    } else {
      //Used to update the useState object. Words calls the countWords function while chars just counts the length of the string
      setTextLength({
        ...textLength,
        words: countWords(text),
        chars: text.length,
      });
    }
  }, [text]);

  const submitForm = (data) => {
    if (data) {
      // If validation is true change UpdateView to true (show thank you screen)
      updateView(true);
    }
  };
  return (
    <div className="form-wrapper">
      <h1>Enter Message</h1>
      {/* Novalidate is used to stop the default validation made by the browser*/}
      <form onSubmit={handleSubmit(submitForm)} novalidate="novalidate">
        <div className="form-section small-section">
          <label className="label">Full Name</label>
          <input
            name="fullname"
            type="text"
            {
              ...register("fullname") /*Grabbing the inputs for hookform */
            }
          />
          <p>
            {/*Displaying any input errors if there are any */}
            {errors.fullname?.message}
          </p>
        </div>
        <div className="form-section small-section">
          <label className="label">Email</label>
          <input name="email" type="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div className="form-section large-section">
          <label className="label">Notes</label>
          <textarea
            name="message"
            type="text"
            {...register("message")}
            /*When the textarea is changed it updates the text useState*/
            onChange={(e) => setText(e.target.value)}
          />
          <div className="messageInfo">
            <p>{errors.message?.message}</p>
            <h3>
              {/*This displays both word count and character count. (I added character count as well since the validation needs over 20 ) */}
              Words: {textLength.words} | Characters: {textLength.chars}
            </h3>
          </div>
        </div>
        <div className="form-button">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
