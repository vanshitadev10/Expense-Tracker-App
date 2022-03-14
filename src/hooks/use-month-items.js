import { useContext } from 'react';

import UserInfoContext from '../store/user-info-context';
import ExpensesInfoContext from '../store/expenses-info-context';


const useMonthItems = (selectedMonth) => {

    const userCtx = useContext(UserInfoContext);
    const expenseCtx = useContext(ExpensesInfoContext);


    const currentDate = new Date();

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const monthNames = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };

    const daysOfYear = {};
    let count = 0;
    for (var i = 1; i < 13; i++) {
        for (var j = 1; j < 32; j++) {
            count++;
            daysOfYear[`${j} ${monthNames[i]}`] = count;
        }
    }



    const data = [["x", "amount"]];

    for (let i = 1; i < 32; i++) {
        data[i] = [`${i}`, 0];
    }

    let totalItems = [];
    let currentMonthItems = [];
    let finalItemList = [];

    for (let i = 0; i < 31; i++) {
        finalItemList[i] = [`${i}`, 0];
    }

    if (expenseCtx.items.length) {
        totalItems = expenseCtx.items.filter((item) => item.userId === userCtx.idUser);
        currentMonthItems = totalItems.filter((item) => ((month[(new Date(item.expenseDate).getMonth())] === selectedMonth) && (new Date(item.expenseDate).getFullYear() === currentDate.getFullYear())));


        for (let i = 0; i < currentMonthItems.length; i++) {
            let myDate = new Date(currentMonthItems[i].expenseDate);
            finalItemList[myDate.toLocaleString('en-US', { day: 'numeric' })][1] += parseInt(currentMonthItems[i].expenseAmount);
        }
    }

    for (let j = 0; j < currentMonthItems.length; j++) {
        let myDate = new Date(currentMonthItems[j].expenseDate);
        data[myDate.getDate()] = [`${myDate.getDate()}`, parseInt(finalItemList[myDate.toLocaleString('en-US', { day: 'numeric' })][1])]
    }


    currentMonthItems.sort((a, b) => {
        return daysOfYear[`${new Date(a.expenseDate).getDate()} ${month[(new Date(a.expenseDate).getMonth())]}`] - daysOfYear[`${new Date(b.expenseDate).getDate()} ${month[(new Date(b.expenseDate).getMonth())]}`];
    });


    return {
        itemList: data,
        currentItems: currentMonthItems
    };
};

export default useMonthItems;