import { Fragment, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import UserInfoContext from './store/user-info-context';
import ExpensesInfoContext from './store/expenses-info-context';

import Header from './components/Header/Header';
import SignUp from './components/Login/SignUp';
import SignIn from './components/Login/SignIn';
import Error from './components/Error/Error';
import ForgotPassword from './components/Login/ForgotPassword';
import Dashboard from './components/Expenses/Dashboard/Dashboard';
import ChangePassword from './components/Settings/ChangePassword';
import ChangeUserName from './components/Settings/ChangeUserName';
import DeleteAccount from './components/Settings/DeleteAccount';
import ExpenseForm from './components/Expenses/AddExpense/ExpenseForm';
import CompareExpenses from './components/Expenses/Compare-Expenses/CompareExpenses';


const App = () => {

    localStorage.setItem('currentAddress', window.location.href)
    const userCtx = useContext(UserInfoContext);
    const expenseCtx = useContext(ExpensesInfoContext);


    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('currentAddress').includes('/dashboard') || localStorage.getItem('currentAddress').includes('/add-expenses') || localStorage.getItem('currentAddress').includes('/compare-expenses') || localStorage.getItem('currentAddress').includes('/change-password') || localStorage.getItem('currentAddress').includes('/change-user-name') || localStorage.getItem('currentAddress').includes('/delete-account')) {
            navigate('/dashboard', { replace: true });
            userCtx.logInFunction(false);
            expenseCtx.getItems();
        }
    }, []);




    return (
        <Fragment>
            <Header />
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/error' element={<Error />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/add-expenses' element={<ExpenseForm />} />
                <Route path='/compare-expenses' element={<CompareExpenses />} />
                <Route path='/change-password' element={<ChangePassword />} />
                <Route path='/change-user-name' element={<ChangeUserName />} />
                <Route path='/delete-account' element={<DeleteAccount />} />
            </Routes>
        </Fragment>
    );
};

export default App;