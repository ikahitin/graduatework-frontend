import Header from "./Header";
import React, {useState} from "react";
import {loginUser, registerUser} from "../utils/auth";
import {NavLink} from "react-router-dom";

export default function NavHeader() {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async e => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
        if ('access_token' in response) {
            localStorage.setItem('accessToken', response['access_token']);
            localStorage.setItem('user', JSON.stringify(response['user']));
            window.location.href = "";
        } else {
            alert("Failed", response.message, "error");
        }
    }

    const handleLogout = async e => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = "";
    }

    const handleRegister = async e => {
        e.preventDefault();
        const response = await registerUser({
            username,
            password
        });
        if (response.ok) {
            window.location.href = "";
        } else {
            alert("Failed", response.message, "error");
        }
    }

    function handleName(user) {
        user = JSON.parse(user);
        if ((user['first_name'] !== null) && (user['last_name'] !== null)) {
            return user['first_name'] + " " + user['last_name']
        } else {
            return "Профіль"
        }
    }

    return (
            <div className="intro">
                <div className="background"/>
                <div className="background gradient"/>
                <div className="background gradient2"/>
                <nav className="navbar navbar-expand-lg navbar-dark bg-transparent container">
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header pb-0">
                                    <div className="close-button">
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"/>
                                    </div>
                                    <h5 className="modal-title" id="exampleModalLabel">Увійти</h5>
                                </div>
                                <div className="modal-body">
                                    <form noValidate>
                                        <div className="mb-2 d-flex justify-content-center">
                                            <input type="text" className="form-control" id="login"
                                                   placeholder="Логін" onChange={e => setUserName(e.target.value)}/>
                                        </div>
                                        <div className="mb-2 d-flex justify-content-center">
                                            <input type="password" className="form-control" id="exampleInputPassword1"
                                                   placeholder="Пароль" onChange={e => setPassword(e.target.value)}/>
                                        </div>
                                        <div className="mb-2 d-flex justify-content-center">
                                            <div className="forgot-password">
                                                <a href="#">Забули пароль?</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer justify-content-center pt-0">
                                    <div className="mb-2 d-flex justify-content-center">
                                        <div className="buttons">
                                            <button type="submit" className="btn btn-blue btn-small"
                                                    onClick={handleLogin}>Увійти
                                            </button>
                                            <button type="submit" className="btn btn-blue btn-small"
                                                    data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                                                    data-bs-dismiss="modal">Зареєструватися
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="exampleModalToggle2" aria-hidden="true"
                         aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="close-button">
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"/>
                                    </div>
                                    <h5 className="modal-title" id="exampleModalToggleLabel2">Реєстрація</h5>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-2 d-flex justify-content-center">
                                            <input type="text" className="form-control"
                                                   id="specificSizeInputGroupUsername"
                                                   placeholder="Ваш e-mail"
                                                   onChange={e => setUserName(e.target.value)}/>
                                        </div>
                                        <div className="mb-2 d-flex justify-content-center">
                                            <input type="password" className="form-control" id="exampleInputPassword"
                                                   placeholder="Пароль"/>
                                        </div>
                                        <div className="mb-2 d-flex justify-content-center">
                                            <input type="password" className="form-control"
                                                   id="exampleInputPasswordRepeat" placeholder="Повторіть ваш пароль"
                                                   onChange={e => setPassword(e.target.value)}/>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer justify-content-center pt-0">
                                    <div className="mb-2 d-flex justify-content-center">
                                        <div className="buttons">
                                            <button type="submit" className="btn btn-blue btn-small"
                                                    onClick={handleRegister}>Зареєструватися
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <ul className="navbar-nav mb-2 mb-lg-0 additional">
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" to="/booking/apartments">
                                    <img src={`${process.env.PUBLIC_URL}/logo.png`}
                                         alt="logo" className="logo"/>
                                </NavLink>
                            </li>
                        </ul>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse text-white justify-content-end"
                             id="navbarTogglerDemo02">
                            <ul className="navbar-nav mb-2 mb-lg-0 additional align-items-center">
                                <li className="nav-item">
                                    <div className="btn-group lang-control">
                                        <button className="btn btn-transparent btn-sm dropdown-toggle text-white lang"
                                                type="button"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                            УКР
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">ENG</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="form-check form-switch">
                                        <input type="checkbox" id="theme-switch"/>
                                        <label className="switch" htmlFor="theme-switch">
                                            <div className="input-slider round">
                                                <img src={`${process.env.PUBLIC_URL}/light_theme.svg`}
                                                     alt="light theme switch" className="input-slider-img"/>
                                            </div>
                                        </label>
                                    </div>
                                </li>
                                {token ?
                                    <li className="nav-item login">
                                        <button className="nav-link profile-btn text-white" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{handleName(user)}</button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><NavLink to="profile/edit" className="dropdown-item" href="#">
                                                <img src={`${process.env.PUBLIC_URL}/bi_person-fill.svg`} alt="profile"/>
                                                Керування акаунтом
                                            </NavLink></li>
                                            <li><NavLink to="profile/trips" className="dropdown-item" href="#">
                                                <img src={`${process.env.PUBLIC_URL}/trips.svg`} alt="trips"/>
                                                Поїздки
                                            </NavLink></li>
                                            <li><NavLink to="profile/favoutite" className="dropdown-item" href="#">
                                                <img src={`${process.env.PUBLIC_URL}/heart.svg`} alt="heart"/>
                                                Збережене
                                            </NavLink></li>
                                            <li><a className="dropdown-item" href="#" onClick={handleLogout}>
                                                <img src={`${process.env.PUBLIC_URL}/logout.svg`} alt="logout"/>
                                                Вийти
                                            </a></li>
                                        </ul>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <button className="nav-link login-btn text-white" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal">Увійти в аккаунт
                                        </button>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <Header />
        </div>
    )
}