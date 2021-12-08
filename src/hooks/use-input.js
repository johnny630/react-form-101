import React, { useReducer } from 'react';

const initInputState = {
  value: '',
  isTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }
  if (action.type === 'RESET') {
    return initInputState;
  }

  return initInputState;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputReducer, initInputState);

  // const [enteredValue, setEntereValue] = useState('');
  // const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
    // setEntereValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
    // setIsTouched(true);
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
    // setEntereValue('');
    // setIsTouched(false);
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
