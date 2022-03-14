import { useReducer } from 'react';

const initialState = {
    value: '',
    isTouched: false
};

const inputStateReducer = (state, action) => {

    if (action.type === 'INPUT_CHANGE') {
        return {
            value: action.val,
            isTouched: state.isTouched
        }
    }

    if (action.type === 'INPUT_BLUR') {
        return {
            value: state.value,
            isTouched: action.touched
        }
    }

    if (action.type === 'INPUT_RESET') {
        return {
            value: action.val,
            isTouched: action.touched
        }
    }

    return initialState;
};


const useFormValidation = (validateInput) => {

    const [currentValue, dispatchValue] = useReducer(inputStateReducer, initialState);

    const validInput = validateInput(currentValue.value);
    const inputHasError = currentValue.isTouched && !validInput;

    const inputChangeHandler = (e) => {
        dispatchValue({ type: 'INPUT_CHANGE', val: e.target.value });
    }

    const inputBlurHandler = () => {
        dispatchValue({ type: 'INPUT_BLUR', touched: true });
    }

    const inputResetHandler = () => {
        dispatchValue({ type: 'INPUT_RESET', val: '', touched: false });
    }

    return {
        inputValue: currentValue.value,
        hasError: inputHasError,
        inputIsValid: validInput,
        inputChangeHandler,
        inputBlurHandler,
        inputResetHandler
    };
};

export default useFormValidation;