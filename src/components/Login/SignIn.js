import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import useFormValidation from '../../hooks/use-form-validation';
import UserInfoContext from '../../store/user-info-context';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './SignIn.module.css';
import classes from '../UI/Input/validation.module.css';
import ChartAnimation from './ChartAnimation';


const SignIn = () => {

    const userCtx = useContext(UserInfoContext);
    const navigate = useNavigate();
    const [inputIsIncorrect, setInputIsIncorrect] = useState(false);


    const { inputValue: emailInput, hasError: emailInputHasError, inputIsValid: emailIsValid, inputChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, inputResetHandler: resetEmailInput } = useFormValidation(value => value.includes('@'));
    const { inputValue: passwordInput, hasError: passwordInputHasError, inputIsValid: passwordIsValid, inputChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler, inputResetHandler: resetPasswordInput } = useFormValidation(value => value.length > 7);

    const formIsValid = emailIsValid && passwordIsValid;


    const formSubmitHandler = (event) => {
        event.preventDefault();

        const userInformation = {
            email: emailInput,
            password: passwordInput
        }

        if (!formIsValid) {
            return setInputIsIncorrect(true);
        }

        userCtx.userLoggedIn(userInformation);

        resetEmailInput();
        resetPasswordInput();
        navigate('/dashboard', { replace: true });
    }

    const emailInputClass = (inputIsIncorrect || emailInputHasError) ? classes['not-valid'] : classes.valid;
    const passwordInputClass = (inputIsIncorrect || passwordInputHasError) ? classes['not-valid'] : classes.valid;



    return (
        <div className={styles.container__background}>
            <div className={styles.container__text}>
                <ChartAnimation />
                <p>Always keep a track of your expenses because it's not the salary which makes you rich, it's your spending habits.</p>
            </div>
            <form className={styles.container} onSubmit={formSubmitHandler}>
                <h1>Welcome!</h1>
                <div className={styles.container__input}>
                    <div className={emailInputClass}>
                        <Input className={classes.input} labelFor='email' label='Email' input={{ type: 'email', onChange: emailChangeHandler, value: emailInput, onBlur: emailBlurHandler }} />
                        {(inputIsIncorrect || emailInputHasError) && <p>Please enter a valid email id</p>}
                    </div>
                    <div className={passwordInputClass}>
                        <Input className={classes.input} labelFor='password' label='Password' input={{ type: 'password', onChange: passwordChangeHandler, value: passwordInput, onBlur: passwordBlurHandler }} />
                        {(inputIsIncorrect || passwordInputHasError) && <p>Please enter a password having atleast 8 digits</p>}
                    </div>
                </div>
                <Button type='submit' className={!formIsValid ? classes['btn-secondary'] : ''}>
                    {!userCtx.loading && 'Login'}
                    {userCtx.loading && 'Loading...'}
                </Button>
                <div className={styles.links}>
                    <p>Don't have an account? <NavLink to='/sign-up' className={styles.link} replace={true}>Sign Up</NavLink></p>
                    <p>Forgot Password? <NavLink to='/forgot-password' className={styles.link} replace={true}>Reset</NavLink></p>
                </div>
            </form>
        </div>
    );
};

export default SignIn;