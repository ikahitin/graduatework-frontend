import React from "react";

export default function Filters() {
    return(
        <div>
            <div className="filter">
                <span className="f-title">Ваш бюджет (за ніч)</span>
                <div className="checkboxes">
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="uah_0_2000"/>
                            <label className="form-check-label" htmlFor="uah_0_2000">
                                UAH 0 - 2 000
                            </label>
                        </div>
                        <span className="number">21</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="uah_2000_4000"/>
                            <label className="form-check-label" htmlFor="uah_2000_4000">
                                UAH 2 000 - 4 000
                            </label>
                        </div>
                        <span className="number">10</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="uah_4000_6000"/>
                            <label className="form-check-label" htmlFor="uah_4000_6000">
                                UAH 4 000 - 6 000
                            </label>
                        </div>
                        <span className="number">5</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="uah_6000_8000"/>
                            <label className="form-check-label" htmlFor="uah_6000_8000">
                                UAH 6 000 - 8 000
                            </label>
                        </div>
                        <span className="number">3</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="uah_10000_12000"/>
                            <label className="form-check-label" htmlFor="uah_10000_12000">
                                UAH 10 000 - 12 000
                            </label>
                        </div>
                        <span className="number">1</span>
                    </div>
                </div>
            </div>
            <div className="filter">
                <span className="f-title">Тип помешкання</span>
                <div className="checkboxes">
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="apartments"/>
                            <label className="form-check-label" htmlFor="apartments">
                                Апартаменти
                            </label>
                        </div>
                        <span className="number">45</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="hotels"/>
                            <label className="form-check-label" htmlFor="hotels">
                                Готелі
                            </label>
                        </div>
                        <span className="number">45</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="hostels"/>
                            <label className="form-check-label" htmlFor="hostels">
                                Хостели
                            </label>
                        </div>
                        <span className="number">35</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="guest_houses"/>
                            <label className="form-check-label" htmlFor="guest_houses">
                                Гостьові будинки
                            </label>
                        </div>
                        <span className="number">21</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="courort_hotels"/>
                            <label className="form-check-label" htmlFor="courort_hotels">
                                Курортні готелі
                            </label>
                        </div>
                        <span className="number">9</span>
                    </div>
                </div>
            </div>
            <div className="filter">
                <span className="f-title">Кількість зірок</span>
                <div className="checkboxes">
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="three_start"/>
                            <label className="form-check-label" htmlFor="three_start">
                                3 зірки
                            </label>
                        </div>
                        <span className="number">45</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="four_star"/>
                            <label className="form-check-label" htmlFor="four_star">
                                4 зірки
                            </label>
                        </div>
                        <span className="number">35</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="five_star"/>
                            <label className="form-check-label" htmlFor="five_star">
                                5 зірок
                            </label>
                        </div>
                        <span className="number">25</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="no_star"/>
                            <label className="form-check-label" htmlFor="no_star">
                                Без зіркові категорії
                            </label>
                        </div>
                        <span className="number">21</span>
                    </div>
                </div>
            </div>
            <div className="filter">
                <span className="f-title">Зручності</span>
                <div className="checkboxes">
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="parking"/>
                            <label className="form-check-label" htmlFor="parking">
                                Автостоянка
                            </label>
                        </div>
                        <span className="number">45</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="breakfast_included"/>
                            <label className="form-check-label" htmlFor="breakfast_included">
                                Сніданок включено
                            </label>
                        </div>
                        <span className="number">35</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="jacuzzi"/>
                            <label className="form-check-label" htmlFor="jacuzzi">
                                Джакузі
                            </label>
                        </div>
                        <span className="number">25</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="with_animals"/>
                            <label className="form-check-label" htmlFor="with_animals">
                                З тваринами
                            </label>
                        </div>
                        <span className="number">21</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="family_rooms"/>
                            <label className="form-check-label" htmlFor="family_rooms">
                                Сімейні номери
                            </label>
                        </div>
                        <span className="number">29</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="free_wifi"/>
                            <label className="form-check-label" htmlFor="free_wifi">
                                Безкоштовний Wi-fi
                            </label>
                        </div>
                        <span className="number">34</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="swimming_pool"/>
                            <label className="form-check-label" htmlFor="swimming_pool">
                                Басейн
                            </label>
                        </div>
                        <span className="number">15</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="bbq"/>
                            <label className="form-check-label" htmlFor="bbq">
                                Барбекю
                            </label>
                        </div>
                        <span className="number">24</span>
                    </div>
                </div>
            </div>
            <div className="filter">
                <span className="f-title">Зручності у номері</span>
                <div className="checkboxes">
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="kitchen"/>
                            <label className="form-check-label" htmlFor="kitchen">
                                Кухня
                            </label>
                        </div>
                        <span className="number">45</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="tv"/>
                            <label className="form-check-label" htmlFor="tv">
                                Телевізор
                            </label>
                        </div>
                        <span className="number">35</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="coffee_machine"/>
                            <label className="form-check-label" htmlFor="coffee_machine">
                                Кавоварка
                            </label>
                        </div>
                        <span className="number">25</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="balcony"/>
                            <label className="form-check-label" htmlFor="balcony">
                                Балкон
                            </label>
                        </div>
                        <span className="number">21</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="view"/>
                            <label className="form-check-label" htmlFor="view">
                                Вид
                            </label>
                        </div>
                        <span className="number">29</span>
                    </div>
                    <div className="checkbox-row">
                        <div className="div-check">
                            <input className="form-check-input" type="checkbox" value="" id="terrace"/>
                            <label className="form-check-label" htmlFor="terrace">
                                Тераса
                            </label>
                        </div>
                        <span className="number">14</span>
                    </div>
                </div>
            </div>
        </div>
    )
}