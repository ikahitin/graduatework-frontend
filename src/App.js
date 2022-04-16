import './App.css';
import React, {useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Apartment from "./components/Apartment";


function ComponentB() {
    return (
        <div className="text-white">
            <p>b component</p>
        </div>
    );
}
async function loginUser(credentials) {
    return fetch('http://127.0.0.1:8000/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}
async function registerUser(credentials) {
    credentials.email = credentials.username;
    delete credentials.username;
    return fetch('http://127.0.0.1:8000/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}
function App() {
    const [tabIndex, setTabIndex] = useState(0);
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

    const handleRegister = async e => {
        e.preventDefault();
        const response = await registerUser({
            username,
            password
        });
        console.log(response)
        if (response.ok) {
            window.location.href = "";
        } else {
            alert("Failed", response.message, "error");
        }
    }

    function handleName (user) {
        user = JSON.parse(user);
        if ((user['first_name'] !== null) && (user['last_name'] !== null)) {
            return user['first_name'] + " " + user['last_name']
        }
        else {
            return "Профіль"
        }
    }

    return (
        <div className="App">
            <div className="background"/>
            <div className="background gradient"/>
            <div className="background gradient2"/>
            <div className="intro">
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
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Пароль" onChange={e => setPassword(e.target.value)}/>
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
                                        <button type="submit" className="btn btn-blue btn-small" onClick={handleLogin}>Увійти</button>
                                        <button type="submit" className="btn btn-blue btn-small" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Зареєструватися</button>
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
                                        <input type="text" className="form-control" id="specificSizeInputGroupUsername"
                                               placeholder="Ваш e-mail" onChange={e => setUserName(e.target.value)}/>
                                    </div>
                                    <div className="mb-2 d-flex justify-content-center">
                                        <input type="password" className="form-control" id="exampleInputPassword" placeholder="Пароль"/>
                                    </div>
                                    <div className="mb-2 d-flex justify-content-center">
                                        <input type="password" className="form-control" id="exampleInputPasswordRepeat" placeholder="Повторіть ваш пароль" onChange={e => setPassword(e.target.value)}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer justify-content-center pt-0">
                                <div className="mb-2 d-flex justify-content-center">
                                    <div className="buttons">
                                        <button type="submit" className="btn btn-blue btn-small" onClick={handleRegister}>Зареєструватися</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-transparent container mt-4">
                    <div className="container-fluid">
                        <ul className="navbar-nav mb-2 mb-lg-0 additional">
                            <li className="nav-item">
                                <a className="nav-link text-white" aria-current="page" href="#">Logo</a>
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
                                        <div className="btn-group">
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
                                                <img src={"./light_theme.svg"} alt="light theme switch" className="input-slider-img"/>
                                            </div>
                                        </label>
                                    </div>
                                </li>
                                {token ?
                                    <li className="nav-item login">
                                        <button className="nav-link profile-btn text-white">{handleName(user)}</button>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <button className="nav-link login-btn text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Увійти в аккаунт</button>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <header className="App-header">
                    <h2>Подорожуй зручно по Україні</h2>
                    <span className="subtext">Досліджуй нові місця та насолоджуйся
                    красою нашої країни</span>
                    <div className="ukraine"/>
                </header>
            </div>
            <div className="section container">
                <div className="section-nav">
                    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                        <TabList className="nav nav-pills">
                            <Tab className="nav-item">
                                <button className="nav-link" aria-current="page">
                                    <div className="nav-icon house"/>
                                    <span>Житло</span>
                                </button>
                            </Tab>
                            <Tab className="nav-item">
                                <button className="nav-item nav-link">
                                    <div className="nav-icon car"/>
                                    <span>Оренда автомобіля</span>
                                </button>
                            </Tab>
                            <Tab className="nav-item">
                                <button className="nav-link">
                                    <div className="nav-icon taxi"/>
                                    <span>Таксі</span>
                                </button>
                            </Tab>
                            <Tab className="nav-item">
                                <button className="nav-link">
                                    <div className="nav-icon travel"/>
                                    <span>Відпочинок за обміном</span>
                                </button>
                            </Tab>
                            <Tab className="nav-item">
                                <button className="nav-link">
                                    <div className="nav-icon event"/>
                                    <span>Івенти</span>
                                </button>
                            </Tab>
                        </TabList>
                        <TabPanel><Apartment/></TabPanel>
                        <TabPanel><ComponentB/></TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                    </Tabs>
                </div>
            </div>
            <footer className="container d-flex col-10">
                <div className="col-3">
                    <p className="h-text">Підтримка</p>
                    <a href="#"><p>Довідковий центр</p></a>
                    <a href="#"><p>Інформація щодо безпеки</p></a>
                        <a href="#"><p>Варіанти скасування бронювань</p></a>
                            <a href="#"><p>Наші заходи у зв’язку з COVID</p></a>
                </div>
                <div className="col-3">
                    <p className="h-text">Відомості </p>
                        <a href="#"><p>Докладніше про нові функції</p></a>
                            <a href="#"><p>Лист від наших засновників</p></a>
                                <a href="#"><p>Інвестори</p></a>
                </div>
                <div className="col-3">
                    <p className="h-text">Меню </p>
                    <a href="#"><p>Додати свій об’єкт</p></a>
                    <a href="#"><p>Зареєструватися</p></a>
                    <a href="#"><p>Увійти в аккаунт</p></a>
                </div>
                <div className="col-3">
                    <p className="h-text">Функції </p>
                    <a href="#"><p>Житло</p></a>
                        <a href="#"><p>Оренда автомобіля</p></a>
                            <a href="#"><p>Таксі</p></a>
                                <a href="#"><p>Відпочинок за обміном</p></a>
                                   <p>Івенти</p>
                </div>
                <div className="container col-12 sub-f">
                    <div className="copyright col-6">
                        Copyright © 2022 Name of company™. Всі права захищені.
                    </div>
                    <div className="social-links col-3">
                        <ul className="navbar-nav">
                            <li className="nav-item p-0">
                                <a href="#">
                                    <img src={"./globe_dark.svg"} alt=""/>
                                    <span>ENG</span>
                                </a>
                            </li>
                            <li className="nav-item p-0">
                                <a href="#"><img src={"./insta_dark.svg"} alt=""/></a>
                            </li>
                            <li className="nav-item p-0">
                                <a href="#"><img src={"./facebook_dark.svg"} alt=""/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
