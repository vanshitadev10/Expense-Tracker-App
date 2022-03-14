import { Chart } from 'react-google-charts';

import useDaysItems from '../../../../hooks/use-days-items';


const Calender = (props) => {

    const { itemList: data } = useDaysItems(props.selectedYear);


    const options = {
        hAxis: {
            title: "Date",
        },

        vAxis: {
            title: "Amount Spent"
        },

        title: `${props.selectedYear}`,
        calendar: {
            cellSize: 26,
            unusedMonthOutlineColor: {
                stroke: '#000',
                strokeOpacity: 0.2,
                strokeWidth: 1
            },
            underMonthSpace: 16,
        },
        colorAxis: {
            minValue: 0,
            colors: ['#ffe7c6', '#ff9100']
        }
    };


    return (
        <Chart
            chartType="Calendar"
            width="100%"
            height="300px"
            data={data}
            options={options}
        />
    );
};

export default Calender;