import ExpenseDate from './ExpenseDate';

import styles from './ExpenseItem.module.css';


const ExpenseItem = (props) => {
    return (
        <div className={styles.expense__details}>
            <div className={styles.expense__date}>
                <ExpenseDate date={props.date} />
            </div>
            <div className={`${styles.expenses} ${styles.expense__title}`}>
                <h3>
                    {props.title}
                </h3>
            </div>
            <div className={`${styles.expenses} ${styles.expense__amount}`}>
                <p>
                    Rs. {props.amount}
                </p>
            </div >
        </div >
    );
};

export default ExpenseItem;