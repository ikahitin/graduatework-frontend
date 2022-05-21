import React from "react";
import {useLocation} from "react-router-dom";

export default function Header() {
    let location = useLocation();
    if (location.pathname.match('/apartments/') || location.pathname.match('/cars/') || location.pathname.match('/payment') || location.pathname.match('/profile/')) {
        return null;
    }
    return (
        <header className="App-header">
            <h2>Подорожуй зручно по Україні</h2>
            <span className="subtext">Досліджуй нові місця та насолоджуйся
                    красою нашої країни</span>
            <div className="ukraine"/>
        </header>
    )
}