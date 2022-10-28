import styles from "./Form.module.css"
import { Form as FinalForm, Field } from "react-final-form"
import {composeValidators, isValidLogin, required} from "./Validators";

export type FormData = {
    login: string;
    password: string;
}

type FormProps = {
    onSubmit: (data: FormData) => void;
}

export default function LoginForm({onSubmit}: FormProps) {

    const submitHandler = (data: FormData) => {
        onSubmit(data);
    };

    return <>
        <h3>Авторизация</h3>
        <FinalForm
            onSubmit = {submitHandler}
            render ={({handleSubmit}) =>
            <form onSubmit={handleSubmit}>
                <Field
                    name="login"
                    validate={composeValidators(required, isValidLogin)}
                    render={({input,meta}) =>(<>
                    <div><label>
                        Логин:
                        <input {...input} />
                    </label></div>
                    {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </>)} />
                <Field
                    name="password"
                    validate={required}
                    render={({input,meta}) =>(<>
                    <div><label>
                        Пароль:
                        <input {...input} type="password" />
                    </label></div>
                    {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </>)} />
                <button type="submit">Отправить</button>
            </form>
        }/>
    </>;
}