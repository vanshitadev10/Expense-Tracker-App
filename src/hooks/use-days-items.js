import { useContext, useEffect } from 'react';

import UserInfoContext from '../store/user-info-context';
import ExpensesInfoContext from '../store/expenses-info-context';


const useDaysItems = (selectedYear, deleteItem) => {

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



    useEffect(() => {
        if (deleteItem) {
            for (var i = 0; i < expenseCtx.items.length; i++) {
                if (expenseCtx.items[i].id === deleteItem) {
                    expenseCtx.deleteItem(deleteItem);
                }
            }
        }
    }, [deleteItem]);



    const data = [
        [
            {
                type: "date",
                id: "Date",
            },
            {
                type: "number",
                id: "Won/Loss",
            },
        ]
    ];



    let totalItems = [];
    let finalItems = [];
    let yearArray = [];
    let YearList = [];
    let leastYear = 2000;
    const filterData = [];


    if (expenseCtx.items.length) {
        totalItems = expenseCtx.items.filter((item) => item.userId === userCtx.idUser);

        for (let i = 0; i < totalItems.length; i++) {
            let myDate = new Date(totalItems[i].expenseDate);
            YearList[i] = myDate.getFullYear();
        }



        leastYear = parseInt(currentDate.getFullYear());
        for (let j = 0; j < totalItems.length; j++) {
            if (parseInt(totalItems[j].expenseDate.substring(0, 4)) < leastYear) {
                leastYear = parseInt(totalItems[j].expenseDate.substring(0, 4))
            }
        }
        let num = leastYear;
        for (let i = 0; i <= (currentDate.getFullYear() - leastYear); i++) {
            yearArray[i] = num;
            num++;
        }
        const preFinalData = yearArray.filter((item) => !YearList.includes(item));
        const finalData = [];
        for (var i = 0; i < preFinalData.length; i++) {
            finalData[i] = { expenseDate: `${preFinalData[i]}-01-01`, expenseAmount: 'null' };
        }
        totalItems = totalItems.concat(finalData);



        finalItems = totalItems.filter((item) => (new Date(item.expenseDate).getFullYear() === parseInt(selectedYear)));

        for (let i = 0; i < (finalItems.length); i++) {
            let myDate = new Date(finalItems[i].expenseDate);

            let sum = parseInt(finalItems[i].expenseAmount);
            for (let j = 0; j < i; j++) {
                if (finalItems[j].expenseDate === finalItems[i].expenseDate) {
                    sum += parseInt(finalItems[j].expenseAmount);
                }
            }
            data[i + 1] = [new Date(parseInt(myDate.getFullYear()), parseInt(myDate.getMonth()), parseInt(myDate.getDate())), sum];
            filterData[i] = { expId: `${finalItems[i].id}`, expDate: `${myDate.getDate()} ${month[myDate.getMonth()]}, ${myDate.getFullYear()}`, expName: `${finalItems[i].expenseName}`, expAmount: `${finalItems[i].expenseAmount}/-`, expDay: `${myDate.getDate()} ${month[myDate.getMonth()]}` };
        }

    }


    filterData.sort((a, b) => {
        return daysOfYear[a.expDay] - daysOfYear[b.expDay];
    });



    return {
        itemList: data,
        filterList: filterData
    };
};

export default useDaysItems;