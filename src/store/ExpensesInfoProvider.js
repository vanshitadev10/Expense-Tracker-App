import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import ExpensesInfoContext from './expenses-info-context';


const initialState = {
    expenses: [],
    isLoading: false,
    error: null,
    lengthSet: 0
};

const expenseInfoReducer = (state, action) => {

    if (action.type === 'EXPENSES_CHANGE') {
        return {
            expenses: action.exps,
            isLoading: state.isLoading,
            error: state.error,
            lengthSet: state.lengthSet,
        }
    }

    if (action.type === 'LOADING_STATE_CHANGE') {
        return {
            expenses: state.expenses,
            isLoading: action.bool,
            error: state.error,
            lengthSet: state.lengthSet,
        }
    }

    if (action.type === 'SET_ERROR') {
        return {
            expenses: state.expenses,
            isLoading: state.isLoading,
            error: action.err,
            lengthSet: state.lengthSet,
        }
    }

    if (action.type === 'LENGTH_CHANGE') {
        return {
            expenses: state.expenses,
            isLoading: state.isLoading,
            error: state.error,
            lengthSet: action.setLength,
        }
    }

    return initialState;
};


const ExpensesInfoProvider = (props) => {

    const [currentValue, dispatchValue] = useReducer(expenseInfoReducer, initialState);



    async function setItems(userData) {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            const response = await fetch('https://expense-tracker-54c98-default-rtdb.firebaseio.com/expenses.json', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatchValue({ type: 'LENGTH_CHANGE', setLength: currentValue.lengthSet + 1 });

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    }



    async function fetchItems() {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            const response = await fetch('https://expense-tracker-54c98-default-rtdb.firebaseio.com/expenses.json');

            const data = await response.json();
            const loadExpenses = [];

            for (const key in data) {
                loadExpenses.push({
                    id: key,
                    expenseName: data[key].expenseName,
                    expenseDate: data[key].expenseDate,
                    expenseAmount: data[key].expenseAmount,
                    userId: data[key].userId
                });
            };

            dispatchValue({ type: 'EXPENSES_CHANGE', exps: loadExpenses });

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    }



    async function deleteItems(item) {
        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: true });
        dispatchValue({ type: 'SET_ERROR', err: null });

        try {
            const response = await fetch('https://expense-tracker-54c98-default-rtdb.firebaseio.com/expenses' + `/${item}` + '.json', {
                method: 'DELETE',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            dispatchValue({ type: 'LENGTH_CHANGE', setLength: currentValue.lengthSet - 1 });

        } catch (error) {
            dispatchValue({ type: 'SET_ERROR', err: error.message });
        }

        dispatchValue({ type: 'LOADING_STATE_CHANGE', bool: false });
    }




    const navigate = useNavigate();
    useEffect(() => {
        if (currentValue.error !== null) {
            navigate('/error');
        }
    }, [currentValue.error]);


    useEffect(() => {
        fetchItems();
    }, [currentValue.lengthSet]);



    const expensesInformation = {
        items: currentValue.expenses,
        itemsLength: currentValue.lengthSet,
        hasError: currentValue.error,
        loading: currentValue.isLoading,
        addItems: setItems,
        getItems: fetchItems,
        deleteItem: deleteItems
    }



    return <ExpensesInfoContext.Provider value={expensesInformation}>
        {props.children}
    </ExpensesInfoContext.Provider>;
}

export default ExpensesInfoProvider;
