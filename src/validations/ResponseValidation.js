import * as yup from "yup";

export const responseSchema = yup.object().shape({
  //Rules for each one of my inputs on the form
  fullname: yup
    .string()
    .trim()
    .required("Full Name is required")
    .matches(
      /^[><?@+'`~^%&£\*\[\]\{\}.!#|\\\"$';,:;=/\(\),\-\w\s+]*$/,
      "No emoji characters allowed in this field"
    ),
  // Validation will be true if its a not empty, a string and isn't a emoji. I also used trim so the user cant just press space and enter a blank name
  // The emoji validation isn't perfect as it stops somethings that arent emojis
  email: yup.string().email().required("Email is required"),
  // Validation will be true it in email format
  message: yup
    .string()
    .trim()
    .matches(
      /^[><?@+'`~^%&£\*\[\]\{\}.!#|\\\"$';,:;=/\(\),\-\w\s+]*$/,
      "No emoji characters allowed in this field"
    )
    .min(20, "Message must be atleast 20 characters")
    .required("Message is required"),
  // Similiar to the first input but this time a min is set so there has to be atleast 20 characters
});
