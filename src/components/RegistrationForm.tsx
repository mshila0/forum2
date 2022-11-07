import styles from "./Form.module.css"
import { Form as FinalForm, Field } from "react-final-form"
import {composeValidators, isValidLogin, required} from "./Validators";
import React, {FormEvent, useState} from "react";
import {Post, PostInfo} from "./views/TaskPage";
import spinner from "./views/spin.gif";

const URL = "http://localhost:3001";

export type FormData = {
    login: string;
    password: string;
}

type Result = {
    userId: string;
    id: string;
    title: string;
    body: string;
} | undefined;

type FormProps = {
    onSubmit: (data: FormData) => void;
}

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
            const response = await fetch(`${URL}/user`, {
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
        <h3>Регистарция</h3>
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
                        <input {...input} type="password"/>
                    </label></div>
                    {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </>)} />
                <Field
                    name="passwordRepeat"
                    validate={required}
                    render={({input,meta}) =>(<>
                        <div><label>
                            Повторите пароль:
                            <input {...input} type="password"  className="p2"/>
                        </label></div>
                        {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </>)} />
                <button type="submit">Отправить</button>
            </form>
        }/>
    </>;
}