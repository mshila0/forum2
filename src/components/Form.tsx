import styles from "./Form.module.css"
import { Form as FinalForm, Field } from "react-final-form"

export type FormData = {
    login: string;
    password: string;
}

type FormProps = {
    onSubmit: (data: FormData) => void;
}

const required = (value: string) => (value? undefined : 'Поле обязательно')
const isValidLogin = (value:string) => {
    if (!/^[a-z0-9]{6,20}$/.test(value)) {
        return "Логин должен содержать латинские буквы и цифры и содержать от 6 до 20 символов";
    }
}

const composeValidators = (...validators: any[]) => (value: string) =>
    validators.reduce((error, validator) => error || validator(value), undefined)

export default function Form({onSubmit}: FormProps) {

    const submitHandler = (data: FormData) => {
        onSubmit(data);
    };

    return <>
        <FinalForm
            onSubmit = {submitHandler}
            render ={({handleSubmit}) =>
            <form onSubmit={handleSubmit}>
                <Field
                    name="login"
                    validate={composeValidators(required, isValidLogin)}
                    render={({input,meta}) =>(<>
                    <label>
                        Логин:
                        <input {...input} />
                    </label>
                    {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </>)} />
                <Field
                    name="password"
                    validate={required}
                    render={({input,meta}) =>(<>
                    <label>
                        Пароль:
                        <input {...input} type="password" />
                    </label>
                    {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </>)} />
                <button type="submit">Отправить</button>
            </form>
        }/>
    </>;
}