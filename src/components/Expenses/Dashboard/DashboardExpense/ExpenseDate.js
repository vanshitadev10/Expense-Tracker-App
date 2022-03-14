import styles from './ExpenseDate.module.css';


const ExpenseDate = (props) => {

    let myDate = new Date(props.date);

    const day = myDate.toLocaleString('en-US', { day: 'numeric' });
    const month = myDate.toLocaleString('en-US', { month: 'long' });
    const year = myDate.toLocaleString('en-US', { year: 'numeric' });
    const weekday = myDate.toLocaleString('en-US', { weekday: 'long' });


    return (
        <div className={styles.expense__date}>
            <div>
                <p>{day}.</p>
                <p>({weekday})</p>
            </div>
            <p>{month}</p>
            <p>{year}</p>
        </div>
    );
};


export default ExpenseDate;