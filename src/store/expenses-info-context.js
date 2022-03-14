import React from 'react';


const ExpensesInfoContext = React.createContext({
    items: [],
    itemsLength: 0,
    hasError: null,
    loading: null,
    addItems: (item) => { },
    getItems: (item) => { },
    deleteItem: (item) => { }
})

export default ExpensesInfoContext;