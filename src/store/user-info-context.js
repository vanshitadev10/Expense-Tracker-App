import React from 'react';


const UserInfoContext = React.createContext({
    idUser: '',
    nameUser: '',
    hasError: null,
    loading: false,
    isLoggedOut: true,
    dataMatch: null,
    setItems: (item) => { },
    userLoggedIn: (item) => { },
    userLoggedOut: (item) => { },
    reset: (item) => { },
    logInFunction: (item) => { },
    changePasswordFunction: (item) => { },
    setUsername: (item) => { },
    deleteUser: (item) => { }
})

export default UserInfoContext;