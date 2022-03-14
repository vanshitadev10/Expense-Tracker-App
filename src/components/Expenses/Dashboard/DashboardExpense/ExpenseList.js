import useMonthItems from '../../../../hooks/use-month-items';

import ExpenseItem from './ExpenseItem';
import styles from './ExpenseList.module.css';


const ExpenseList = (props) => {

    const { currentItems: currentMonthItems } = useMonthItems(props.selectedMonth);

    if (currentMonthItems.length === 0) {
        return <h2 className={styles['expense-list__fallback']}>No Expenses In This Month</h2>;
    }


    return (
        <ul className={styles['expense-list']}>
            {currentMonthItems.map((expense) =>
                <ExpenseItem
                    key={expense.id}
                    title={expense.expenseName}
                    amount={expense.expenseAmount}
                    date={expense.expenseDate}
                />
            )}
        </ul>
    );
};

export default ExpenseList;