import React from "react";

export default function Footer() {
    return(
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
                                <img src={`${process.env.PUBLIC_URL}/globe_dark.svg`} alt=""/>
                                <span>ENG</span>
                            </a>
                        </li>
                        <li className="nav-item p-0">
                            <a href="#"><img src={`${process.env.PUBLIC_URL}/insta_dark.svg`} alt=""/></a>
                        </li>
                        <li className="nav-item p-0">
                            <a href="#"><img src={`${process.env.PUBLIC_URL}/facebook_dark.svg`} alt=""/></a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}