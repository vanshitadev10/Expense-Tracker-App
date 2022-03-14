import styles from './ExpenseFilter.module.css';


const ExpenseFilter = (props) => {

    const dropdownChangeHandler = (event) => {
        props.onChangeFilter(event.target.value);
    }

    
    return (
        <div className={`${styles['expense-filter__container']} ${props.className}`}>
            <label>Filter By {props.data.title}:</label>
            <select className={styles['expense-filter']} onChange={dropdownChangeHandler}>
                <option key={0} defaultValue={props.data.defaultValue}>select</option>
                {props.data.items.map((data) => {
                    return <option key={data} value={`${data}`}>{data}</option>
                })}
            </select>
        </div>
    );
};

export default ExpenseFilter;