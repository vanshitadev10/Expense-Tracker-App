import { Chart } from 'react-google-charts';

import useOverallItems from '../../../../hooks/use-overall-items';


const BarChart = () => {

    const currentDate = new Date();

    const { itemList: data } = useOverallItems();

    const options = {
        hAxis: {
            title: "Date",
        },

        vAxis: {
            title: "Amount Spent"
        },

        title: `${currentDate.getFullYear()}`,
        legend: { position: "none" },
        series: [{ color: "#ff9100" }],
        seriesType: "bars",
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
            chartType="ComboChart"
            width="98%"
            height="400px"
            data={data}
            options={options}
        />
    );
};

export default BarChart;