import { useState } from 'react';
import useDaysItems from '../../../../hooks/use-days-items';

import Button from '../../../UI/Button/Button'
import styles from './DataFilterControl.module.css';


const DataFilterControl = (props) => {

    const [itemToDelete, setItemToDelete] = useState(null);

    const { filterList: data } = useDaysItems(props.selectedYear, itemToDelete);

    for (var i = 0; i < data.length; i++) {
        if (data[i].expAmount === 'null/-') {
            data[i].expAmount = null;
            data[i].expDate = null;
            data[i].expName = 'No Expense Found In This Year';
        }
    }


    const text = 'Do you really want to delete this expense?';
    const deleteHandler = (userId) => {
        if (window.confirm(text) == true) {
            setItemToDelete(userId);
        }
    }

    return (
        <ul className={styles['data-container']}>
            {data.map((item) =>
                <li key={`${item.expId}`} className={item.expAmount ? styles['data-list'] : styles['no-data']}>
                    <ul className={item.expAmount ? styles.data__item : styles['no-data']}>
                        <li>{item.expDate}</li>
                        <li>{item.expName}</li>
                        <li>{item.expAmount}</li>
                        {item.expAmount && <Button onClick={deleteHandler.bind(this, item.expId)}>Delete</Button>}
                    </ul>
                </li>
            )}
        </ul>
    );
};

export default DataFilterControl;