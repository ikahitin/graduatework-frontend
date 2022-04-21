import {NavLink} from "react-router-dom";
import React from "react";

export default function NavigationPanel() {
    return(
        <div className="nav nav-pills">
            <NavLink className="nav-item" to="/booking/apartments">
                <button className="nav-link" aria-current="page">
                    <div className="nav-icon house"/>
                    <span>Житло</span>
                </button>
            </NavLink>
            <NavLink className="nav-item" to="/booking/cars">
                <button className="nav-item nav-link">
                    <div className="nav-icon car"/>
                    <span>Оренда автомобіля</span>
                </button>
            </NavLink>
            <NavLink className="nav-item" to="/booking/taxi">
                <button className="nav-link">
                    <div className="nav-icon taxi"/>
                    <span>Таксі</span>
                </button>
            </NavLink>
            <NavLink className="nav-item" to="/booking/vacation">
                <button className="nav-link">
                    <div className="nav-icon travel"/>
                    <span>Відпочинок за обміном</span>
                </button>
            </NavLink>
            <NavLink className="nav-item" to="/booking/events">
                <button className="nav-link">
                    <div className="nav-icon event"/>
                    <span>Івенти</span>
                </button>
            </NavLink>
        </div>
    )
}

