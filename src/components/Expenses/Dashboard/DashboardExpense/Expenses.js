import { useState } from 'react';

import useYearItems from '../../../../hooks/use-year-items';

import ExpenseFilter from '../../Filter/ExpenseFilter';
import ExpenseList from './ExpenseList';
import styles from './Expenses.module.css';


const Expenses = () => {

    const currentDate = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const { dataList: data } = useYearItems();

    const [filteredMonth, setFilteredMonth] = useState(`${month[currentDate.getMonth()]}`);

    const filterChangeHandler = (selectedMonth) => {
        setFilteredMonth(selectedMonth);
    }


    return (
        <div className={styles.expense__container}>
            <h1>List Of Expenses:</h1>
            <ExpenseFilter onChangeFilter={filterChangeHandler} className={styles.expense__filter} data={{ defaultValue: `${month[currentDate.getMonth()]}`, items: data, title: 'Month' }} />
            <div className={styles.expense__list}>
                <ExpenseList selectedMonth={filteredMonth} />
            </div>
        </div>
    );
};

export default Expenses;