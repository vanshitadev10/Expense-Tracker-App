import { useContext } from 'react';

import UserInfoContext from '../store/user-info-context';
import ExpensesInfoContext from '../store/expenses-info-context';


const useYearItems = () => {

    const userCtx = useContext(UserInfoContext);
    const expenseCtx = useContext(ExpensesInfoContext);


    const currentDate = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const monthNames = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    };


    const data = [["month", "amount"]];

    for (let i = 1; i < 13; i++) {
        data[i] = [`${month[i - 1]}`, 0];
    }

    let totalItems = [];
    let currentYearItems = [];
    let finalItemList = [['January', 0], ['Febraury', 0], ['March', 0], ['April', 0], ['May', 0], ['June', 0], ['July', 0], ['August', 0], ['September', 0], ['October', 0], ['November', 0], ['December', 0]];
    let dateArray = [];



    if (expenseCtx.items.length) {
        totalItems = expenseCtx.items.filter((item) => item.userId === userCtx.idUser);
        currentYearItems = totalItems.filter((item) => ((new Date(item.expenseDate).getFullYear() === currentDate.getFullYear())));


        for (let i = 0; i < currentYearItems.length; i++) {
            let myDate = new Date(currentYearItems[i].expenseDate);
            finalItemList[myDate.getMonth()][1] += parseInt(currentYearItems[i].expenseAmount);
        }


        // For Data List ((used in: Expense Filter page)
        for (let i = 0; i < currentYearItems.length; i++) {
            let myDate = new Date(currentYearItems[i].expenseDate);
            let count = 0;
            for (let j = 0; j < i; j++) {
                if (dateArray[j] === month[myDate.getMonth()]) {
                    count++;
                }
            }
            if (!count) {
                dateArray[i] = month[myDate.getMonth()];
            }
        }

        dateArray.sort((a, b) => {
            return monthNames[a] - monthNames[b];
        });

    }

    for (let j = 0; j < currentYearItems.length; j++) {
        let myDate = new Date(currentYearItems[j].expenseDate);
        data[(myDate.getMonth()) + 1] = [`${month[myDate.getMonth()]}`, parseInt(finalItemList[myDate.getMonth()][1])]
    }


    const array = [];
    for(let i=0; i<12; i++){
        let count = 0;
        for(let j=0; j<dateArray.length; j++){
            if(dateArray[j] === month[i]){
                count = 1;
            }
        }

        array[i] = {
            mon: month[i],
            val: count
        }
    }


    return {
        itemList: data,
        dataList: dateArray,
        finalData: array
    };
};

export default useYearItems;