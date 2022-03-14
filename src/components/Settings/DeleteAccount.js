import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserInfoContext from '../../store/user-info-context';
import Button from '../UI/Button/Button';
import styles from './Settings.module.css';


const DeleteAccount = () => {

    const userCtx = useContext(UserInfoContext);

    const navigate = useNavigate();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const text = 'Do you really want to delete Your account?';
        if (window.confirm(text) === true) {
            userCtx.deleteUser();
            userCtx.logInFunction(true);
        }
    }


    return (
        <div className={`${styles.container__background} ${styles['delete-account']}`}>
            <form className={styles.container} onSubmit={formSubmitHandler}>
                <h1>Delete My Account</h1>
                <p className={styles.container__para}><strong>Important: </strong>Please note by deleting your account you will loose your entire expense history including all your account details. This process is permanent and irreversible.</p>
                <Button type='submit' className={styles['delete-account__button']}>
                    {!userCtx.loading && 'Delete'}
                    {userCtx.loading && 'Loading...'}
                </Button>
            </form>
        </div>
    );
};

export default DeleteAccount;