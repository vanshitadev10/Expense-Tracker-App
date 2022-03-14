import { useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import UserInfoContext from '../../../store/user-info-context';
import ExpensesInfoContext from '../../../store/expenses-info-context';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import styles from './ExpenseForm.module.css';
import classes from '../../UI/Input/validation.module.css';


const initialState = {
    nameValue: '',
    dateValue: '',
    amountValue: ''
};

const expenseInputReducer = (state, action) => {

    if (action.type === 'NAME_INPUT_CHANGE') {
        return {
            nameValue: action.val,
            dateValue: state.dateValue,
            amountValue: state.amountValue
        }
    }

    if (action.type === 'DATE_INPUT_CHANGE') {
        return {
            nameValue: state.nameValue,
            dateValue: action.val,
            amountValue: state.amountValue
        }
    }

    if (action.type === 'AMOUNT_INPUT_CHANGE') {
        return {
            nameValue: state.nameValue,
            dateValue: state.dateValue,
            amountValue: action.val
        }
    }

    return initialState;
};


const ExpenseForm = () => {

    const userCtx = useContext(UserInfoContext);
    const ExpenseCtx = useContext(ExpensesInfoContext);

    const navigate = useNavigate();


    const [currentValue, dispatchValue] = useReducer(expenseInputReducer, initialState);

    const formIsValid = currentValue.nameValue && currentValue.dateValue && currentValue.amountValue;


    const nameChangeHandler = (e) => {
        dispatchValue({ type: 'NAME_INPUT_CHANGE', val: e.target.value });
    }

    const dateChangeHandler = (e) => {
        dispatchValue({ type: 'DATE_INPUT_CHANGE', val: e.target.value });
    }

    const amountChangeHandler = (e) => {
        dispatchValue({ type: 'AMOUNT_INPUT_CHANGE', val: e.target.value });
    }


    const submitHandler = (e) => {
        e.preventDefault();

        if (currentValue.nameValue && currentValue.dateValue && currentValue.amountValue) {
            const userExpenses = {
                userId: userCtx.idUser,
                expenseName: currentValue.nameValue,
                expenseDate: currentValue.dateValue,
                expenseAmount: currentValue.amountValue
            };


            ExpenseCtx.addItems(userExpenses);
            navigate('/dashboard');
        }

        dispatchValue({ type: 'NAME_INPUT_CHANGE', val: '' });
        dispatchValue({ type: 'DATE_INPUT_CHANGE', val: '' });
        dispatchValue({ type: 'AMOUNT_INPUT_CHANGE', val: '' });
    }

    let currentDate = new Date();
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth() + 1;
    let yyyy = currentDate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    currentDate = yyyy + '-' + mm + '-' + dd;


    return (
        <div className={styles.form}>
            <h1>Add Expense</h1>
            <form className={styles.form__container} onSubmit={submitHandler}>
                <div className={styles.input__container}>
                    <Input labelFor='expense-name' label='Expense Name' input={{ type: 'text', onChange: nameChangeHandler, value: currentValue.nameValue }} />
                    <Input labelFor='expense-date' label='Date Of Expense' input={{ type: 'date', min: '2000-01-01', max: `${currentDate}`, onChange: dateChangeHandler, value: currentValue.dateValue }} />
                    <Input labelFor='expense-amount' label='Expense Amount' input={{ type: 'number', min: 0, step: 1, onChange: amountChangeHandler, value: currentValue.amountValue }} />
                </div>
                <div className={styles.button__container}>
                    <Button type='submit' className={!formIsValid ? classes['btn-secondary'] : ''}>Add Expense</Button>
                </div>
            </form>
        </div>
    );
}

export default ExpenseForm;