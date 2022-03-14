import { useState } from 'react';

import useOverallItems from '../../../hooks/use-overall-items';

import Calender from './ChartsForComparingExpenses/Calender';
import BarChart from './ChartsForComparingExpenses/AreaChart';
import DataFilterControl from './ChartsForComparingExpenses/DataFilterControl';
import ExpenseFilter from '../Filter/ExpenseFilter';

import styles from './CompareExpensesChart.module.css';


const CompareExpensesChart = () => {

    const currentDate = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const { yearList: yearArray } = useOverallItems();

    const [filteredYear, setFilteredYear] = useState(currentDate.getFullYear());

    const filterYearChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
    }


    const y = window.matchMedia("(max-width: 992px)");


    return (
        <div className={styles.chart__container}>
            <div>
                <h1>Compare Your Daily Expenses: </h1>
                <ExpenseFilter onChangeFilter={filterYearChangeHandler} className={styles.expense__filter} data={{ defaultValue: `${month[currentDate.getFullYear()]}`, items: yearArray, title: 'Year' }} />
                {!y.matches && <Calender selectedYear={filteredYear} />}
                {!y.matches && <h1>Expense Details:</h1>}
                <div className={styles['item-container']}>
                    <DataFilterControl selectedYear={filteredYear} />
                </div>
            </div>
            <div>
                <h1>Compare Your Yearly Expenses:</h1>
                <div className={styles['single-plot']}>
                    <BarChart />
                </div>
            </div>
        </div>
    );
};

export default CompareExpensesChart;