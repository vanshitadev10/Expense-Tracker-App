import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import UserInfoContext from "../../store/user-info-context";
import styles from './Error.module.css';


const Error = () => {
    const userCtx = useContext(UserInfoContext);

    return (
        <div className={styles.error}>
            <h1 className={styles.error__text}>{userCtx.hasError}</h1>
            <NavLink className={styles.error__link} to='/sign-in' replace={true}>Try Again</NavLink>
        </div>
    );
};

export default Error;