import { useCallback, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth, onAuthStateChanged, updatePassword, updateProfile, deleteUser } from 'firebase/auth';
import { auth } from '../components/Firebase/Firebase';
import UserInfoContext from './user-info-context';


const initialState = {
    isLoading: false,
    error: null,
    loggedOut: true,
    user: '',
    userName: '',
    dataMatched: null
};

const userInfoReducer = (state, action) => {

    if (action.type === 'LOADING_STATE_CHANGE') {
        return {
            isLoading: action.bool,
            error: state.error,
            loggedOut: state.loggedOut,
            user: state.user,
            userName: state.userName,
            dataMatched: state.dataMatched
        }
    }

    if (action.type === 'SET_ERROR') {
        return {
            isLoading: state.isLoading,
            error: action.err,
            loggedOut: state.loggedOut,
            user: state.user,
            userName: state.userName,
            dataMatched: state.dataMatched
        }
    }

    if (action.type === 'LOGOUT_STATE_CHANGE') {
        return {
            isLoading: state.isLoading,
            error: state.error,
            loggedOut: action.logOut,
            user: state.user,
            userName: state.userName,
            dataMatched: state.dataMatched
        }
    }

    if (action.type === 'SET_USER') {
        return {
            isLoading: state.isLoading,
            error: state.error,
            loggedOut: state.loggedOut,
            user: action.User,
            userName: state.userName,
            dataMatched: state.dataMatched
        }
    }

    if (action.type === 'SET_USER_NAME') {
        return {
            isLoading: state.isLoading,
            error: state.error,
            loggedOut: state.loggedOut,
            user: state.user,
            userName: action.username,
            dataMatched: state.dataMatched
        }
    }

    if (action.type === 'DATA_STATE_CHANGE') {
        return {
            isLoading: state.isLoading,
            error: state.error,
            loggedOut: state.loggedOut,
            user: state.user,
            userName: state.userName,
            dataMatched: action.matchedData
        }
    }

    return initialState;
};


const UserInfoProvider = (props) => {

    const navigate = useNavigate();

    const [currentValue, dispatchValue] = useReducer(userInfoReducer, initialState);



    const loggedInFunction = (now) => {
        dispatchValue({ type: 'LOGOUT_STATE_CHANGE', logOut: now });
    }


    useEffect(() => {
        if (!currentValue.loggedOut) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    dispatchValue({ type: 'SET_USER', User: user.uid });
                }
            });
        }
    }, [currentValue.loggedOut]);




    async function setData(userData) {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            setName(userData.userName);

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOGOUT_STATE_CHANGE', logOut: false });
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    }



    async function setName(userName) {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            const auth = getAuth();
            updateProfile(auth.currentUser, {
                displayName: `${userName}`
            });
            navigate('/dashboard', { replace: true });
            window.location.reload();

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOGOUT_STATE_CHANGE', logOut: false });
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    }



    async function logoutFunction() {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            await signOut(auth);

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOGOUT_STATE_CHANGE', logOut: true });
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    }



    const loginFunction = useCallback(async (userData) => {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            await signInWithEmailAndPassword(auth, userData.email, userData.password);
        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOGOUT_STATE_CHANGE', logOut: false });
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    }, []);



    async function resetPassword(userData) {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            await sendPasswordResetEmail(auth, userData.email);

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOGOUT_STATE_CHANGE', logOut: false });
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    };



    async function changePassword(userData) {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            const auth = getAuth();
            const userAuth = auth.currentUser;

            const response = await signInWithEmailAndPassword(auth, userData.email, userData.oldPassword);
            if (response) {
                dispatchValue({ type: 'DATA_STATE_CHANGE', matchedData: true });
                updatePassword(userAuth, userData.newPassword);
                navigate('/sign-in', { replace: true });
            }
            else {
                dispatchValue({ type: 'DATA_STATE_CHANGE', matchedData: false });
            }

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOGOUT_STATE_CHANGE', logOut: false });
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    };



    async function deleteAccount() {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            const auth = getAuth();
            const userAuth = auth.currentUser;

            deleteUser(userAuth);

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOGOUT_STATE_CHANGE', logOut: false });
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    };



    useEffect(() => {
        if (currentValue.error !== null) {
            navigate('/error', { replace: true });
        }
    }, [currentValue.error]);


    const auth = getAuth();
    const userAuth = auth.currentUser;
    useEffect(() => {
        if (userAuth) {
            dispatchValue({ type: 'SET_USER_NAME', username: userAuth.displayName });
        }
    }, [userAuth]);





    const userInformation = {
        idUser: currentValue.user,
        nameUser: currentValue.userName,
        hasError: currentValue.error,
        loading: currentValue.isLoading,
        isLoggedOut: currentValue.loggedOut,
        dataMatch: currentValue.dataMatched,
        setItems: setData,
        userLoggedIn: loginFunction,
        userLoggedOut: logoutFunction,
        reset: resetPassword,
        logInFunction: loggedInFunction,
        changePasswordFunction: changePassword,
        setUsername: setName,
        deleteUser: deleteAccount
    }


    return <UserInfoContext.Provider value={userInformation}>
        {props.children}
    </UserInfoContext.Provider>;
};

export default UserInfoProvider;