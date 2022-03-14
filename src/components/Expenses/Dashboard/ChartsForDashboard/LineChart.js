import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import useMonthItems from '../../../../hooks/use-month-items';


const LineChart = (props) => {

    const [newWidth, setNewWidth] = useState('40vw');

    const currentDate = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const { itemList: data } = useMonthItems(props.selectedMonth ? props.selectedMonth : month[currentDate.getMonth()]);

    const options = {
        hAxis: {
            title: "Date",
        },

        vAxis: {
            title: "Amount Spent"
        },


        title: `${props.selectedMonth}`,
        legend: { position: "none" },
        colors: ['#ff9100'],
        pointSize: 3,
        lineWidth: 3,
        animation: {
            startup: true,
            easing: 'inAndOut',
            duration: 400,
        },
    };



    //  Making the chart responsive
    const x = window.matchMedia("(min-width: 992px) and (max-width: 1400px)");
    const y = window.matchMedia("(min-width: 0) and (max-width: 992px)");

    useEffect(() => {
        if (x.matches) {
            setNewWidth('40vw');
        }
        else if (y.matches) {
            setNewWidth('80vw');
        }
    }, [x, y]);



    return (
        <Chart
            chartType="LineChart"
            width={newWidth}
            height="400px"
            data={data}
            options={options}
        />
    );
};

export default LineChart;