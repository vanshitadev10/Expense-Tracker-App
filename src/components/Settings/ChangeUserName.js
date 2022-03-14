import { useContext } from 'react';

import useFormValidation from '../../hooks/use-form-validation';
import UserInfoContext from '../../store/user-info-context';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './Settings.module.css';
import classes from '../UI/Input/validation.module.css';
import NameAnimation from './NameAnimation';


const ChangeUserName = () => {

    const userCtx = useContext(UserInfoContext);

    const { inputValue: nameInput, hasError: nameInputHasError, inputIsValid: nameIsValid, inputChangeHandler: nameChangeHandler, inputBlurHandler: nameBlurHandler, inputResetHandler: resetNameInput } = useFormValidation(value => value.trim() !== '');


    const formSubmitHandler = (event) => {
        event.preventDefault();


        if (!nameIsValid) {
            return;
        }

        const text = 'Do you really want to change your username?';
        if (window.confirm(text) === true) {
            userCtx.setUsername(`${nameInput}`);

            resetNameInput();
        }
    }

    const nameInputClass = nameInputHasError ? classes['not-valid'] : classes.valid;



    return (
        <div className={`${styles.container__background} ${styles.username}`}>
            <form className={styles.container} onSubmit={formSubmitHandler}>
                <h1>Change Your UserName</h1>
                <NameAnimation />
                <div className={styles.container__input}>
                    <div className={nameInputClass}>
                        <Input className={classes.input} labelFor='name' label='Enter New Name' input={{ type: 'text', onChange: nameChangeHandler, value: nameInput, onBlur: nameBlurHandler }} />
                        {nameInputHasError && <p>Please enter a valid name</p>}
                    </div>
                </div>
                <Button type='submit' className={!nameIsValid ? classes['btn-secondary'] : ''}>
                    {!userCtx.loading && 'Change'}
                    {userCtx.loading && 'Loading...'}
                </Button>
            </form>
        </div>
    );
};

export default ChangeUserName;