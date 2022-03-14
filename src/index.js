import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

import UserInfoProvider from './store/UserInfoProvider';
import ExpensesInfoProvider from './store/ExpensesInfoProvider';


ReactDOM.render(
    <BrowserRouter>
        <UserInfoProvider>
            <ExpensesInfoProvider>
                <App />
            </ExpensesInfoProvider>
        </UserInfoProvider>
    </BrowserRouter>
, document.getElementById('root'));