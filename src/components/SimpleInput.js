import React, { useState, useEffect } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHashError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHashError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim().includes('@'));

  // const [enteredName, setEnteredName] = useState('');
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  // const [formIsValid, setFormIsValid] = useState(false);

  // name
  // const enteredNameIsValid = enteredName.trim() !== '';
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  // email
  // const enteredEmailIsValid = enteredEmail.trim().includes('@');
  // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // 因為每次重估就不需使用useEffect
  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [enteredNameIsValid]);

  // name
  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);
  // };

  // const nameInputBlurHandler = (event) => {
  //   setEnteredNameTouched(true);
  // };

  // email
  // const emailInputChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  // };

  // const emailInputBlurHandler = (event) => {
  //   setEnteredEmailTouched(true);
  // };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    // setEnteredNameTouched(true);
    // setEnteredEmailTouched(true);

    if (nameInputHashError || emailInputHashError) {
      return;
    }

    // setEnteredName('');
    // setEnteredNameTouched(false);
    resetNameInput();
    // setEnteredEmail('');
    // setEnteredEmailTouched(false);
    resetEmailInput();
  };

  const nameInputClasses = nameInputHashError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputHashError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputHashError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputHashError && (
          <p className="error-text">Email must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
