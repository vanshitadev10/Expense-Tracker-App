import { useContext, useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import UserInfoContext from '../../store/user-info-context';

import Button from '../UI/Button/Button';
import settingsIcon from '../../assets/settings.png';
import close from '../../assets/close.png';
import styles from './Header.module.css';


const Header = () => {

    const userCtx = useContext(UserInfoContext);

    const navigate = useNavigate();

    const [openNav, setOpenNav] = useState(false);

    const logoutHandler = () => {
        const text = 'Do you really want to logout?';
        if (window.confirm(text) === true) {
            userCtx.userLoggedOut();
            localStorage.removeItem('currentAddress');
        }
    };

    useEffect(() => {
        if (userCtx.isLoggedOut) {
            if (localStorage.getItem('currentAddress').includes('/delete-account')) {
                navigate('/sign-up', { replace: true });
            }
            else {
                navigate('/sign-in', { replace: true });
            }
        }
    }, [userCtx.isLoggedOut]);


    const settingsOpenHandler = () => {
        setOpenNav(true)
    }

    const settingsCloseHandler = () => {
        setOpenNav(false)
    }


    const y = window.matchMedia("(max-width: 992px)");


    return (
        <div>
            <header className={styles.header}>
                <h1>Expense Tracker</h1>
                {(!userCtx.isLoggedOut && !userCtx.hasError) &&
                    (<nav>
                        {(!y.matches) &&
                            (<ul>
                                <li>
                                    <NavLink to='/dashboard' className={(navData) => navData.isActive ? styles.active : ''} replace={true}>Dashboard</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/compare-expenses' className={(navData) => navData.isActive ? styles.active : ''} replace={true}>Compare-Expenses</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/add-expenses' className={(navData) => navData.isActive ? styles.active : ''} replace={true}>Add-Expense</NavLink>
                                </li>

                            </ul>)}
                        <div>
                            <Button className={styles['logout-btn']} onClick={logoutHandler}>
                                {!userCtx.loading && 'Logout'}
                                {userCtx.loading && 'Loading...'}
                            </Button>
                        </div>
                        <div>
                            <button className={styles['settings-button']} onClick={settingsOpenHandler}><img src={settingsIcon} alt='settings' /></button>
                        </div>
                    </nav>)}
            </header>
            {(!userCtx.isLoggedOut && !userCtx.hasError) &&
                (<section className={styles['sliding-navbar']} style={openNav ? { 'width': `${y.matches ? '75%' : '30%'}`, 'height': `${y.matches ? '80%' : '50%'}` } : { 'width': '0', 'height': '0' }}>
                    <div>
                        <button className={styles['close-button']} onClick={settingsCloseHandler}><img src={close} alt='close' /></button>
                        <h2>Settings</h2>
                    </div>
                    {(y.matches) &&
                        (<ul>
                            <li>
                                <NavLink to='/dashboard' className={(navData) => navData.isActive ? styles.active : ''} replace={true} onClick={settingsCloseHandler}>Dashboard</NavLink>
                            </li>
                            <li>
                                <NavLink to='/compare-expenses' className={(navData) => navData.isActive ? styles.active : ''} replace={true} onClick={settingsCloseHandler}>Compare-Expenses</NavLink>
                            </li>
                            <li>
                                <NavLink to='/add-expenses' className={(navData) => navData.isActive ? styles.active : ''} replace={true} onClick={settingsCloseHandler}>Add-Expense</NavLink>
                            </li>
                        </ul>)}
                    <ul>
                        <li>
                            <NavLink to='/change-password' className={(navData) => navData.isActive ? styles.active : ''} replace={true} onClick={settingsCloseHandler}>Change Password</NavLink>
                        </li>
                        <li>
                            <NavLink to='/change-user-name' className={(navData) => navData.isActive ? styles.active : ''} replace={true} onClick={settingsCloseHandler}>Change User Name</NavLink>
                        </li>
                        <li>
                            <NavLink to='/delete-account' className={(navData) => navData.isActive ? styles.active : styles.delete} replace={true} onClick={settingsCloseHandler}>Delete Account</NavLink>
                        </li>
                    </ul>
                </section>)}
        </div>
    );
};

export default Header;