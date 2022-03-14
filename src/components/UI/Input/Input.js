import styles from './Input.module.css';

const Input = props => {
    return (
        <div className={styles['input-container']}>
            <label htmlFor={props.labelFor}>{props.label}</label>
            <input className={props.className} {...props.input} required={true} />
        </div>
    );
};

export default Input;