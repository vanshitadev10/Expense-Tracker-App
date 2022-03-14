import { useContext } from 'react';

import useFormValidation from '../../hooks/use-form-validation';
import UserInfoContext from '../../store/user-info-context';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './Settings.module.css';
import classes from '../UI/Input/validation.module.css';


const ChangePassword = () => {

    const userCtx = useContext(UserInfoContext);

    const { inputValue: emailInput, hasError: emailInputHasError, inputIsValid: emailIsValid, inputChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, inputResetHandler: resetEmailInput } = useFormValidation(value => value.includes('@'));
    const { inputValue: oldPasswordInput, hasError: oldPasswordInputHasError, inputIsValid: oldPasswordIsValid, inputChangeHandler: oldPasswordChangeHandler, inputBlurHandler: oldPasswordBlurHandler, inputResetHandler: resetOldPasswordInput } = useFormValidation(value => value.length > 7);
    const { inputValue: newPasswordInput, hasError: newPasswordInputHasError, inputIsValid: newPasswordIsValid, inputChangeHandler: newPasswordChangeHandler, inputBlurHandler: newPasswordBlurHandler, inputResetHandler: resetNewPasswordInput } = useFormValidation(value => value.length > 7);

    let formIsValid = emailIsValid && oldPasswordIsValid && newPasswordIsValid;


    const formSubmitHandler = (event) => {
        event.preventDefault();

        const userInformation = {
            email: emailInput,
            oldPassword: oldPasswordInput,
            newPassword: newPasswordInput,
        }

        if (!formIsValid) {
            return;
        }

        const text = 'Do you really want to change your password?';
        if (window.confirm(text) === true) {
            userCtx.changePasswordFunction(userInformation);

            resetEmailInput();
            resetOldPasswordInput();
            resetNewPasswordInput();
        }
    }

    const emailInputClass = emailInputHasError ? classes['not-valid'] : classes.valid;
    const oldPasswordInputClass = oldPasswordInputHasError ? classes['not-valid'] : classes.valid;
    const newPasswordInputClass = newPasswordInputHasError ? classes['not-valid'] : classes.valid;



    return (
        <div className={`${styles.container__background} ${styles.password}`}>
            <form className={styles.container} onSubmit={formSubmitHandler}>
                <h1>Change Your Password</h1>
                <div className={styles.container__input}>
                    <div className={emailInputClass}>
                        <Input className={classes.input} labelFor='email' label='Email' input={{ type: 'email', onChange: emailChangeHandler, value: emailInput, onBlur: emailBlurHandler }} />
                        {(userCtx.dataMatch === false) || emailInputHasError && <p>Please enter a valid email id</p>}
                    </div>
                    <div className={oldPasswordInputClass}>
                        <Input className={classes.input} labelFor='create-password' label='Old Password' input={{ type: 'password', onChange: oldPasswordChangeHandler, value: oldPasswordInput, onBlur: oldPasswordBlurHandler }} />
                        {(userCtx.dataMatch === false) || oldPasswordInputHasError && <p>Please enter a password having atleast 8 digits</p>}
                    </div>
                    <div className={newPasswordInputClass}>
                        <Input className={classes.input} labelFor='confirm-password' label='New Password' input={{ type: 'password', onChange: newPasswordChangeHandler, value: newPasswordInput, onBlur: newPasswordBlurHandler }} />
                        {(userCtx.dataMatch === false) || newPasswordInputHasError && <p>Please enter a password having atleast 8 digits</p>}
                    </div>
                </div>
                <Button type='submit' className={(userCtx.dataMatch === false) || !formIsValid ? classes['btn-secondary'] : ''}>
                    {!userCtx.loading && 'Submit'}
                    {userCtx.loading && 'Loading...'}
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;