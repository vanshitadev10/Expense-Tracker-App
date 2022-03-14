import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import useFormValidation from '../../hooks/use-form-validation';
import UserInfoContext from '../../store/user-info-context';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './SignUp.module.css';
import classes from '../UI/Input/validation.module.css';
import ChartAnimation from './ChartAnimation';


const SignUp = () => {

    const userCtx = useContext(UserInfoContext);
    const navigate = useNavigate();
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);



    const { inputValue: nameInput, hasError: nameInputHasError, inputIsValid: nameIsValid, inputChangeHandler: nameChangeHandler, inputBlurHandler: nameBlurHandler, inputResetHandler: resetNameInput } = useFormValidation(value => value.trim() !== '');
    const { inputValue: ageInput, hasError: ageInputHasError, inputIsValid: ageIsValid, inputChangeHandler: ageChangeHandler, inputBlurHandler: ageBlurHandler, inputResetHandler: resetAgeInput } = useFormValidation(value => value > 1 && value < 131);
    const { inputValue: emailInput, hasError: emailInputHasError, inputIsValid: emailIsValid, inputChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, inputResetHandler: resetEmailInput } = useFormValidation(value => value.includes('@'));
    const { inputValue: createPasswordInput, hasError: createPasswordInputHasError, inputIsValid: createPasswordIsValid, inputChangeHandler: createPasswordChangeHandler, inputBlurHandler: createPasswordBlurHandler, inputResetHandler: resetCreatePasswordInput } = useFormValidation(value => value.length > 7);
    const { inputValue: confirmPasswordInput, hasError: confirmPasswordInputHasError, inputIsValid: confirmPasswordIsValid, inputChangeHandler: confirmPasswordChangeHandler, inputBlurHandler: confirmPasswordBlurHandler, inputResetHandler: resetConfirmPasswordInput } = useFormValidation(value => value.length > 7);

    let formIsValid = nameIsValid && ageIsValid && emailIsValid && createPasswordIsValid && confirmPasswordIsValid;



    const formSubmitHandler = (event) => {
        event.preventDefault();


        if (!formIsValid || (createPasswordInput !== confirmPasswordInput)) {
            setPasswordIsInvalid(true);
            return;
        }

        const userInformation = {
            userName: event.target[0].value,
            age: event.target[1].value,
            email: event.target[2].value,
            password: event.target[3].value
        }

        userCtx.setItems(userInformation);

        resetNameInput();
        resetAgeInput();
        resetEmailInput();
        resetCreatePasswordInput();
        resetConfirmPasswordInput();
        setPasswordIsInvalid(false);
        navigate('/dashboard', { replace: true });
        localStorage.setItem('loggedIn', 1);
    }


    const nameInputClass = nameInputHasError ? classes['not-valid'] : classes.valid;
    const ageInputClass = ageInputHasError ? classes['not-valid'] : classes.valid;
    const emailInputClass = emailInputHasError ? classes['not-valid'] : classes.valid;
    const createPasswordInputClass = (createPasswordInputHasError || passwordIsInvalid) ? classes['not-valid'] : classes.valid;
    const confirmPasswordInputClass = (confirmPasswordInputHasError || passwordIsInvalid) ? classes['not-valid'] : classes.valid;



    return (
        <div className={styles.container__background}>
            <div className={styles.container__text}>
                <ChartAnimation />
                <h2>So Happy To See You Here!</h2>
                <p>Control your expenses better than your competition because this is where you can always find the competitive advantage.</p>
            </div>
            <form className={styles.container} onSubmit={formSubmitHandler}>
                <h1>Welcome!</h1>
                <div className={styles.container__input}>
                    <div className={nameInputClass}>
                        <Input className={classes.input} labelFor='name' label='Name' input={{ type: 'text', onChange: nameChangeHandler, value: nameInput, onBlur: nameBlurHandler }} />
                        {nameInputHasError && <p>Please enter a valid name</p>}
                    </div>
                    <div className={ageInputClass}>
                        <Input className={classes.input} labelFor='age' label='Age' input={{ type: 'number', onChange: ageChangeHandler, value: ageInput, onBlur: ageBlurHandler }} />
                        {ageInputHasError && <p>Please enter a valid age</p>}
                    </div>
                    <div className={emailInputClass}>
                        <Input className={classes.input} labelFor='email' label='Email' input={{ type: 'email', onChange: emailChangeHandler, value: emailInput, onBlur: emailBlurHandler }} />
                        {emailInputHasError && <p>Please enter a valid email id</p>}
                    </div>
                    <div className={createPasswordInputClass}>
                        <Input className={classes.input} labelFor='create-password' label='Create Password' input={{ type: 'password', onChange: createPasswordChangeHandler, value: createPasswordInput, onBlur: createPasswordBlurHandler }} />
                        {createPasswordInputHasError && <p>Please enter a password having atleast 8 digits</p>}
                        {passwordIsInvalid && <p>Your Passwords does not match</p>}
                    </div>
                    <div className={confirmPasswordInputClass}>
                        <Input className={classes.input} labelFor='confirm-password' label='Confirm Password' input={{ type: 'password', onChange: confirmPasswordChangeHandler, value: confirmPasswordInput, onBlur: confirmPasswordBlurHandler }} />
                        {confirmPasswordInputHasError && <p>Please enter a password having atleast 8 digits</p>}
                        {passwordIsInvalid && <p>Your Passwords does not match</p>}
                    </div>
                </div>
                <Button type='submit' className={!formIsValid ? classes['btn-secondary'] : ''}>
                    {!userCtx.loading && 'Submit'}
                    {userCtx.loading && 'Loading...'}
                </Button>
                <p>Already have an account? <NavLink to='/sign-in' className={styles.link} replace={true}>Sign In</NavLink></p>
            </form>
        </div>
    );
};

export default SignUp;