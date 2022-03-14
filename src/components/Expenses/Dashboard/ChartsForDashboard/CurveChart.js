import { Chart } from 'react-google-charts';

import useMonthItems from '../../../../hooks/use-month-items';


const CurveChart = () => {

    const currentDate = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const { itemList: data } = useMonthItems(month[currentDate.getMonth()]);

    const options = {
        hAxis: {
            title: "Date",
        },

        vAxis: {
            title: "Amount Spent"
        },

        title: `${month[currentDate.getMonth()]}`,
        curveType: "function",
        legend: { position: "none" },
        series: [{ color: "#ff9100" }],
        lineWidth: 4,
        pointSize: 6,
        animation: {
            startup: true,
            easing: 'inAndOut',
            duration: 1000,
        },
    };


    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="450px"
            data={data}
            options={options}
        />
    );
};

export default CurveChart;