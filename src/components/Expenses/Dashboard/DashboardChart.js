import { useState } from 'react';

import useYearItems from '../../../hooks/use-year-items';

import Expenses from './DashboardExpense/Expenses';
import CurveChart from './ChartsForDashboard/CurveChart';
import LineChart from './ChartsForDashboard/LineChart';
import PieChart from './ChartsForDashboard/PieChart';
import BarChart from './ChartsForDashboard/AreaChart';

import styles from './DashboardChart.module.css';


const DashboardChart = () => {

    const { finalData: data } = useYearItems();

    const currentDate = new Date();

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [clickedMonth, setClickedMonth] = useState(`${month[currentDate.getMonth()]}`);

    const monthChangeHandler = (event) => {
        setClickedMonth(event.target.value);
    }

    return (
        <div className={styles.chart__container}>
            <div>
                <h1>Current Month Expenses: </h1>
                <CurveChart />
            </div>
            <div>
                <Expenses />
            </div>
            <div>
                <h1>Your Daily Expenses:</h1>
                <ul className={styles.button__list}>
                    {data.map((item) => <li key={`${item.mon}`}><button value={`${item.mon}`} className={!item.val ? styles.btn__disabled : ''} onClick={item.val ? monthChangeHandler : ''}>{item.mon}</button></li>)}
                </ul>
                <div className={styles.charts__months}>
                    <div>
                        <LineChart selectedMonth={clickedMonth} />
                    </div>
                    <div>
                        <PieChart selectedMonth={clickedMonth} />
                    </div>
                </div>
            </div>
            <div>
                <h1>Your Monthly Expenses:</h1>
                <div className={styles['single-plot']}>
                    <BarChart />
                </div>
            </div>
        </div>
    );
};

export default DashboardChart;