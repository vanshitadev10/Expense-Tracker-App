import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import useFormValidation from '../../hooks/use-form-validation';
import UserInfoContext from '../../store/user-info-context';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './ForgotPassword.module.css';
import classes from '../UI/Input/validation.module.css';
import ChartAnimation from './ChartAnimation';


const ForgotPassword = () => {

    const userCtx = useContext(UserInfoContext);

    const { inputValue: emailInput, hasError: emailInputHasError, inputIsValid: emailIsValid, inputChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, inputResetHandler: resetEmailInput } = useFormValidation(value => value.includes('@'));


    const formSubmitHandler = (event) => {
        event.preventDefault();

        const userInformation = {
            email: emailInput
        }

        if (!emailIsValid) {
            return;
        }

        userCtx.reset(userInformation);

        resetEmailInput();
    }

    const emailInputClass = emailInputHasError ? classes['not-valid'] : classes.valid;



    return (
        <div className={styles.container__background}>
            <div className={styles.container__text}>
                <ChartAnimation />
            </div>
            <form className={styles.container} onSubmit={formSubmitHandler}>
                <h1>Forgot Your Password?</h1>
                <p className={styles.container__para}>Let us help you!</p>
                <div className={styles.container__input}>
                    <div className={emailInputClass}>
                        <Input className={classes.input} labelFor='email' label='Email' input={{ type: 'email', onChange: emailChangeHandler, value: emailInput, onBlur: emailBlurHandler }} />
                        {emailInputHasError && <p>Please enter a valid email id</p>}
                    </div>
                </div>
                <Button type='submit' className={!emailIsValid ? classes['btn-secondary'] : ''}>
                    {!userCtx.loading && 'Submit'}
                    {userCtx.loading && 'Loading...'}
                </Button>
                <NavLink to='/sign-in' className={styles.link} replace={true}>Sign In</NavLink>
            </form>
        </div>
    );
};

export default ForgotPassword;