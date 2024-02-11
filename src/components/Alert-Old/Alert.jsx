import css from './Alert.module.css';
import clsx from "clsx";

export const Alert = ({ variant, outlined, elevated, children }) => {
    const clickTest = () => {
        console.log("Alert")
    }
    return (
        <p  className={clsx(css[variant], {
            [css.isOutlined]: outlined,
            [css.isElevated]: elevated,
        })}
            onClick={clickTest}
        >
            {children}
        </p>
    );
};
