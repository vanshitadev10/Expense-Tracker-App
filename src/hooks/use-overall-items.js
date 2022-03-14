import { useContext } from 'react';

import UserInfoContext from '../store/user-info-context';
import ExpensesInfoContext from '../store/expenses-info-context';


const useOverallItems = () => {

    const userCtx = useContext(UserInfoContext);
    const expenseCtx = useContext(ExpensesInfoContext);


    const currentDate = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const data = [["year", "amount"]];


    let totalItems = [];
    let finalItemList = [];
    let flag = 2000;
    let a = 0;
    while (flag <= parseInt(currentDate.getFullYear())) {
        finalItemList[a] = [`${flag}`, 0];
        flag++;
        a++;
    }


    let leastYear = 2000;
    let yearArray = [];

    if (expenseCtx.items.length) {
        totalItems = expenseCtx.items.filter((item) => item.userId === userCtx.idUser);

        leastYear = parseInt(currentDate.getFullYear());
        for (let j = 0; j < totalItems.length; j++) {
            if (parseInt(totalItems[j].expenseDate.substring(0, 4)) < leastYear) {
                leastYear = parseInt(totalItems[j].expenseDate.substring(0, 4))
            }
        }

        let num1 = leastYear;
        let num2 = leastYear;
        for (let i = 0; i <= (currentDate.getFullYear() - leastYear); i++) {
            yearArray[i] = num1;
            num1++;
        }

        for (let i = 1; i <= (parseInt(currentDate.getFullYear()) - leastYear + 1); i++) {
            data[i] = [`${num2}`, 0];
            num2++;
        }


        for (let i = 0; i < totalItems.length; i++) {
            let myDate = new Date(totalItems[i].expenseDate);
            if (parseInt(myDate.getFullYear()) < 2009) {
                finalItemList[parseInt(myDate.getFullYear().toString()[3])][1] += parseInt(totalItems[i].expenseAmount);
            } else {
                finalItemList[parseInt(`${myDate.getFullYear().toString()[2]}${myDate.getFullYear().toString()[3]}`)][1] += parseInt(totalItems[i].expenseAmount);
            }
        }

    }

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < finalItemList.length; j++) {
            if (data[i][0] === finalItemList[j][0]) {
                data[i][1] = finalItemList[j][1];
            }
        }
    }


    return {
        itemList: data,
        yearList: yearArray
    };
};

export default useOverallItems;