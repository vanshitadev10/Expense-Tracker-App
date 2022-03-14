import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

import useMonthItems from '../../../../hooks/use-month-items';


const PieChart = (props) => {

    const [newWidth, setNewWidth] = useState('40vw');

    const currentDate = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const { itemList: data } = useMonthItems(props.selectedMonth ? props.selectedMonth : month[currentDate.getMonth()]);

    const options = {

        title: `${props.selectedMonth}`,
        animation: {
            startup: true,
            easing: 'inAndOut',
            duration: 1000,
        },
        is3D: true,
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
            chartType="PieChart"
            width={newWidth}
            height="400px"
            data={data}
            options={options}
        />
    );
};

export default PieChart;