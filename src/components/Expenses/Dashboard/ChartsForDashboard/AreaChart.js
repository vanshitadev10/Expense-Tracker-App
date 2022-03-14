import { Chart } from 'react-google-charts';

import useYearItems from '../../../../hooks/use-year-items';


const AreaChart = () => {

    const currentDate = new Date();

    const { itemList: data } = useYearItems();

    const options = {
        hAxis: {
            title: "Date",
        },

        vAxis: {
            title: "Amount Spent"
        },

        title: `${currentDate.getFullYear()}`,
        curveType: "function",
        legend: { position: "none" },
        series: [{ color: "#ff9100" }],
        lineWidth: 4,
        pointSize: 5,
        animation: {
            startup: true,
            easing: 'inAndOut',
            duration: 1000,
        },
    };


    return (
        <Chart
            chartType="SteppedAreaChart"
            width="98%"
            height="400px"
            data={data}
            options={options}
            legendToggle
        />
    );
};

export default AreaChart;