import React from 'react';
import {Outlet, Link} from "react-router-dom";

const Layout = () => {
    return <>
        <nav>
            <ul>
                <li>
                    <Link to="/">Главная страница</Link>
                </li>
                <li>
                    <Link to="/registration">Регистрация</Link>
                </li>
                <li>
                    <Link to="/login">Авторизация</Link>
                </li>
                <li>
                    <Link to="/task/1">Task 1</Link>
                </li>
                <li>
                    <Link to="/task/2">Task 2</Link>
                </li>
                <li>
                    <Link to="/task/3">Task 3</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
    </>;
}

export default Layout;