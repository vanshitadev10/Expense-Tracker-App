import { useContext } from 'react';
import DashboardChart from './DashboardChart';

import UserInfoContext from '../../../store/user-info-context';
import styles from './Dashboard.module.css';


const Dashboard = () => {

    const userCtx = useContext(UserInfoContext);

    return (
        <div className={styles.dashboard__container}>
            <h1 className={styles.welcome}>
                Hello {userCtx.nameUser},
            </h1>
            <DashboardChart />
        </div>
    );
};

export default Dashboard;