import React from "react";
import {NavLink} from "react-router-dom";

export default function Footer() {
    return(
        <footer className="container d-flex col-10">
            <div className="col-3">
                <p className="h-text">Підтримка</p>
                <NavLink to="#"><p>Довідковий центр</p></NavLink>
                <NavLink to="#"><p>Інформація щодо безпеки</p></NavLink>
                <NavLink to="#"><p>Варіанти скасування бронювань</p></NavLink>
                <NavLink to="#"><p>Наші заходи у зв’язку з COVID</p></NavLink>
            </div>
            <div className="col-3">
                <p className="h-text">Відомості </p>
                <NavLink to="#"><p>Докладніше про нові функції</p></NavLink>
                <NavLink to="#"><p>Лист від наших засновників</p></NavLink>
                <NavLink to="#"><p>Інвестори</p></NavLink>
            </div>
            <div className="col-3">
                <p className="h-text">Меню </p>
                <NavLink to="#"><p>Додати свій об’єкт</p></NavLink>
                <NavLink to="#"><p>Зареєструватися</p></NavLink>
                <NavLink to="#"><p>Увійти в аккаунт</p></NavLink>
            </div>
            <div className="col-3">
                <p className="h-text">Функції </p>
                <NavLink to='/booking/apartments'><p>Житло</p></NavLink>
                <NavLink to='/booking/car'><p>Оренда автомобіля</p></NavLink>
                <NavLink to='/booking/taxi'><p>Таксі</p></NavLink>
                <NavLink to='/booking/vacation'><p>Відпочинок за обміном</p></NavLink>
            </div>
            <div className="container col-12 sub-f">
                <div className="copyright col-6">
                    Copyright © 2022 Name of company™. Всі права захищені.
                </div>
                <div className="social-links col-3">
                    <ul className="navbar-nav">
                        <li className="nav-item p-0">
                            <NavLink to="#">
                                <img src={`${process.env.PUBLIC_URL}/globe_dark.svg`} alt=""/>
                                <span>ENG</span>
                            </NavLink>
                        </li>
                        <li className="nav-item p-0">
                            <NavLink to="#"><img src={`${process.env.PUBLIC_URL}/insta_dark.svg`} alt=""/></NavLink>
                        </li>
                        <li className="nav-item p-0">
                            <NavLink to="#"><img src={`${process.env.PUBLIC_URL}/facebook_dark.svg`} alt=""/></NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}