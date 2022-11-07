import styles from "./Form.module.css"
import { Form as FinalForm, Field } from "react-final-form"
import {composeValidators, isValidLogin, required} from "./Validators";
import {useState} from "react";

const URL = "http://localhost:3001";

export type FormData = {
    login: string;
    password: string;
}

type FormProps = {
    onSubmit: (data: FormData) => void;
}

type Result = {
    token: string;
} | undefined;

export default function LoginForm({onSubmit}: FormProps) {
    const [error, setError] = useState("");
    const [result, setResult] = useState<Result>();

    const submitHandler = async (data: FormData) => {
        onSubmit(data);

        try {
            const postData = {
                // данные из формы
                nickname: data.login,
                password: data.password
            };
            const response = await fetch(`${URL}/auth`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });
            const result = await response.json();
            setResult(result);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
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