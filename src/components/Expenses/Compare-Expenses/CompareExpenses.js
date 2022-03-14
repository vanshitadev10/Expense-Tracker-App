import CompareExpensesChart from './CompareExpensesChart';

import styles from './CompareExpenses.module.css';


const CompareExpenses = () => {

    return (
        <div className={styles.comparison__container}>
            <CompareExpensesChart />
        </div>
    );
};

export default CompareExpenses;