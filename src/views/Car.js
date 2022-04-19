import DateRangePicker from "react-bootstrap-daterangepicker";
import React from "react";

function Car() {
    return (
        <div className="container p-0">
            <div className="search-block">
                <form className="row gx-3 gy-2 align-items-center">
                    <div className="inputs">
                        <div className="step one"/>
                        <div className="col-sm">
                            <div className="input-group">
                                <div className="nav-icon house-gray"/>
                                <input className="form-control no-icon" list="datalistOptions" id="exampleDataList"
                                       placeholder="Куди бажаєте поїхати?" size="1"/>
                                <datalist id="datalistOptions">
                                    <option value="Одеса"/>
                                    <option value="Славське"/>
                                    <option value="Джарилгач"/>
                                    <option value="Яремче"/>
                                </datalist>
                            </div>
                        </div>
                        <div className="step two"/>
                        <div className="col-sm">
                            <label className="visually-hidden" htmlFor="defaultValue">Username</label>
                            <div className="input-group">
                                <div className="nav-icon event-gray rs-picker-toggle-caret rs-icon"/>
                                {/*<input type="text" className="form-control" id="specificSizeInputGroupUsername"*/}
                                {/*       placeholder="Дата" value="чт, 10 березня - пн, 14 березня"/>*/}
                                <DateRangePicker
                                    initialSettings={{
                                        autoUpdateInput: false,
                                        format: 'ddd DD MMMM',
                                        locale: {
                                            applyLabel: "Прийняти",
                                            cancelLabel: 'Скасувати',
                                            // format: 'MM/dd/yyyy',
                                            format: 'DD/MM/YY',
                                            fromLabel: "Fromm",
                                            daysOfWeek: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                                            monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
                                            //monthNames: moment.months(),
                                            firstDay: 1
                                        },
                                    }}
                                >
                                    <input type="text" className="form-control"
                                           defaultValue="Оберіть заплановану дату"/>
                                </DateRangePicker>
                            </div>
                        </div>
                        <div className="step three"/>
                        <div className="col-sm">
                            <div className="input-group">
                                <div className="nav-icon person-gray"/>
                                <label className="visually-hidden" htmlFor="specificSizeSelect">Preference</label>
                                <select className="form-select" id="specificSizeSelect">
                                    <option defaultValue>Вкажіть кількість осіб</option>
                                    <option value="1">2 дорослих - без дітей - 1 номер</option>
                                    <option value="2">2 дорослих - 2 дітей - 1 номер</option>
                                    <option value="3">2 дорослих - 2 дітей - 2 номери</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-blue">Знайти</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Car;